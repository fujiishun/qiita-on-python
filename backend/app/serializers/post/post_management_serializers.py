from rest_framework import serializers
from app.models import Post
from django.contrib.auth import get_user_model
from django.utils import timezone

User = get_user_model()

class PostManagementSerializer(serializers.ModelSerializer):
    title = serializers.CharField(max_length=100)
    body = serializers.CharField()
    isDraft = serializers.BooleanField(default=False)

    class Meta:
        model = Post
        fields = ['title', 'body', 'isDraft']

    def create(self, validated_data):
        user = self.context['request'].user
        is_draft = validated_data.get('isDraft', False)
        if is_draft:  # isDraft が True の場合は投稿時間を入れない
            post = Post.objects.create(
                author=user,
                title=validated_data['title'],
                body=validated_data['body'],
                is_draft=is_draft,
            )
        else:
            current_time = timezone.now()
            post = Post.objects.create(
                author=user,
                title=validated_data['title'],
                body=validated_data['body'],
                is_draft=is_draft,
                posted_at=current_time
            )
        return post
    
    def update(self, instance, validated_data):
        instance.title = validated_data.get('title', instance.title)
        instance.body = validated_data.get('body', instance.body)
        is_draft = validated_data.get('isDraft', instance.is_draft)
        if not is_draft:  # 公開の場合のみ日付を更新
            current_time = timezone.now()
            if not instance.posted_at:
                instance.posted_at = current_time
            else:
                instance.re_written_at = current_time
        instance.is_draft = is_draft
        instance.save()
        return instance
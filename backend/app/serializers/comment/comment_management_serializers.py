from rest_framework import serializers
from rest_framework.exceptions import ValidationError
from app.models import Comment

class CommentManagementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ['id', 'body', 'post', 'is_deleted']

    def create(self, validated_data):
        user = self.context['request'].user
        if not user.is_authenticated:
            raise serializers.ValidationError("ユーザーが認証されていません。")
        validated_data['commenter'] = user
        return Comment.objects.create(**validated_data)

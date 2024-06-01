from rest_framework import serializers
from app.models import Post
from django.contrib.auth import get_user_model
from app.utils.dateTime import utc_to_jst

User = get_user_model()

class PostSerializer(serializers.ModelSerializer):
    authorName = serializers.SerializerMethodField()
    authorId = serializers.IntegerField(source='author_id')
    postedAt = serializers.SerializerMethodField()
    reWrittenAt = serializers.SerializerMethodField()
    isDeleted = serializers.BooleanField(source='is_deleted')
    isDraft = serializers.BooleanField(source='is_draft')
    createdAt = serializers.DateTimeField(source='created_at')
    updatedAt = serializers.DateTimeField(source='updated_at')

    class Meta:
        model = Post
        fields = ['id', 'authorId', 'authorName', 'title', 'body', 'postedAt', 'reWrittenAt', 'isDeleted', 'isDraft', 'createdAt', 'updatedAt']

    # ユーザIDからユーザ名を取得する
    def get_authorName(self, obj):
        try:
            user = User.objects.get(pk=obj.author_id)
            return user.display_name
        except User.DoesNotExist:
            return "名前が見つかりません"

    # 日本時間に変換
    def get_postedAt(self, obj):
        if obj.posted_at:
            return utc_to_jst(obj.posted_at)
        return None

    def get_reWrittenAt(self, obj):
        """ 更新日時をJSTで返す """
        if obj.re_written_at:
            return utc_to_jst(obj.re_written_at)
        return None
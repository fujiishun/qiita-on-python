from rest_framework import serializers
from app.models import Comment
from django.contrib.auth import get_user_model
from app.utils.dateTime import utc_to_jst

User = get_user_model()

class CommentSerializer(serializers.ModelSerializer):
    commenterName = serializers.SerializerMethodField()
    commenterId = serializers.IntegerField(source='commenter_id')
    commentedAt = serializers.SerializerMethodField()
    isDeleted = serializers.BooleanField(source='is_deleted')

    class Meta:
        model = Comment
        fields = ['id', 'body', 'commenterName', 'commenterId', 'commentedAt', 'isDeleted']

    # commented_at を JST に変換
    def get_commentedAt(self, obj):
        return utc_to_jst(obj.commented_at)

    # コメント主の名前を取得
    def get_commenterName(self, obj):
        try:
            user = User.objects.get(pk=obj.commenter_id)
            return user.display_name
        except User.DoesNotExist:
            return "名前が見つかりません"
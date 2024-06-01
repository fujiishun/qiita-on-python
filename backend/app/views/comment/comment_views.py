from rest_framework.permissions import AllowAny
from app.permission.permission import IsAuthenticatedForCommentActions
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework import status
from app.serializers.comment.comment_serializers import CommentSerializer
from app.serializers.comment.comment_management_serializers import CommentManagementSerializer
from app.models import Comment
from django.shortcuts import get_object_or_404

class CommentsView(ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticatedForCommentActions]  # コメント用のパーミッションを設定

    def get_serializer_class(self):
        if self.action in ['create']:
            return CommentManagementSerializer
        return CommentSerializer

    # 投稿に紐づいているコメント取得
    def get_queryset(self):
        post_id = self.kwargs.get('pk')
        return Comment.objects.filter(post=post_id)

    # 削除対象のコメント単体を取得
    def get_object(self):
        if self.action == 'destroy':
            return get_object_or_404(Comment.objects.all(), pk=self.kwargs.get('pk'))
        return super().get_object()

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.is_deleted = True
        instance.save()
        return Response(status=status.HTTP_204_NO_CONTENT)

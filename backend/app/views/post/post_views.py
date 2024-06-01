from rest_framework.permissions import AllowAny
from app.permission.permission import IsAuthenticatedForPostActions
from rest_framework.response import Response
from rest_framework import status
from rest_framework.viewsets import ModelViewSet
from django.db.models import Q
from app.models import Post
from app.serializers.post.post_serializers import PostSerializer
from app.serializers.post.post_management_serializers import PostManagementSerializer

class PostsView(ModelViewSet):
    queryset = Post.objects.filter(is_deleted=False)
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticatedForPostActions]  # 投稿用のパーミッションを設定

    def get_serializer_class(self):
        if self.action in ['create', 'update']:
            return PostManagementSerializer
        return PostSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        user = self.request.user
        # 未公開記事の選別
        if user.is_authenticated:
            queryset = queryset.filter(Q(is_draft=False) | Q(author=user))
        else:
            queryset = queryset.filter(is_draft=False)
        # 検索処理
        search = self.request.query_params.get('search', None)
        if search:
            queryset = queryset.filter(Q(title__icontains=search) | Q(body__icontains=search))
        return queryset

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.is_deleted = True
        instance.save()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
    def get_serializer_context(self):
        context = super().get_serializer_context()
        context.update({"request": self.request})
        return context


class UserPostsView(ModelViewSet):
    serializer_class = PostSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        user_id = self.kwargs.get('pk')
        user = self.request.user
        queryset = Post.objects.filter(is_deleted=False)
        # 未公開記事の選別
        if user.is_authenticated:
            queryset = Post.objects.filter(Q(is_draft=False) | Q(author=user))
        else:
            queryset = Post.objects.filter(is_draft=False)
        
        # 削除された記事は表示しない
        queryset = queryset.exclude(is_deleted=True)
        # ユーザ別のデータを取得
        if user_id:
            queryset = queryset.filter(author_id=user_id) 
        return queryset
from django.contrib import admin
from django.urls import include, path
from rest_framework.routers import DefaultRouter
from app.views.post.post_views import PostsView, UserPostsView
from app.views.user.user_views import UserView
from app.views.common.auth.login import LoginView
from app.views.common.auth.register import RegisterView
from app.views.comment.comment_views import CommentsView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/login', LoginView.as_view(), name='login'),
    path('api/register', RegisterView.as_view(), name='register'),
    path('api/posts/', PostsView.as_view({'get': 'list', 'post': 'create'}), name='post-list'),
    path('api/posts/<int:pk>/', PostsView.as_view({'get': 'retrieve', 'patch': 'update', 'delete': 'destroy'}), name='post-detail'),
    path('api/posts/<int:pk>/comments/', CommentsView.as_view({'get': 'list', 'post': 'create'}), name='post-comments'),
    path('api/users/', UserView.as_view({'get': 'list'}), name='user_list'),
    path('api/users/<int:pk>/', UserView.as_view({'get': 'retrieve','patch': 'partial_update' }), name='user_detail'),
    path('api/users/<int:pk>/posts/', UserPostsView.as_view({'get': 'list'}), name='user_posts'),
    path('api/comments/<int:pk>/', CommentsView.as_view({'delete': 'destroy'}), name='comment-delete'),
]

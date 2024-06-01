import pytest
from rest_framework.test import APITestCase
from django.urls import reverse
from rest_framework import status
from app.factory.commentFactory import CommentFactory
from app.factory.postFactory import PostFactory
from app.factory.userFactory import UserFactory
from app.models import Comment

@pytest.mark.django_db
class CommentViewTestCase(APITestCase):
    def setUp(self):
        self.user = UserFactory()
        self.post = PostFactory()
        self.comment = CommentFactory(post=self.post, commenter=self.user)
        self.client.force_authenticate(user=self.user)

    def test_get_comments_for_post(self):
        url = reverse('post-comments', kwargs={'pk': self.post.pk})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

    def test_delete_comment_authenticated(self):
        url = reverse('comment-delete', kwargs={'pk': self.comment.pk})
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.comment.refresh_from_db()
        self.assertTrue(self.comment.is_deleted)

    def test_delete_comment_unauthenticated(self):
        self.client.logout()
        url = reverse('comment-delete', kwargs={'pk': self.comment.pk})
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.comment.refresh_from_db()
        self.assertFalse(self.comment.is_deleted)

@pytest.mark.django_db
class TestCommentManagementSerializer(APITestCase):
    def setUp(self):
        self.user = UserFactory()
        self.post = PostFactory()
        self.url = reverse('post-comments', kwargs={'pk': self.post.pk})

    def test_create_comment_authenticated(self):
        self.client.force_authenticate(user=self.user)
        data = {'body': 'テストコメント', 'post': self.post.id}
        response = self.client.post(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Comment.objects.count(), 1)
        self.assertEqual(Comment.objects.first().body, 'テストコメント')
        self.assertEqual(Comment.objects.first().commenter, self.user)

    def test_create_comment_unauthenticated(self):
        self.client.logout()
        data = {'body': 'テストコメント', 'post': self.post.id}
        response = self.client.post(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertEqual(Comment.objects.count(), 0)
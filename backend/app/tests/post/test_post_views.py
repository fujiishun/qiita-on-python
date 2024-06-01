import pytest
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from app.models import Post
from app.factory.postFactory import PostFactory
from app.factory.userFactory import UserFactory
from django.test import RequestFactory
from django.contrib.auth.models import User
from app.serializers.post.post_management_serializers import PostManagementSerializer

@pytest.mark.django_db
class PostsViewTestCase(APITestCase):
    def setUp(self):
        self.user = UserFactory()
        self.user_unauth = UserFactory()
        self.public_post = PostFactory(title='Test Post 1', author=self.user, is_draft=False, is_deleted=False)
        self.draft_post = PostFactory(author=self.user, is_draft=True, is_deleted=False)
        self.deleted_post = PostFactory(author=self.user, is_draft=False, is_deleted=True)

    def test_list_public_posts(self):
        url = reverse('post-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        expected_titles = [self.public_post.title]
        retrieved_titles = [post['title'] for post in response.data]
        self.assertEqual(sorted(retrieved_titles), sorted(expected_titles))

    def test_search_posts_excludes_drafts_and_deleted(self):
        url = reverse('post-list')
        response = self.client.get(url, {'search': 'Post'}, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['title'], 'Test Post 1')
        response_draft = self.client.get(url, {'search': 'Draft Post'}, format='json')
        self.assertEqual(len(response_draft.data), 0)
        response_deleted = self.client.get(url, {'search': 'Deleted Post'}, format='json')
        self.assertEqual(len(response_deleted.data), 0)

    def test_delete_post(self):
        self.client.force_authenticate(user=self.user)
        url = reverse('post-detail', kwargs={'pk': self.public_post.pk})
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.public_post.refresh_from_db()
        self.assertTrue(self.public_post.is_deleted)

    def test_delete_post_unauthenticated(self):
        self.client.logout()  # ログアウトして認証を解除
        url = reverse('post-detail', kwargs={'pk': self.public_post.pk})
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.public_post.refresh_from_db()
        self.assertFalse(self.public_post.is_deleted)


@pytest.mark.django_db
class PostManagementSerializerTestCase(APITestCase):
    def test_create_post(self):
        user = UserFactory()
        self.client.force_authenticate(user=user)
        data = {'title': 'Test Title', 'body': 'Test Body', 'isDraft': False}
        response = self.client.post(reverse('post-list'), data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Post.objects.count(), 1)
        post = Post.objects.get()
        self.assertEqual(post.title, 'Test Title')
        self.assertEqual(post.body, 'Test Body')
        self.assertFalse(post.is_draft)
        self.assertIsNotNone(post.posted_at)

    def test_create_draft_post(self):
        user = UserFactory()
        self.client.force_authenticate(user=user)
        data = {'title': 'Draft Title', 'body': 'Draft Body', 'isDraft': True}
        response = self.client.post(reverse('post-list'), data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Post.objects.count(), 1)
        post = Post.objects.get()
        self.assertEqual(post.title, 'Draft Title')
        self.assertEqual(post.body, 'Draft Body')
        self.assertTrue(post.is_draft)
        self.assertIsNone(post.posted_at)

    def test_create_post_unauthenticated(self):
        self.client.logout()  # ログアウトして認証を解除
        data = {'title': 'Test Title', 'body': 'Test Body', 'isDraft': False}
        response = self.client.post(reverse('post-list'), data)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertEqual(Post.objects.count(), 0)

    def test_update_post(self):
        post = PostFactory()
        self.client.force_authenticate(user=post.author)
        data = {'title': 'Updated Title', 'body': 'Updated Body', 'isDraft': True}
        url = reverse('post-detail', kwargs={'pk': post.pk})
        response = self.client.patch(url, data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        post.refresh_from_db()
        self.assertEqual(post.title, 'Updated Title')
        self.assertEqual(post.body, 'Updated Body')
        self.assertTrue(post.is_draft)
        self.assertIsNotNone(post.posted_at)

    def test_update_post_unauthenticated(self):
        post = PostFactory(is_draft=True)
        self.client.logout()  # ログアウトして認証を解除
        data = {'title': 'Updated Title', 'body': 'Updated Body', 'isDraft': False}
        url = reverse('post-detail', kwargs={'pk': post.pk})
        response = self.client.patch(url, data)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        post.refresh_from_db()
        self.assertNotEqual(post.title, 'Updated Title')
        self.assertNotEqual(post.body, 'Updated Body')
        self.assertTrue(post.is_draft)



@pytest.mark.django_db
class UserPostsViewTestCase(APITestCase):
    def setUp(self):
        self.user1 = UserFactory()
        self.user2 = UserFactory()
        self.post1_user1 = PostFactory(title='User 1 Post 1', author=self.user1)
        self.post2_user1 = PostFactory(title='User 1 Post 2', author=self.user1)
        self.post_user2 = PostFactory(title='User 2 Post', author=self.user2)

    def test_user_posts_list(self):
        self.client.force_authenticate(user=self.user1)
        url = reverse('user_posts', kwargs={'pk': self.user1.pk})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)
        post_titles = [post['title'] for post in response.data]
        self.assertIn(self.post1_user1.title, post_titles)
        self.assertIn(self.post2_user1.title, post_titles)

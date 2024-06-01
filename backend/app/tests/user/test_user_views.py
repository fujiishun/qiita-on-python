import pytest
from rest_framework.test import APITestCase
from django.urls import reverse
from rest_framework import status
from app.factory.userFactory import UserFactory

@pytest.mark.django_db
class UserViewTestCase(APITestCase):
    def setUp(self):
        self.user = UserFactory()
        self.user.save()

    def test_get_user_details(self):
        url = reverse('user_detail', kwargs={'pk': self.user.pk})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['displayName'], self.user.display_name)

    def test_get_user_not_found(self):
        url = reverse('user_detail', kwargs={'pk': 9999})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_update_user_display_name(self):
        url = reverse('user_detail', kwargs={'pk': self.user.pk})
        self.client.force_authenticate(user=self.user)
        new_display_name = '新しい表示名'
        response = self.client.patch(url, {'displayName': new_display_name}, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.user.refresh_from_db()
        self.assertEqual(self.user.display_name, new_display_name)

    def test_update_user_display_name_unauthenticated(self):
        url = reverse('user_detail', kwargs={'pk': self.user.pk})
        self.client.logout()  # ログアウトして認証を解除
        new_display_name = '新しい表示名'
        response = self.client.patch(url, {'displayName': new_display_name}, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.user.refresh_from_db()
        self.assertNotEqual(self.user.display_name, new_display_name) 
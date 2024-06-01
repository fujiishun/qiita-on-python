import pytest
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from app.factory.userFactory import UserFactory

@pytest.mark.django_db
class LoginViewTestCase(APITestCase):
    def setUp(self):
        self.valid_user = UserFactory() #ログイン成功用のユーザ作成
        self.invalid_user = UserFactory(login_id='invaliduser', password='invalidpassword') #ログイン失敗用のユーザ作成

    def test_successful_login(self):
        url = reverse('login')
        data = {'loginId': self.valid_user.login_id, 'password': 'testpassword'}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['message'], 'ログインに成功しました')

    def test_failed_login(self):
        url = reverse('login')
        data = {'loginId': self.invalid_user.login_id, 'password': 'invalidpassword'}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data['message'], 'IDまたはパスワードが間違っています')

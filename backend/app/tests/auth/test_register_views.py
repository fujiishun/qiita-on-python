from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework import status
from app.factory.userFactory import UserFactory

class RegisterViewTest(APITestCase):
    def setUp(self):
        self.url = reverse('register')
        self.user_data = {
            'loginId': 'newuser',
            'displayName': 'New User',
            'password': 'password123',
            'confirmationPassword': 'password123'
        }

    def test_register_success(self):
        response = self.client.post(self.url, self.user_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertIn('message', response.data)
        self.assertEqual(response.data['message'], '登録が完了しました。')

    def test_password_mismatch(self):
        self.user_data['confirmationPassword'] = 'wrongpassword'
        response = self.client.post(self.url, self.user_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('message', response.data)
        self.assertEqual(response.data['message'], 'パスワードと確認用パスワードが一致していません。')

    def test_duplicate_login_id(self):
        UserFactory(login_id=self.user_data['loginId'])  # 既に存在するユーザーを作成
        response = self.client.post(self.url, self.user_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_409_CONFLICT)
        self.assertIn('message', response.data)
        self.assertEqual(response.data['message'], 'このログインIDは既に使用されています。')

    def test_missing_fields(self):
        del self.user_data['password']
        response = self.client.post(self.url, self.user_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertTrue('password' in response.data)


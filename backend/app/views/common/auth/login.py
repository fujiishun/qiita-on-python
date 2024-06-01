from django.contrib.auth import authenticate
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from app.serializers.user_serializers import UserSerializer

class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        login_id = request.data.get('loginId')
        password = request.data.get('password')
        user = authenticate(username=login_id, password=password)
        if user is not None and not getattr(user, 'is_deleted', False):
            refresh = RefreshToken.for_user(user)
            access_token = str(refresh.access_token)
            user_data = UserSerializer(user).data
            return Response({
                'refresh': str(refresh),
                'access': access_token,
                'user': user_data,
                'message': 'ログインに成功しました'
            }, status=status.HTTP_200_OK)
        else:
            return Response({'message': 'IDまたはパスワードが間違っています'}, status=status.HTTP_400_BAD_REQUEST)

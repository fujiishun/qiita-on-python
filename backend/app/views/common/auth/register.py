from django.contrib.auth import get_user_model
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework import status
from app.serializers.user_register_serializers import UserSerializer

User = get_user_model()

class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = UserSerializer(data=request.data)

        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        # パスワード確認
        password = request.data.get('password')
        confirmation_password = request.data.get('confirmationPassword')
        if password != confirmation_password:
            return Response({'message': 'パスワードと確認用パスワードが一致していません。'}, status=status.HTTP_400_BAD_REQUEST)

        # ログインIDの重複確認
        login_id = request.data.get('loginId')
        if User.objects.filter(login_id=login_id).exists():
            return Response({'message': 'このログインIDは既に使用されています。'}, status=status.HTTP_409_CONFLICT)

        # ユーザー作成
        try:
            user = serializer.save()
            return Response({'message': '登録が完了しました。'}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({'message': 'サーバーエラーが発生しました。'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

from app.permission.permission import IsAuthenticatedForUserActions
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework import status
from app.models import User
from app.serializers.user_serializers import UserSerializer

class UserView(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticatedForUserActions]  # ユーザー用のパーミッションを設定

    def get_queryset(self):
        user_id = self.kwargs['pk']
        return User.objects.filter(pk=user_id)

from rest_framework import serializers
from django.contrib.auth import get_user_model

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    loginId = serializers.CharField(source='login_id', write_only=True)
    displayName = serializers.CharField(source='display_name', write_only=True)
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['loginId', 'displayName', 'password']

    def create(self, validated_data):
        user = User.objects.create_user(
            login_id=validated_data.get('login_id'),
            display_name=validated_data.get('display_name'),
            password=validated_data['password']
        )
        return user

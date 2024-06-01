from rest_framework import serializers
from django.contrib.auth import get_user_model

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    loginId = serializers.IntegerField(source='login_id')
    displayName = serializers.CharField(source='display_name')

    class Meta:
        model = User
        fields = ['loginId', 'displayName']

    def to_representation(self, instance):
        return {
            'userId': instance.id,
            'loginId': instance.login_id,
            'displayName': instance.display_name        
        }

    def update(self, instance, validated_data):
        instance.display_name = validated_data.get('display_name', instance.display_name)
        instance.save()
        return instance

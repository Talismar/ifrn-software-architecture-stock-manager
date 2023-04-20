from rest_framework.serializers import (
    ModelSerializer
)
from django.contrib.auth.models import User
from .models import (
    Product
)


class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        exclude = ['password']


class ProductSerializer(ModelSerializer):
    class Meta:
        model = Product
        fields = "__all__"

    def update(self, instance, validated_data):
        return instance

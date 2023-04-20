from rest_framework.viewsets import (
    ModelViewSet,
    ViewSet
)
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework import status

from django_filters.rest_framework import DjangoFilterBackend
from .filters import (
    ProductFilter
)

from .serializers import (
    UserSerializer,
    ProductSerializer
)

from django.contrib.auth.models import User
from .models import Product
from drf_spectacular.utils import extend_schema, OpenApiExample


class UserViewSet(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class ProductViewSet(ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_class = ProductFilter


class FinishSaleViewSet(ViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

    @extend_schema(
        examples=[OpenApiExample(
            name="product_cart",
            value={'1': 10, '2': 15},
        )],
        responses={
            200: None
        },
        description="Product cart `{key=product id and value=amount}`"
    )
    def create(self, request: Request):
        product_cart = request.data.pop('product_cart', False)

        if product_cart:
            cart_product_ids = [id for id in product_cart.keys()]

            queryset = self.queryset.filter(
                pk__in=cart_product_ids).values_list("id", "amount", named=True)

            valid_product_id = []

            for product in queryset:
                id = str(product.id)

                if product.amount >= product_cart[id]:
                    valid_product_id.append(product.id)

            if len(valid_product_id) == len(cart_product_ids):

                for id, amount in product_cart.items():
                    product = self.queryset.get(pk=id)
                    product.amount -= amount
                    product.save()

                return Response({
                    "success": True,
                })

            return Response({"error": "Quantidade de produtos inválidas."}, status=status.HTTP_404_NOT_FOUND)

        return Response(status=status.HTTP_400_BAD_REQUEST)

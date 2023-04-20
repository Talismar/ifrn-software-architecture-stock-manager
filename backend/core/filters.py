from django_filters import rest_framework as filters
from .models import Product


class ProductFilter(filters.FilterSet):
    min_amount = filters.NumberFilter(field_name="amount", lookup_expr='gte')
    max_amount = filters.NumberFilter(field_name="amount", lookup_expr='lte')

    class Meta:
        model = Product
        fields = ['name', 'amount', 'price', 'created_at']

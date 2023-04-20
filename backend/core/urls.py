from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import (
    UserViewSet,
    ProductViewSet,
    FinishSaleViewSet
)
from rest_framework.authtoken import views

route = DefaultRouter()
route.register("user", UserViewSet)
route.register("product", ProductViewSet)


urlpatterns = [
    path('finish-sale/',
         FinishSaleViewSet.as_view(actions={"post": "create"})),
    path('token-auth/', views.obtain_auth_token),
] + route.urls

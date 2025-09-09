from django.urls import path, include
from .views import ProductListCreateView, ProductDetailView, CartViewSet,ProductViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'cart', CartViewSet)
router.register(r'products', ProductViewSet)


urlpatterns = [
    path('products/', ProductListCreateView.as_view(), name="product-list"),
    path('products/<int:pk>/', ProductDetailView.as_view(), name="product-detail"),
    path('', include(router.urls)),
]
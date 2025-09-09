from rest_framework import serializers
from .models import Product
from .models import Cart

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'



class CartSerializer(serializers.ModelSerializer):
    product_title = serializers.ReadOnlyField(source='product.title')
    product_price = serializers.ReadOnlyField(source='product.price')
    product_image = serializers.ReadOnlyField(source='product.image')

    class Meta:
        model = Cart
        fields = ['id', 'product', 'quantity', 'added_at', 'product_title', 'product_price', 'product_image']
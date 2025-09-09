from django.contrib import admin
from .models import Product, Cart

# Register your models here
@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ("id", "title", "price")   # Columns in admin list view
    search_fields = ("title",)
    list_filter = ("price",)


@admin.register(Cart)
class CartAdmin(admin.ModelAdmin):
    list_display = ("id", "product", "quantity")
    list_filter = ("quantity",)
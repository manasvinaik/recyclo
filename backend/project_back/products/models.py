from django.db import models

class Product(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    price = models.CharField(max_length=50)  # keep string since you have ₹ symbol
    image = models.URLField(blank=True, null=True)
    category = models.CharField(max_length=100)

    def __str__(self):
        return self.title


class Cart(models.Model):
    session_id = models.CharField(max_length=255)  # optional, for guest users
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)
    added_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.product.title} x {self.quantity}"
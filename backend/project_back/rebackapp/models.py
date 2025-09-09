from django.db import models
from django.contrib.auth.models import User

class DumpPost(models.Model):
    STATUS_CHOICES = [
        ("verified", "Verified"),
        ("resolved", "Resolved"),
    ]

    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    description = models.TextField()
    location_text = models.CharField(max_length=255)
    latitude = models.FloatField(null=True, blank=True)
    longitude = models.FloatField(null=True, blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="verified")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        user = self.user.username if self.user else "Anonymous"
        return f"{user} - {self.description[:30]}"


class DumpPostImage(models.Model):
    post = models.ForeignKey(DumpPost, on_delete=models.CASCADE, related_name="images")
    image = models.ImageField(upload_to="dump_posts/")

    def __str__(self):
        return f"Image for Post {self.post.id}"

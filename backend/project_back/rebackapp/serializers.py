from rest_framework import serializers
from .models import DumpPost, DumpPostImage

class DumpPostImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = DumpPostImage
        fields = ["id", "image"]

class DumpPostSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField(read_only=True)
    images = DumpPostImageSerializer(many=True, read_only=True)

    class Meta:
        model = DumpPost
        fields = [
            "id", "user", "description", "location_text",
            "latitude", "longitude",  # new fields
            "status", "created_at", "images"
        ]

    def get_user(self, obj):
        return obj.user.username if obj.user else "Anonymous"
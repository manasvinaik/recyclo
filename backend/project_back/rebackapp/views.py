from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from rest_framework.parsers import MultiPartParser, FormParser
from .models import DumpPost, DumpPostImage
from .serializers import DumpPostSerializer

class DumpPostViewSet(viewsets.ModelViewSet):
    queryset = DumpPost.objects.all().order_by("-created_at")
    serializer_class = DumpPostSerializer
    permission_classes = [AllowAny]
    parser_classes = [MultiPartParser, FormParser]

    def perform_create(self, serializer):
        user = self.request.user if self.request.user.is_authenticated else None
        post = serializer.save(user=user)

        # Handle multiple image uploads
        images = self.request.FILES.getlist("images")
        for img in images:
            DumpPostImage.objects.create(post=post, image=img)
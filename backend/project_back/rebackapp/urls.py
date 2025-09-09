from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import DumpPostViewSet

router = DefaultRouter()
router.register(r"posts", DumpPostViewSet)

urlpatterns = [
    path("", include(router.urls)),
]
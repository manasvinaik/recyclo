from django.contrib import admin
from .models import DumpPost

@admin.register(DumpPost)
class DumpPostAdmin(admin.ModelAdmin):
    list_display = ("id", "user", "status", "location_text", "created_at")
    list_filter = ("status", "created_at")
    search_fields = ("description", "location_text", "user__username")
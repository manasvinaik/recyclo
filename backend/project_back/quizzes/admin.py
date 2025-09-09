from django.contrib import admin
from .models import (
    Quiz,
    Question,
    Option,
    Score,
    VideoModule,
    VideoLesson,
    VideoProgress,
    VideoScore,
)

# Inline options inside Question
class OptionInline(admin.TabularInline):
    model = Option
    extra = 4  # default 4 options per question

class QuestionAdmin(admin.ModelAdmin):
    inlines = [OptionInline]

# Inline lessons inside VideoModule
class VideoLessonInline(admin.TabularInline):
    model = VideoLesson
    extra = 1

class VideoModuleAdmin(admin.ModelAdmin):
    list_display = ("title", "description", "total_lessons")
    inlines = [VideoLessonInline]

# Register everything
admin.site.register(Quiz)
admin.site.register(Question, QuestionAdmin)
admin.site.register(Score)
admin.site.register(VideoModule, VideoModuleAdmin)
admin.site.register(VideoLesson)
admin.site.register(VideoProgress)
admin.site.register(VideoScore)

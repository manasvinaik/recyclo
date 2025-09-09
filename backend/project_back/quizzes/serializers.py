from rest_framework import serializers
from .models import (
    Quiz, Question, Option, Score,
    VideoModule, VideoLesson, VideoProgress, VideoScore
)

# ---------------------- Quiz Serializers ----------------------
class OptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Option
        fields = ["id", "option_text"]

class QuestionSerializer(serializers.ModelSerializer):
    options = OptionSerializer(many=True, read_only=True)
    class Meta:
        model = Question
        fields = ["id", "question_text", "correct_answer", "options"]

class QuizSerializer(serializers.ModelSerializer):
    questions = QuestionSerializer(many=True, read_only=True)
    class Meta:
        model = Quiz
        fields = ["id", "title", "description", "questions"]

class ScoreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Score
        fields = ["id", "username", "quiz", "score", "date_taken"]

# ---------------------- Video Serializers ----------------------
class VideoLessonSerializer(serializers.ModelSerializer):
    module_category = serializers.CharField(source="module.category", read_only=True)
    module_title = serializers.CharField(source="module.title", read_only=True)

    class Meta:
        model = VideoLesson
        fields = ["id", "title", "type", "content", "module", "module_title", "module_category"]

class VideoModuleSerializer(serializers.ModelSerializer):
    lessons = VideoLessonSerializer(many=True, read_only=True)
    category = serializers.CharField(read_only=True)  # ✅ remove source="category"

    class Meta:
        model = VideoModule
        fields = ["id", "title", "description", "category", "lessons"]

class VideoProgressSerializer(serializers.ModelSerializer):
    class Meta:
        model = VideoProgress
        fields = ["id", "username", "module", "lesson", "watched"]

class VideoScoreSerializer(serializers.ModelSerializer):
    class Meta:
        model = VideoScore
        fields = ["id", "username", "module", "score"]

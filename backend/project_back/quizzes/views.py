from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.db.models import Sum

from .models import Quiz, Score, VideoModule, VideoLesson, VideoProgress, VideoScore
from .serializers import (
    QuizSerializer, ScoreSerializer,
    VideoModuleSerializer, VideoLessonSerializer,
    VideoProgressSerializer, VideoScoreSerializer
)

# ---------------------- Quiz APIs ----------------------
class QuizListView(generics.ListAPIView):
    queryset = Quiz.objects.all()
    serializer_class = QuizSerializer

class QuizDetailView(generics.RetrieveAPIView):
    queryset = Quiz.objects.all()
    serializer_class = QuizSerializer

class ScoreCreateView(generics.CreateAPIView):
    serializer_class = ScoreSerializer
    permission_classes = []

class ScoreListView(generics.ListAPIView):
    serializer_class = ScoreSerializer

    def get_queryset(self):
        return Score.objects.filter(user=self.request.user)

class LeaderboardView(APIView):
    def get(self, request):
        leaderboard = (
            Score.objects
            .values('username')
            .annotate(total_score=Sum('score'))
            .order_by('-total_score')[:3]
        )
        return Response(leaderboard)

# ---------------------- Video APIs ----------------------
class VideoModuleListView(generics.ListAPIView):
    queryset = VideoModule.objects.all()
    serializer_class = VideoModuleSerializer

class VideoLessonListView(generics.ListAPIView):
    serializer_class = VideoLessonSerializer

    def get_queryset(self):
        module_id = self.kwargs["module_id"]
        return VideoLesson.objects.filter(module_id=module_id)

class MarkLessonWatchedView(generics.CreateAPIView):
    serializer_class = VideoProgressSerializer

    def create(self, request, *args, **kwargs):
        username = request.data.get("username")
        lesson_id = request.data.get("lesson")
        lesson = VideoLesson.objects.get(id=lesson_id)
        module = lesson.module

        # Mark lesson progress
        progress, created = VideoProgress.objects.get_or_create(
            username=username,
            lesson=lesson,
            defaults={"module": module, "watched": True}
        )

        if not created and progress.watched:
            return Response({"message": "Already watched"}, status=status.HTTP_200_OK)

        progress.watched = True
        progress.save()

        # Add score (10 per lesson)
        score, _ = VideoScore.objects.get_or_create(username=username, module=module)
        score.score += 10
        score.save()

        # Bonus if all lessons completed
        total_lessons = module.lessons.count()
        watched_lessons = VideoProgress.objects.filter(username=username, module=module, watched=True).count()
        if watched_lessons == total_lessons and score.score == total_lessons * 10:
            score.score += 10
            score.save()

        return Response({"message": "Lesson marked as watched", "new_score": score.score}, status=status.HTTP_200_OK)

class VideoScoreListView(generics.ListAPIView):
    serializer_class = VideoScoreSerializer

    def get_queryset(self):
        username = self.request.query_params.get("username")
        if username:
            return VideoScore.objects.filter(username=username)
        return VideoScore.objects.all()

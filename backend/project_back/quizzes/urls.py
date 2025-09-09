from django.urls import path
from .views import (
    QuizListView, QuizDetailView, ScoreCreateView, LeaderboardView,
    VideoModuleListView, VideoLessonListView,
    MarkLessonWatchedView, VideoScoreListView
)

urlpatterns = [
    # quizzes
    path("quizzes/", QuizListView.as_view(), name="quiz-list"),
    path("quizzes/<int:pk>/", QuizDetailView.as_view(), name="quiz-detail"),
    path("scores/add/", ScoreCreateView.as_view(), name="score-add"),
    path("leaderboard/", LeaderboardView.as_view(), name="leaderboard"),

    # video modules
    path("videomodules/", VideoModuleListView.as_view(), name="video-module-list"),
    path("videomodules/<int:module_id>/lessons/", VideoLessonListView.as_view(), name="video-lesson-list"),

    # progress & scores
    path("videos/progress/", MarkLessonWatchedView.as_view(), name="video-progress"),
    path("videos/scores/", VideoScoreListView.as_view(), name="video-score-list"),
]
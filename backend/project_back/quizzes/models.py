from django.db import models

class Quiz(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()

    def __str__(self):
        return self.title


class Question(models.Model):
    quiz = models.ForeignKey(Quiz, related_name="questions", on_delete=models.CASCADE)
    question_text = models.TextField()
    correct_answer = models.CharField(max_length=200)  # store correct answer

    def __str__(self):
        return self.question_text


class Option(models.Model):
    question = models.ForeignKey(Question, related_name="options", on_delete=models.CASCADE)
    option_text = models.CharField(max_length=200)

    def __str__(self):
        return self.option_text


class Score(models.Model):
    username = models.CharField(max_length=150, default="anonymous")
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE)
    score = models.IntegerField()
    date_taken = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.username} - {self.quiz.title} - {self.score}"


class VideoModule(models.Model):
    CATEGORIES = [
        ("organic", "Organic Finds"),
        ("bamboo", "Bamboo & Wood"),
        ("plasticfree", "Plastic-Free Living"),
        ("naturalcare", "Natural Care"),
        ("upcycled", "Upcycled Style"),
    ]

    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    category = models.CharField(max_length=50, choices=CATEGORIES, default="organic")

    def __str__(self):
        return self.title

    def total_lessons(self):
        return self.lessons.count()


class VideoLesson(models.Model):
    VIDEO_TYPES = [
        ("video", "Video File"),
        ("youtube", "YouTube"),
        ("drive", "Google Drive"),
    ]

    module = models.ForeignKey(VideoModule, related_name="lessons", on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    type = models.CharField(max_length=20, choices=VIDEO_TYPES)
    content = models.TextField()  # URL or file path

    def __str__(self):
        return f"{self.module.title} - {self.title}"


class VideoProgress(models.Model):
    username = models.CharField(max_length=150)
    module = models.ForeignKey(VideoModule, on_delete=models.CASCADE)
    lesson = models.ForeignKey(VideoLesson, on_delete=models.CASCADE)
    watched = models.BooleanField(default=False)

    class Meta:
        unique_together = ("username", "lesson")

    def __str__(self):
        return f"{self.username} - {self.lesson.title}"


class VideoScore(models.Model):
    username = models.CharField(max_length=150)
    module = models.ForeignKey(VideoModule, on_delete=models.CASCADE)
    score = models.IntegerField(default=0)

    class Meta:
        unique_together = ("username", "module")

    def __str__(self):
        return f"{self.username} - {self.module.title}: {self.score}"

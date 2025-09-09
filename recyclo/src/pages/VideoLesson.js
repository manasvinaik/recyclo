import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { markLessonWatched, fetchVideoLessons } from "../services/api";

function VideoLesson() {
  const { moduleId, lessonId } = useParams();
  const location = useLocation();
  const username = location.state?.username || "guestuser"; // fallback
  const [lesson, setLesson] = useState(null);

  useEffect(() => {
    // Fetch lessons from backend
    fetchVideoLessons(moduleId).then((lessons) => {
      const foundLesson = lessons.find(
        (l) => l.id === parseInt(lessonId)
      );
      setLesson(foundLesson);

      // Mark lesson as watched
      if (foundLesson && username) {
        markLessonWatched({ username, lesson: foundLesson.id });
      }
    });
  }, [moduleId, lessonId, username]);

  if (!lesson) return <h2>Lesson not found!</h2>;

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h2>{lesson.title}</h2>

      {lesson.type === "video" && (
        <video width="640" height="360" controls>
          <source src={lesson.content} type="video/mp4" />
        </video>
      )}

      {lesson.type === "youtube" && (
        <iframe
          width="640"
          height="360"
          src={lesson.content}
          title="YouTube video"
          allowFullScreen
        ></iframe>
      )}

      {lesson.type === "drive" && (
        <iframe
          src={lesson.content}
          width="640"
          height="360"
          allow="autoplay"
          title="Google Drive video"
        ></iframe>
      )}
    </div>
  );
}

export default VideoLesson;

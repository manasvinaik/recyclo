import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { markLessonWatched, fetchVideoLessons } from "../services/api";

function VideoLesson() {
  const { moduleId, lessonId } = useParams();
  const location = useLocation();
  const username = location.state?.username || "guestuser";
  const [lesson, setLesson] = useState(null);

  useEffect(() => {
    fetchVideoLessons(moduleId).then((lessons) => {
      const foundLesson = lessons.find((l) => l.id === parseInt(lessonId));
      setLesson(foundLesson);

      if (foundLesson && username) {
        markLessonWatched({ username, lesson: foundLesson.id });
      }
    });
  }, [moduleId, lessonId, username]);

  if (!lesson)
    return (
      <h2 style={{ textAlign: "center", marginTop: "4rem" }}>
        Lesson not found!
      </h2>
    );

  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "2rem auto",
        padding: "2rem",
        borderRadius: "20px",
        background: "linear-gradient(180deg, #f0fff4, #e0f2fe)",
        boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <h2
        style={{
          fontSize: "2rem",
          color: "#065f46",
          marginBottom: "1.5rem",
          textAlign: "center",
        }}
      >
        {lesson.title}
      </h2>

      <div
        style={{
          position: "relative",
          paddingBottom: "56.25%", // 16:9 ratio
          height: 0,
          marginBottom: "2rem",
        }}
      >
        {lesson.type === "video" && (
          <video
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            }}
            controls
          >
            <source src={lesson.content} type="video/mp4" />
          </video>
        )}

        {lesson.type === "youtube" && (
          <iframe
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            }}
            src={lesson.content}
            title="YouTube video"
            allowFullScreen
          ></iframe>
        )}

        {lesson.type === "drive" && (
          <iframe
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            }}
            src={lesson.content}
            allow="autoplay"
            title="Google Drive video"
          ></iframe>
        )}
      </div>

      <p style={{ textAlign: "center", color: "#047857", fontWeight: "bold" }}>
        ✅ Marked as Watched
      </p>
    </div>
  );
}

export default VideoLesson;

import React, { useEffect, useState } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import { fetchVideoLessons } from "../services/api";

function VideoRoadmap() {
  const { id: moduleId } = useParams();
  const location = useLocation();
  const username = location.state?.username || "guestuser"; // fallback
  const [module, setModule] = useState(null);
  const [lessons, setLessons] = useState([]);

  useEffect(() => {
    const loadModuleLessons = async () => {
      // fetch lessons from DB
      const lessonsData = await fetchVideoLessons(moduleId);
      setLessons(lessonsData);

      // set module title if any lessons exist
      if (lessonsData.length > 0) {
        setModule({ title: lessonsData[0].module_title });
      }
    };

    loadModuleLessons();
  }, [moduleId]);

  if (!module) return <h2 style={{ textAlign: "center" }}>Module not found!</h2>;

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h2>{module.title}</h2>
      <h3>Lessons</h3>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {lessons.map((lesson) => (
          <li key={lesson.id} style={{ margin: "0.5rem 0" }}>
            <Link
              to={`/game/videos/${moduleId}/${lesson.id}`}
              state={{ username }}
              style={{
                padding: "0.5rem 1rem",
                border: "1px solid #ccc",
                borderRadius: "6px",
                textDecoration: "none",
                display: "inline-block",
                margin: "0.25rem",
              }}
            >
              {lesson.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default VideoRoadmap;

import React, { useEffect, useState } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import { fetchVideoLessons } from "../services/api";

function VideoRoadmap() {
  const { id } = useParams(); // moduleId
  const location = useLocation();
  const username = location.state?.username || "guestuser";
  const [lessons, setLessons] = useState([]);
  const [category, setCategory] = useState("");

  useEffect(() => {
    fetchVideoLessons(id).then((data) => {
      setLessons(data);
      if (data.length > 0) {
        setCategory(data[0].module_category); // coming from serializer
      }
    });
  }, [id, username]);

  return (
    <div style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
      <h2 style={{ textAlign: "center", marginBottom: "2rem", color: "#047857" }}>
        Module Roadmap
      </h2>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {lessons.map((lesson) => (
          <li
            key={lesson.id}
            style={{
              marginBottom: "1rem",
              background: "#f0fdf4",
              padding: "1rem 1.5rem",
              borderRadius: "8px",
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
          >
            <Link
              to={`/game/videos/${id}/${lesson.id}`}
              state={{ username }}
              style={{
                textDecoration: "none",
                color: "#065f46",
                fontWeight: "500",
              }}
            >
              {lesson.title} {lesson.watched && <span>✅</span>}
            </Link>
          </li>
        ))}
      </ul>

      {category && (
        <div
          style={{
            marginTop: "3rem",
            padding: "1.5rem",
            background: "#e0f2fe",
            borderRadius: "10px",
            textAlign: "center",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          }}
        >
          <p style={{ fontSize: "1.2rem", marginBottom: "1rem" }}>
            💚 Check out eco-friendly products inspired by this module:{" "}
            <b>{category}</b>
          </p>
          <Link
            to={`/products?category=${encodeURIComponent(category)}`}
            style={{
              padding: "0.75rem 1.5rem",
              background: "#047857",
              color: "#fff",
              borderRadius: "8px",
              textDecoration: "none",
              fontWeight: "bold",
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) => (e.target.style.background = "#065f46")}
            onMouseLeave={(e) => (e.target.style.background = "#047857")}
          >
            Shop {category}
          </Link>
        </div>
      )}
    </div>
  );
}

export default VideoRoadmap;

import React from "react";
import { Link } from "react-router-dom";

function QuizCard({ id, title, description }) {
  return (
    <div
      style={{
        borderRadius: "12px",
        padding: "1.5rem",
        width: "250px",
        textAlign: "center",
        background: "#d9f2d9",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        transition: "transform 0.2s, box-shadow 0.2s",
      }}
    >
      <h3 style={{ color: "#1e4620", marginBottom: "0.75rem" }}>{title}</h3>
      <p style={{ color: "#3a6b3a", fontSize: "0.95rem", marginBottom: "1rem" }}>
        {description}
      </p>
      <Link
        to={`/game/quizzes/${id}`}
        style={{
          display: "inline-block",
          padding: "0.5rem 1rem",
          borderRadius: "6px",
          border: "none",
          background: "#047857",
          color: "#fff",
          fontWeight: "bold",
          textDecoration: "none",
          cursor: "pointer",
          transition: "background 0.2s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = "#065f46")}
        onMouseLeave={(e) => (e.currentTarget.style.background = "#047857")}
      >
        Start Quiz
      </Link>
    </div>
  );
}

export default QuizCard;

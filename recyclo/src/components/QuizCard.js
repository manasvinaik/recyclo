import React from "react";
import { Link } from "react-router-dom";
import { FaClipboardCheck } from "react-icons/fa"; // quiz icon

function QuizCard({ id, title, description }) {
  return (
    <div
      style={{
        background: "linear-gradient(135deg, #a7f3d0, #3b82f6)", // green to blue gradient
        borderRadius: "20px",
        padding: "2rem",
        width: "260px",
        textAlign: "center",
        boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
        transition: "transform 0.3s, box-shadow 0.3s",
        cursor: "pointer",
        color: "#065f46",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-6px)";
        e.currentTarget.style.boxShadow = "0 12px 28px rgba(0,0,0,0.25)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.15)";
      }}
    >
      <div style={{ marginBottom: "1rem" }}>
        <FaClipboardCheck size={40} color="#047857" />
      </div>
      <h3 style={{ marginBottom: "0.75rem", fontSize: "1.3rem", fontWeight: "bold" }}>
        {title}
      </h3>
      <p style={{ fontSize: "0.95rem", marginBottom: "1.5rem", color: "#065f46" }}>
        {description}
      </p>
      <Link
        to={`/game/quizzes/${id}`}
        style={{
          display: "inline-block",
          padding: "0.6rem 1.3rem",
          borderRadius: "12px",
          background: "#10b981",
          color: "#fff",
          fontWeight: "bold",
          textDecoration: "none",
          transition: "background 0.3s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = "#047857")}
        onMouseLeave={(e) => (e.currentTarget.style.background = "#10b981")}
      >
        Start Quiz
      </Link>
    </div>
  );
}

export default QuizCard;

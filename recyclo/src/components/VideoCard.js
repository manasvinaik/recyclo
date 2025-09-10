import React from "react";
import { Link } from "react-router-dom";
import { FaPlayCircle } from "react-icons/fa";

function VideoCard({ id, title, description }) {
  return (
    <div
      style={{
        borderRadius: "16px",
        padding: "1.5rem",
        width: "260px",
        textAlign: "center",
        background: "linear-gradient(145deg, #d9f2d9, #f0fff4)",
        boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
        transition: "transform 0.3s, box-shadow 0.3s",
        cursor: "pointer",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-5px)";
        e.currentTarget.style.boxShadow = "0 12px 24px rgba(0,0,0,0.2)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.1)";
      }}
    >
      <FaPlayCircle size={40} color="#047857" style={{ marginBottom: "1rem" }} />
      <h3 style={{ color: "#065f46", marginBottom: "0.5rem" }}>{title}</h3>
      <p style={{ color: "#1e4620", fontSize: "0.95rem", marginBottom: "1rem" }}>
        {description}
      </p>
      <Link
        to={`/game/videos/${id}`}
        style={{
          display: "inline-block",
          padding: "0.5rem 1rem",
          borderRadius: "8px",
          background: "#047857",
          color: "#fff",
          textDecoration: "none",
          fontWeight: "bold",
          transition: "background 0.3s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = "#065f46")}
        onMouseLeave={(e) => (e.currentTarget.style.background = "#047857")}
      >
        View Module
      </Link>
    </div>
  );
}

export default VideoCard;

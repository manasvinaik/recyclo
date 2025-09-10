import React from "react";
import { Link } from "react-router-dom";
import { FaGamepad, FaVideo, FaClipboardList } from "react-icons/fa"; // icons

function GameCard({ title, link }) {
  // Pick icon based on title
  const getIcon = () => {
    if (title.toLowerCase().includes("quiz")) return <FaClipboardList size={40} />;
    if (title.toLowerCase().includes("video")) return <FaVideo size={40} />;
    if (title.toLowerCase().includes("trash")) return <FaGamepad size={40} />;
    return <FaGamepad size={40} />;
  };

  return (
    <div
      style={{
        background: "linear-gradient(135deg, #34d399, #3b82f6)", // green to blue
        padding: "2rem",
        borderRadius: "20px",
        textAlign: "center",
        width: "220px",
        boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
        transition: "transform 0.3s, box-shadow 0.3s",
        cursor: "pointer",
        color: "#fff",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-8px)";
        e.currentTarget.style.boxShadow = "0 12px 28px rgba(0,0,0,0.3)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.2)";
      }}
    >
      <div style={{ marginBottom: "1rem" }}>{getIcon()}</div>
      <h3 style={{ marginBottom: "1rem", fontSize: "1.2rem", fontWeight: "bold" }}>
        {title}
      </h3>
      <Link
        to={link}
        style={{
          display: "inline-block",
          padding: "0.5rem 1.2rem",
          background: "#fff", 
          color: "#10b981",
          borderRadius: "12px",
          textDecoration: "none",
          fontWeight: "bold",
          transition: "all 0.3s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = "#6ee7beff")}
      >
        Play
      </Link>
    </div>
  );
}

export default GameCard;

import React from "react";
import { Link } from "react-router-dom";

function VideoCard({ id, title, description }) {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "1rem",
        width: "250px",
        textAlign: "center",
        background: "#f9f9f9",
      }}
    >
      <h3>{title}</h3>
      <p>{description}</p>
      <Link to={`/game/videos/${id}`}>View Module</Link>
    </div>
  );
}

export default VideoCard;

import React from "react";
import { Link } from "react-router-dom";

function GameCard({ title, link }) {
  return (
    <div style={{
      border: "1px solid #ccc",
      padding: "1rem",
      borderRadius: "8px",
      textAlign: "center",
      width: "200px"
    }}>
      <h3>{title}</h3>
      <Link to={link}>Go</Link>
    </div>
  );
}

export default GameCard;

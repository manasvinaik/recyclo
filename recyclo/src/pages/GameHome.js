import React from "react";
import GameCard from "../components/Gamecard";

function GameHome() {
  return (
    <div
      style={{
        padding: "2rem",
        minHeight: "100vh",
        background: "#f0fff4", // soft green background
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <h2 style={{ color: "#065f46", marginBottom: "2rem" }}>Game Dashboard</h2>

      <div
        style={{
          display: "flex",
          gap: "2rem",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <GameCard
          title="Quizzes"
          link="/game/quizzes"
          style={{
            background: "#d9f2d9",
            padding: "2rem",
            borderRadius: "12px",
            boxShadow: "0 6px 12px rgba(0,0,0,0.1)",
            minWidth: "200px",
            textAlign: "center",
            transition: "transform 0.2s, box-shadow 0.2s",
          }}
        />

        <GameCard
          title="Video Modules"
          link="/game/videos"
          style={{
            background: "#d9f2d9",
            padding: "2rem",
            borderRadius: "12px",
            boxShadow: "0 6px 12px rgba(0,0,0,0.1)",
            minWidth: "200px",
            textAlign: "center",
            transition: "transform 0.2s, box-shadow 0.2s",
          }}
        />

        <GameCard
          title="Trash Sorting Game"
          link="/game/trash"
          style={{
            background: "#d9f2d9",
            padding: "2rem",
            borderRadius: "12px",
            boxShadow: "0 6px 12px rgba(0,0,0,0.1)",
            minWidth: "200px",
            textAlign: "center",
            transition: "transform 0.2s, box-shadow 0.2s",
          }}
        />
      </div>
    </div>
  );
}

export default GameHome;

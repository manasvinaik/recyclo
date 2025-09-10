import React from "react";
import GameCard from "../components/Gamecard";
import { FaBook, FaVideo, FaRecycle } from "react-icons/fa"; // icons

function GameHome() {
  const cards = [
    {
      title: "Quizzes",
      link: "/game/quizzes",
      icon: <FaBook size={40} color="#047857" />,
      bg: "#d1fae5",
    },
    {
      title: "Video Modules",
      link: "/game/videos",
      icon: <FaVideo size={40} color="#047857" />,
      bg: "#d1fae5",
    },
    {
      title: "Trash Sorting Game",
      link: "/game/trash",
      icon: <FaRecycle size={40} color="#047857" />,
      bg: "#d1fae5",
    },
  ];

  return (
    <div
      style={{
        padding: "2rem",
        minHeight: "100vh",
        background: "#f0fff4",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <h2
        style={{
          color: "#065f46",
          textAlign: "center",
          marginBottom: "3rem",
          fontSize: "2.2rem",
        }}
      >
        Game Dashboard
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "2rem",
          justifyItems: "center",
        }}
      >
        {cards.map((card) => (
          <GameCard
            key={card.title}
            title={card.title}
            link={card.link}
            style={{
              background: card.bg,
              padding: "2rem",
              borderRadius: "16px",
              boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
              width: "100%",
              maxWidth: "250px",
              textAlign: "center",
              cursor: "pointer",
              transition: "transform 0.3s, box-shadow 0.3s",
            }}
          >
            <div style={{ marginBottom: "1rem" }}>{card.icon}</div>
            <div
              style={{
                fontWeight: "600",
                fontSize: "1.1rem",
                color: "#065f46",
              }}
            >
              {card.title}
            </div>
          </GameCard>
        ))}
      </div>
    </div>
  );
}

export default GameHome;

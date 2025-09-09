import React, { useEffect, useState } from "react";
import QuizCard from "../components/QuizCard";
import { fetchQuizzes } from "../services/api";
import { Link } from "react-router-dom"; // import Link

function Quiz() {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    fetchQuizzes().then(data => setQuizzes(data));
  }, []);

  return (
    <div
      style={{
        padding: "3rem",
        textAlign: "center",
        minHeight: "100vh",
        background: "linear-gradient(135deg, #e6f2e6, #ffffff)",
      }}
    >
      {/* Leaderboard Link */}
      <div style={{ marginBottom: "2rem", textAlign: "right" }}>
        <Link
          to="/leaderboard"
          style={{
            padding: "0.5rem 1rem",
            borderRadius: "6px",
            background: "#047857",
            color: "#fff",
            fontWeight: "bold",
            textDecoration: "none",
            transition: "background 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#065f46")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "#047857")}
        >
          View Leaderboard
        </Link>
      </div>

      <h2 style={{ color: "#1e4620", fontSize: "2.5rem", marginBottom: "2rem" }}>
        Available Quizzes
      </h2>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: "1.5rem",
        }}
      >
        {quizzes.map((quiz) => (
          <QuizCard
            key={quiz.id}
            id={quiz.id}
            title={quiz.title}
            description={quiz.description}
            style={{
              background: "#d9f2d9",
              borderRadius: "12px",
              padding: "1.5rem",
              minWidth: "220px",
              maxWidth: "280px",
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-5px)";
              e.currentTarget.style.boxShadow = "0 8px 16px rgba(0,0,0,0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 8px rgba(0,0,0,0.1)";
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default Quiz;

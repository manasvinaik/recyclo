import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchQuizDetail } from "../services/api";

function QuizDetail() {
  const { id } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [username, setUsername] = useState("");
  const [enteredUsername, setEnteredUsername] = useState(false);

  useEffect(() => {
    fetchQuizDetail(id).then(data => setQuiz(data));
  }, [id]);

  const handleAnswer = (option) => {
    if (option === quiz.questions[currentQ].correct_answer) {
      setScore(score + 1);
    }

    const nextQ = currentQ + 1;
    if (nextQ < quiz.questions.length) {
      setCurrentQ(nextQ);
    } else {
      setShowResult(true);
      // Submit score to backend
      fetch("http://127.0.0.1:8000/api/scores/add/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, quiz: quiz.id, score: score + (option === quiz.questions[currentQ].correct_answer ? 1 : 0) })
      });
    }
  };

  if (!enteredUsername) {
    return (
      <div style={{ textAlign: "center", padding: "3rem" }}>
        <h2>Enter your username to start the quiz</h2>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Your username"
          style={{ padding: "0.5rem", fontSize: "1rem", marginRight: "0.5rem" }}
        />
        <button
          onClick={() => username.trim() && setEnteredUsername(true)}
          style={{
            padding: "0.5rem 1rem",
            fontWeight: "bold",
            background: "#047857",
            color: "#fff",
            borderRadius: "6px",
            cursor: "pointer"
          }}
        >
          Start Quiz
        </button>
      </div>
    );
  }

  if (!quiz) {
    return <h2 style={{ textAlign: "center" }}>Loading Quiz...</h2>;
  }

  return (
    <div
      style={{
        padding: "2rem",
        textAlign: "center",
        background: "#f0fff4",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <h2 style={{ color: "#065f46", marginBottom: "1rem" }}>{quiz.title}</h2>

      {!showResult ? (
        <div
          style={{
            width: "100%",
            maxWidth: "600px",
            background: "#d9f2d9",
            padding: "2rem",
            borderRadius: "12px",
            boxShadow: "0 6px 12px rgba(0,0,0,0.1)",
          }}
        >
          <h3 style={{ color: "#1e4620" }}>{quiz.questions[currentQ].question_text}</h3>

          <div style={{ marginTop: "1.5rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {quiz.questions[currentQ].options.map((option, i) => (
              <button
                key={i}
                onClick={() => handleAnswer(option.option_text)}
                style={{
                  padding: "0.75rem 1.5rem",
                  borderRadius: "8px",
                  border: "none",
                  cursor: "pointer",
                  background: "#047857",
                  color: "#fff",
                  fontWeight: "bold",
                  transition: "background 0.2s, transform 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#065f46";
                  e.currentTarget.style.transform = "scale(1.05)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#047857";
                  e.currentTarget.style.transform = "scale(1)";
                }}
              >
                {option.option_text}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div
          style={{
            width: "100%",
            maxWidth: "400px",
            background: "#d9f2d9",
            padding: "2rem",
            borderRadius: "12px",
            boxShadow: "0 6px 12px rgba(0,0,0,0.1)",
            textAlign: "center",
          }}
        >
          <h3 style={{ color: "#1e4620" }}>Quiz Completed 🎉</h3>
          <p style={{ color: "#065f46", fontWeight: "bold", fontSize: "1.2rem" }}>
            {username}, you scored {score} out of {quiz.questions.length}
          </p>
        </div>
      )}
    </div>
  );
}

export default QuizDetail;

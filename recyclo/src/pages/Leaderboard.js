import React, { useEffect, useState } from "react";

function Leaderboard() {
  const [leaders, setLeaders] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/leaderboard/")
      .then(res => res.json())
      .then(data => setLeaders(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={{
      padding: "3rem",
      minHeight: "100vh",
      background: "linear-gradient(135deg, #e6f2e6, #ffffff)",
      textAlign: "center",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
    }}>
      <h2 style={{ color: "#1e4620", fontSize: "2.5rem", marginBottom: "2rem" }}>
        Leaderboard - Top 3 Users
      </h2>

      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1rem"
      }}>
        {leaders.length === 0 && <p style={{ color: "#065f46" }}>No scores yet!</p>}

        {leaders.map((user, index) => (
          <div key={user.username} style={{
            width: "300px",
            background: "#d9f2d9",
            padding: "1.5rem",
            borderRadius: "12px",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
            display: "flex",
            justifyContent: "space-between",
            fontWeight: "bold",
            color: "#065f46"
          }}>
            <span>{index + 1}. {user.username}</span>
            <span>{user.total_score}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Leaderboard;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import VideoCard from "../components/VideoCard";
import { fetchVideoModules } from "../services/api";

function VideoModule() {
  const [modules, setModules] = useState([]);
  const [username, setUsername] = useState("");
  const [enteredUsername, setEnteredUsername] = useState(false);
  const navigate = useNavigate();

  // Fetch modules from backend
  useEffect(() => {
    fetchVideoModules().then((data) => setModules(data));
  }, []);

  // Ask for username first
  if (!enteredUsername) {
    return (
      <div style={{ textAlign: "center", padding: "3rem" }}>
        <h2>Enter your username to continue</h2>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Your username"
          style={{ padding: "0.5rem", fontSize: "1rem", marginRight: "0.5rem" }}
        />
        <button
          onClick={() => {
            if (username.trim()) {
              setEnteredUsername(true);
            }
          }}
          style={{
            padding: "0.5rem 1rem",
            fontWeight: "bold",
            background: "#047857",
            color: "#fff",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Continue
        </button>
      </div>
    );
  }

  // After username is entered, show modules
  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h2>Learning Modules</h2>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: "1rem",
          marginTop: "1rem",
        }}
      >
        {modules.map((module) => (
          <div
            key={module.id}
            style={{ cursor: "pointer" }}
            onClick={() =>
              navigate(`/game/videos/${module.id}`, { state: { username } })
            }
          >
            <VideoCard
              id={module.id}
              title={module.title}
              description={module.description}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default VideoModule;

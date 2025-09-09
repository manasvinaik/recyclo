import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000/api/";

// ------------------- Quiz APIs -------------------
export const fetchQuizzes = async () => {
  try {
    const res = await axios.get(`${BASE_URL}quizzes/`);
    return res.data;
  } catch (err) {
    console.error("Failed to fetch quizzes", err);
    return [];
  }
};

export const fetchQuizDetail = async (id) => {
  try {
    const res = await axios.get(`${BASE_URL}quizzes/${id}/`);
    return res.data;
  } catch (err) {
    console.error("Failed to fetch quiz detail", err);
    return null;
  }
};

export const submitScore = async (data) => {
  try {
    const res = await axios.post(`${BASE_URL}scores/add/`, data);
    return res.data;
  } catch (err) {
    console.error("Failed to submit score", err);
    return null;
  }
};

export const fetchLeaderboard = async () => {
  try {
    const res = await axios.get(`${BASE_URL}leaderboard/`);
    return res.data;
  } catch (err) {
    console.error("Failed to fetch leaderboard", err);
    return [];
  }
};

// ------------------- Video APIs -------------------
export const fetchVideoModules = async () => {
  try {
    const res = await axios.get(`${BASE_URL}videomodules/`);
    return res.data;
  } catch (err) {
    console.error("Failed to fetch video modules", err);
    return [];
  }
};

export const fetchVideoLessons = async (module_id) => {
  try {
    const res = await axios.get(`${BASE_URL}videomodules/${module_id}/lessons/`);
    return res.data;
  } catch (err) {
    console.error("Failed to fetch lessons", err);
    return [];
  }
};

export const markLessonWatched = async ({ username, lesson }) => {
  try {
    const res = await axios.post(`${BASE_URL}videos/progress/`, { username, lesson });
    return res.data;
  } catch (err) {
    console.error("Failed to mark lesson as watched", err);
    return null;
  }
};

export const fetchVideoScores = async (username) => {
  try {
    const res = await axios.get(`${BASE_URL}videos/scores/`, { params: { username } });
    return res.data;
  } catch (err) {
    console.error("Failed to fetch video scores", err);
    return [];
  }
};

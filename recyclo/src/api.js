// src/api.js
import axios from "axios";

const API_BASE = process.env.REACT_APP_API_BASE || "http://127.0.0.1:8000/api";

const api = axios.create({
  baseURL: API_BASE,
  // NOTE: do NOT set Content-Type here for multipart requests.
});

// Optional: attach auth token later if you add auth
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access"); // if you use JWT later
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
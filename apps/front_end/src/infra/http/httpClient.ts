import axios from "axios";

export const httpClient = axios.create({
  baseURL: "http://127.0.0.1:8000", // ✅ FIXED (no /api here)
  headers: {
    "Content-Type": "application/json",
  },
});

// 🔥 Attach JWT token automatically
httpClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("access"); // ✅ FIXED KEY

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
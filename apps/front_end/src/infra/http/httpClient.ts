import axios from "axios";

export const httpClient = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

httpClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("access"); // ✅ NOT "token"

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
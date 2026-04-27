import axios from "axios";

export const httpClient = axios.create({
  baseURL: "http://127.0.0.1:8000/api/", // ✅ FIXED (added trailing slash)
  headers: {
    "Content-Type": "application/json",
  },
});

// 🔥 Global error handler
httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);
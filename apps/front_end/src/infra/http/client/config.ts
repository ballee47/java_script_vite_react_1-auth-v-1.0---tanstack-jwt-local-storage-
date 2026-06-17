export const httpConfig = {
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api",

  timeout: 15000,

  withCredentials: true, // IMPORTANT for httpOnly cookies (refresh token)

  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
}; 
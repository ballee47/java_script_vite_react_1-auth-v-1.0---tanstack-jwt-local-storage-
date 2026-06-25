import { BASE_URL } from "@/infra/http/config/baseURL";

export const httpConfig = {
  baseURL: BASE_URL,

  timeout: 15000,

  withCredentials: true, // IMPORTANT for httpOnly cookies (refresh token)

  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
}; 
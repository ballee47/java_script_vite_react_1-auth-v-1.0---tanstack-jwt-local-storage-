import axios from "axios";
import { env } from "@/config/env";

export const httpClient = axios.create({
  baseURL: env.API_BASE_URL,
  withCredentials: true,
  timeout: 30000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

if (import.meta.env.DEV) {
  httpClient.interceptors.request.use((config) => {
    console.log(
      `[API] ${config.method?.toUpperCase()} ${config.url}`
    );
    return config;
  });
}
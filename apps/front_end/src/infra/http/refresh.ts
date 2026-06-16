import axios from "axios";
import { env } from "@/config/env";

let refreshPromise: Promise<void> | null = null;

export const refreshAccessToken = async (): Promise<void> => {
  if (refreshPromise) {
    return refreshPromise;
  }

  refreshPromise = (async () => {
    const refreshClient = axios.create({
      baseURL: env.API_BASE_URL,
      withCredentials: true,
    });

    await refreshClient.post("/api/token/refresh/");
  })();

  try {
    await refreshPromise;
  } finally {
    refreshPromise = null;
  }
};
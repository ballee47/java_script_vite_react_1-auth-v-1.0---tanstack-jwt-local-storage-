import axios from "axios";
import { env } from "@/config/env";
import { tokenStorage } from "@/infra/storage/cookieStorage";
import { RefreshResponse } from "./types";

let refreshPromise: Promise<string> | null = null;

export const refreshAccessToken = async (): Promise<string> => {
  if (refreshPromise) {
    return refreshPromise;
  }

  refreshPromise = (async () => {
    const refreshToken = tokenStorage.getRefreshToken();

    if (!refreshToken) {
      throw new Error("Refresh token missing");
    }

    const refreshClient = axios.create({
      baseURL: env.API_BASE_URL,
      withCredentials: true,
    });

    const { data } = await refreshClient.post<RefreshResponse>(
      "/api/token/refresh/",
      {
        refresh: refreshToken,
      }
    );

    tokenStorage.setAccessToken(data.access);

    return data.access;
  })();

  try {
    return await refreshPromise;
  } finally {
    refreshPromise = null;
  }
};

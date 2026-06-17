import axios from "axios";

import { httpConfig } from "../client/config";

export async function logout(): Promise<void> {
  try {
    await axios.post(
      `${httpConfig.baseURL}/auth/logout`,
      {},
      {
        withCredentials: true,
      }
    );
  } catch {
    // Ignore logout errors
    // We still want to force local logout
  }

  window.location.href = "/login";
}
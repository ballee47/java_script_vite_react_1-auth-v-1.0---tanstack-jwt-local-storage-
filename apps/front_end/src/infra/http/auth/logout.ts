
// src/infra/http/auth/logout.ts

import { apiGateway } from "../gateway/apiGateway";

let logoutPromise: Promise<void> | null = null;

export const logout = async (): Promise<void> => {
  if (logoutPromise) {
    return logoutPromise;
  }

  logoutPromise = (async () => {
    try {
      await apiGateway.post<void, void>(
        "/api/logout/"
      );
    } catch (error) {
      console.error("Logout failed:", error);

      // optional: ignore backend errors
      // throw error;
    } finally {
      localStorage.clear();
      sessionStorage.clear();
    }
  })().finally(() => {
    logoutPromise = null;
  });

  return logoutPromise;
};


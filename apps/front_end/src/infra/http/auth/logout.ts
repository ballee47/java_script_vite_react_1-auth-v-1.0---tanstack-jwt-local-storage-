import { axiosInstance } from "@/infra/http/client/axiosInstance";

let logoutPromise: Promise<void> | null = null;

export const logout = async (): Promise<void> => {
  if (logoutPromise) return logoutPromise;

  logoutPromise = (async () => {
    try {
      await axiosInstance.post("api/logout/");
    } catch (err) {
      // ignore backend errors
    } finally {
      localStorage.clear();
    }
  })().finally(() => {
    logoutPromise = null;
  });

  return logoutPromise;
};
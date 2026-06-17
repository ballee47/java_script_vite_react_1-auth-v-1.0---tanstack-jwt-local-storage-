import { axiosInstance } from "@/infra/http/client/axiosInstance";

let isLoggingOut = false;

export const logout = async () => {
  if (isLoggingOut) return;
  isLoggingOut = true;

  try {
    await axiosInstance.post("api/logout/");
  } catch (err) {
    // ignore backend errors
  }

  // Clear frontend state only (don't redirect here)
  localStorage.clear();
};
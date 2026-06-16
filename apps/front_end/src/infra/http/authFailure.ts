import { clearAllStorage } from "@/infra/storage/cookieStorage";

export const handleAuthFailure = () => {
  clearAllStorage();

  if (window.location.pathname !== "/login") {
    window.location.href = "/login";
  }
};

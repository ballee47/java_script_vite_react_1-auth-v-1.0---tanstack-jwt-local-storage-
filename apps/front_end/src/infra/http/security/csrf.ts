import Cookies from "js-cookie";

const SAFE_METHODS = ["get", "head", "options"];

export function getCsrfToken(): string | undefined {
  return Cookies.get("csrftoken");
}

export function shouldAttachCsrf(method?: string) {
  if (!method) return false;
  return !SAFE_METHODS.includes(method.toLowerCase());
}
// infra/http/security/csrf.ts

import Cookies from "js-cookie";

/**
 * CSRF Token Reader
 * - Uses js-cookie
 * - Works with Django csrftoken cookie
 * - Returns null if cookie doesn't exist
 */
export const getCsrfToken = (): string | null => {
  return Cookies.get("csrftoken") ?? null;
};
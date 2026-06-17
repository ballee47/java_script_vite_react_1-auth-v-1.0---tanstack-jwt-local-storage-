/**
 * CSRF Token Reader (Django-compatible, enterprise-safe)
 * - Works with cookie-based CSRF (csrftoken)
 * - Safe decoding
 * - No dependencies
 */
export const getCsrfToken = (): string | null => {
  if (typeof document === "undefined") return null;

  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith("csrftoken="));

  if (!match) return null;

  const token = match.split("=")[1];

  return token ? decodeURIComponent(token) : null;
};
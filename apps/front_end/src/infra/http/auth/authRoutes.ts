/**
 * Authentication-related endpoints.
 *
 * Any request matching one of these routes will NOT trigger
 * the automatic token refresh flow inside the response interceptor.
 */
export const AUTH_ROUTES = [
  "/login",
  "/logout",
  "/refresh",
  "/token",
] as const;
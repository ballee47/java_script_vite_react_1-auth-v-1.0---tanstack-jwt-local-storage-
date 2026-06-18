export const BASE_URLS = {
  main: import.meta.env.VITE_API_MAIN,
  auth: import.meta.env.VITE_API_AUTH,
  analytics: import.meta.env.VITE_API_ANALYTICS,
} as const;
export const env = {
  API_URL: import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8000",
  API_VERSION: import.meta.env.VITE_API_VERSION ?? "v1",

  IS_DEV: import.meta.env.DEV,
  IS_PROD: import.meta.env.PROD,
  MODE: import.meta.env.MODE,
} as const;
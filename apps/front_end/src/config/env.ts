// src/config/env.ts

const requireEnv = (key: string): string => {
  const value = import.meta.env[key];
  if (!value) {
    console.warn(`⚠️ Missing env variable: ${key}`);
  }
  return value ?? "";
};

export const env = {
  // ─────────────────────────────────────────
  // API
  // ─────────────────────────────────────────
  API_BASE_URL: requireEnv("VITE_API_BASE_URL"),

  // ─────────────────────────────────────────
  // CLOUDINARY
  // ─────────────────────────────────────────
  CLOUDINARY_CLOUD_NAME: requireEnv("VITE_CLOUDINARY_CLOUD_NAME"),
  CLOUDINARY_UPLOAD_PRESET: requireEnv("VITE_CLOUDINARY_UPLOAD_PRESET"),
} as const;
export const logger = {
  info: (...args: unknown[]) => {
    if (import.meta.env.DEV) {
      console.log("[INFO]", ...args);
    }
  },

  warn: (...args: unknown[]) => {
    if (import.meta.env.DEV) {
      console.warn("[WARN]", ...args);
    }
  },

  error: (...args: unknown[]) => {
    console.error("[ERROR]", ...args);
  },
};

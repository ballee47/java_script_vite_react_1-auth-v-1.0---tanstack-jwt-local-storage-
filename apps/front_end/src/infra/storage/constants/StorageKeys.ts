/**
 * Centralized storage keys.
 *
 * All storage keys must be defined here.
 * Never use hardcoded strings throughout the application.
 */
export const StorageKeys = {
  AUTH: {
    ACCESS_TOKEN: "access_token",
    USER: "user",
  },

  APP: {
    THEME: "theme",
    LANGUAGE: "language",
    SIDEBAR_STATE: "sidebar_state",
  },

  CACHE: {
    CART: "cart",
    PRODUCTS: "products",
    CATEGORIES: "categories",
  },
} as const;
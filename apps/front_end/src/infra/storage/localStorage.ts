// src/infra/storage/localStorage.ts

// ─────────────────────────────────────────
// KEYS — defined once, used everywhere
// ─────────────────────────────────────────
const KEYS = {
  ACCESS_TOKEN: "access",
  REFRESH_TOKEN: "refresh",
  USERNAME: "username",
} as const;

// ─────────────────────────────────────────
// TOKEN STORAGE
// ─────────────────────────────────────────
export const tokenStorage = {

  // GET
  getAccessToken: (): string | null =>
    localStorage.getItem(KEYS.ACCESS_TOKEN),

  getRefreshToken: (): string | null =>
    localStorage.getItem(KEYS.REFRESH_TOKEN),

  // SET
  setAccessToken: (token: string): void =>
    localStorage.setItem(KEYS.ACCESS_TOKEN, token),

  setTokens: (access: string, refresh: string): void => {
    localStorage.setItem(KEYS.ACCESS_TOKEN, access);
    localStorage.setItem(KEYS.REFRESH_TOKEN, refresh);
  },

  // REMOVE
  clearTokens: (): void => {
    localStorage.removeItem(KEYS.ACCESS_TOKEN);
    localStorage.removeItem(KEYS.REFRESH_TOKEN);
  },

  // CHECK
  hasAccessToken: (): boolean =>
    !!localStorage.getItem(KEYS.ACCESS_TOKEN),
};

// ─────────────────────────────────────────
// USER STORAGE
// ─────────────────────────────────────────
export const userStorage = {

  getUsername: (): string | null =>
    localStorage.getItem(KEYS.USERNAME),

  setUsername: (username: string): void =>
    localStorage.setItem(KEYS.USERNAME, username),

  clearUsername: (): void =>
    localStorage.removeItem(KEYS.USERNAME),
};

// ─────────────────────────────────────────
// CLEAR EVERYTHING (on logout)
// ─────────────────────────────────────────
export const clearAllStorage = (): void => {
  tokenStorage.clearTokens();
  userStorage.clearUsername();
};
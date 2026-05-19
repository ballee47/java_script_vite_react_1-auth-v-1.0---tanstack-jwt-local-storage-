// src/infra/storage/cookieStorage.ts

const KEYS = {
  ACCESS_TOKEN: "access_token",
  REFRESH_TOKEN: "refresh_token",
  USERNAME: "username",
} as const;

// ─────────────────────────────────────────
// COOKIE UTILITIES
// ─────────────────────────────────────────
const getCookie = (name: string): string | null => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    try {
      return decodeURIComponent(parts.pop()!.split(";").shift()!);
    } catch (e) {
      return null;
    }
  }
  return null;
};

const setCookie = (
  name: string,
  value: string,
  options?: { maxAge?: number; path?: string; sameSite?: string; secure?: boolean }
): void => {
  const opts = options || {};
  let cookieString = `${name}=${encodeURIComponent(value)}`;

  if (opts.maxAge) cookieString += `; max-age=${opts.maxAge}`;
  if (opts.path) cookieString += `; path=${opts.path}`;
  if (opts.sameSite) cookieString += `; samesite=${opts.sameSite}`;
  if (opts.secure) cookieString += "; secure";

  document.cookie = cookieString;
};

const deleteCookie = (name: string): void => {
  document.cookie = `${name}=; max-age=0; path=/`;
};

// ─────────────────────────────────────────
// TOKEN STORAGE (Cookies)
// ─────────────────────────────────────────
export const tokenStorage = {
  // GET
  getAccessToken: (): string | null => getCookie(KEYS.ACCESS_TOKEN),

  getRefreshToken: (): string | null => getCookie(KEYS.REFRESH_TOKEN),

  // SET (7 days expiry)
  setAccessToken: (token: string): void => {
    if (token) {
      setCookie(KEYS.ACCESS_TOKEN, token, {
        maxAge: 7 * 24 * 60 * 60,
        path: "/",
        sameSite: "Lax",
      });
    }
  },

  setTokens: (access: string, refresh: string): void => {
    if (access) {
      setCookie(KEYS.ACCESS_TOKEN, access, {
        maxAge: 7 * 24 * 60 * 60,
        path: "/",
        sameSite: "Lax",
      });
    }
    if (refresh) {
      setCookie(KEYS.REFRESH_TOKEN, refresh, {
        maxAge: 30 * 24 * 60 * 60,
        path: "/",
        sameSite: "Lax",
      });
    }
  },

  // REMOVE
  clearTokens: (): void => {
    deleteCookie(KEYS.ACCESS_TOKEN);
    deleteCookie(KEYS.REFRESH_TOKEN);
  },

  // CHECK
  hasAccessToken: (): boolean => !!getCookie(KEYS.ACCESS_TOKEN),
};

// ─────────────────────────────────────────
// USER STORAGE (Cookies)
// ─────────────────────────────────────────
export const userStorage = {
  getUsername: (): string | null => getCookie(KEYS.USERNAME),

  setUsername: (username: string): void => {
    if (username) {
      setCookie(KEYS.USERNAME, username, {
        maxAge: 30 * 24 * 60 * 60,
        path: "/",
        sameSite: "Lax",
      });
    }
  },

  clearUsername: (): void => deleteCookie(KEYS.USERNAME),
};

// ─────────────────────────────────────────
// CLEAR EVERYTHING (on logout)
// ─────────────────────────────────────────
export const clearAllStorage = (): void => {
  tokenStorage.clearTokens();
  userStorage.clearUsername();
};

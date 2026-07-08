import { cookieAdapter } from "./adapters/cookieAdapter";

import { STORAGE_KEYS } from "./constants/storageKeys";

import {
  ACCESS_TOKEN_OPTIONS,
  REFRESH_TOKEN_OPTIONS,
} from "./constants/cookieOptions";

export const tokenStorage = {
  getAccessToken() {
    return cookieAdapter.get(
      STORAGE_KEYS.ACCESS_TOKEN
    );
  },

  getRefreshToken() {
    return cookieAdapter.get(
      STORAGE_KEYS.REFRESH_TOKEN
    );
  },

  setAccessToken(token: string) {
    cookieAdapter.set(
      STORAGE_KEYS.ACCESS_TOKEN,
      token,
      ACCESS_TOKEN_OPTIONS
    );
  },

  setRefreshToken(token: string) {
    cookieAdapter.set(
      STORAGE_KEYS.REFRESH_TOKEN,
      token,
      REFRESH_TOKEN_OPTIONS
    );
  },

  setTokens(
    access: string,
    refresh: string
  ) {
    this.setAccessToken(access);
    this.setRefreshToken(refresh);
  },

  clearTokens() {
    cookieAdapter.remove(
      STORAGE_KEYS.ACCESS_TOKEN
    );

    cookieAdapter.remove(
      STORAGE_KEYS.REFRESH_TOKEN
    );
  },

  hasAccessToken() {
    return cookieAdapter.has(
      STORAGE_KEYS.ACCESS_TOKEN
    );
  },
};
import { cookieAdapter } from "./adapters/cookieAdapter";

import { STORAGE_KEYS } from "./constants/storageKeys";

import { USERNAME_OPTIONS } from "./constants/cookieOptions";

export const userStorage = {
  getUsername() {
    return cookieAdapter.get(
      STORAGE_KEYS.USERNAME
    );
  },

  setUsername(username: string) {
    cookieAdapter.set(
      STORAGE_KEYS.USERNAME,
      username,
      USERNAME_OPTIONS
    );
  },

  clearUsername() {
    cookieAdapter.remove(
      STORAGE_KEYS.USERNAME
    );
  },
};
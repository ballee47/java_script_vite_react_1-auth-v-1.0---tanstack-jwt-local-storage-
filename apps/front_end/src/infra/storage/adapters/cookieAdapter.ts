// src/infra/storage/adapters/cookieAdapter.ts

import Cookies from "js-cookie";

type CookieOptions = Parameters<
  typeof Cookies.set
>[2];

export const cookieAdapter = {
  get(key: string): string | undefined {
    return Cookies.get(key);
  },

  set(
    key: string,
    value: string,
    options?: CookieOptions
  ): void {
    Cookies.set(key, value, options);
  },

  remove(key: string): void {
    Cookies.remove(key, {
      path: "/",
    });
  },

  has(key: string): boolean {
    return Cookies.get(key) !== undefined;
  },
};
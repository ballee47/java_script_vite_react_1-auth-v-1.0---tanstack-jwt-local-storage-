import Cookies from "js-cookie";

import type { StorageOptions } from "../types";
import type { IStorageAdapter } from "./IStorageAdapter";

export class CookieStorageAdapter implements IStorageAdapter {
  public get(key: string): string | null {
    return Cookies.get(key) ?? null;
  }

  public set(
    key: string,
    value: string,
    options?: StorageOptions
  ): void {
    Cookies.set(key, value, {
      expires: options?.expires,
      path: options?.path,
      domain: options?.domain,
      secure: options?.secure,
      sameSite: options?.sameSite,
    });
  }

  public remove(key: string): void {
    Cookies.remove(key);
  }

  public has(key: string): boolean {
    return Cookies.get(key) !== undefined;
  }
}
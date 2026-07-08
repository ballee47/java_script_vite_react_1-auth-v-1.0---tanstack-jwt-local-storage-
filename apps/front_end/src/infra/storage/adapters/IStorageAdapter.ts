import type { StorageOptions } from "../types";

export interface IStorageAdapter {
  /**
   * Retrieves a raw value from storage.
   */
  get(key: string): string | null;

  /**
   * Stores a raw string value.
   */
  set(
    key: string,
    value: string,
    options?: StorageOptions
  ): void;

  /**
   * Removes a value from storage.
   */
  remove(key: string): void;

  /**
   * Checks whether a key exists.
   */
  has(key: string): boolean;

  /**
   * Clears storage if supported.
   */
  clear?(): void;
}
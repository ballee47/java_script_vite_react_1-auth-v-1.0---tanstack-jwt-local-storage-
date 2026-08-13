export interface IStorageAdapter {
  /**
   * Checks whether the storage is available.
   */
  isAvailable(): boolean;

  /**
   * Stores a value.
   */
  set(
    key: string,
    value: string
  ): void;

  /**
   * Retrieves a value.
   */
  get(
    key: string
  ): string | null;

  /**
   * Removes a value.
   */
  remove(
    key: string
  ): void;

  /**
   * Clears all stored values.
   */
  clear(): void;

  /**
   * Checks whether a key exists.
   */
  has(
    key: string
  ): boolean;

  /**
   * Returns all stored keys.
   */
  keys(): string[];

  /**
   * Returns the total number of stored items.
   */
  size(): number;
}
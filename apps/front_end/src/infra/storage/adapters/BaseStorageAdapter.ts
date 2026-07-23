import { StorageAdapter } from "../types";

export abstract class BaseStorageAdapter
  implements StorageAdapter
{
  constructor(
    protected readonly storage: Storage
  ) {}

  /**
   * Stores a string value.
   */
  public set(
    key: string,
    value: string
  ): void {
    this.storage.setItem(key, value);
  }

  /**
   * Retrieves a string value.
   */
  public get(
    key: string
  ): string | null {
    return this.storage.getItem(key);
  }

  /**
   * Removes a value by its key.
   */
  public remove(
    key: string
  ): void {
    this.storage.removeItem(key);
  }

  /**
   * Removes all stored values.
   */
  public clear(): void {
    this.storage.clear();
  }

  /**
   * Checks whether a key exists.
   */
  public has(
    key: string
  ): boolean {
    return this.storage.getItem(key) !== null;
  }

  /**
   * Returns all stored keys.
   */
  public keys(): string[] {
    const keys: string[] = [];

    for (
      let index = 0;
      index < this.storage.length;
      index++
    ) {
      const key = this.storage.key(index);

      if (key !== null) {
        keys.push(key);
      }
    }

    return keys;
  }

  /**
   * Returns the total number of stored items.
   */
  public size(): number {
    return this.storage.length;
  }
}
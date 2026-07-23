import { BaseStorageAdapter } from "./BaseStorageAdapter";

export abstract class BrowserStorageAdapter extends BaseStorageAdapter {
  protected constructor(
    protected readonly storage: Storage,
    namespace: string = ""
  ) {
    super(namespace);
  }

  /**
   * Stores a string value.
   */
  public set(
    key: string,
    value: string
  ): void {
    this.storage.setItem(this.buildKey(key), value);
  }

  /**
   * Retrieves a string value.
   */
  public get(
    key: string
  ): string | null {
    return this.storage.getItem(this.buildKey(key));
  }

  /**
   * Removes a stored value.
   */
  public remove(
    key: string
  ): void {
    this.storage.removeItem(this.buildKey(key));
  }

  /**
   * Clears all stored values.
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
    return this.get(key) !== null;
  }

  /**
   * Returns all stored keys.
   */
  public keys(): string[] {
    const keys: string[] = [];

    for (let index = 0; index < this.storage.length; index++) {
      const key = this.storage.key(index);

      if (key !== null) {
        keys.push(key);
      }
    }

    return keys;
  }

  /**
   * Returns the number of stored items.
   */
  public size(): number {
    return this.storage.length;
  }
}
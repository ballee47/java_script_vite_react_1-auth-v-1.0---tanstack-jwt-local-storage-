import { BaseStorageAdapter } from "./BaseStorageAdapter";

export class MemoryStorageAdapter extends BaseStorageAdapter {
  private readonly storage = new Map<string, string>();

  constructor(
    namespace: string = ""
  ) {
    super(namespace);
  }

  /**
   * Checks whether the storage is available.
   */
  public isAvailable(): boolean {
    return true;
  }

  /**
   * Stores a value.
   */
  public set(
    key: string,
    value: string
  ): void {
    this.storage.set(this.buildKey(key), value);
  }

  /**
   * Retrieves a value.
   */
  public get(
    key: string
  ): string | null {
    return this.storage.get(this.buildKey(key)) ?? null;
  }

  /**
   * Removes a value.
   */
  public remove(
    key: string
  ): void {
    this.storage.delete(this.buildKey(key));
  }

  /**
   * Clears all values.
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
    return this.storage.has(this.buildKey(key));
  }

  /**
   * Returns all stored keys.
   */
  public keys(): string[] {
    return Array.from(this.storage.keys());
  }

  /**
   * Returns the number of stored values.
   */
  public size(): number {
    return this.storage.size;
  }
}
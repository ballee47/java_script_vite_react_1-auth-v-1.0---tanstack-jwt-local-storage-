import { IStorageAdapter } from "../interfaces/IStorageAdapter";

export abstract class BaseStorageAdapter
  implements IStorageAdapter
{
  protected constructor(
    protected readonly namespace: string = ""
  ) {}

  /**
   * Normalizes a storage key.
   */
  protected normalizeKey(
    key: string
  ): string {
    return key.trim();
  }

  /**
   * Builds the final storage key.
   */
  protected buildKey(
    key: string
  ): string {
    const normalizedKey = this.normalizeKey(key);

    return this.namespace
      ? `${this.namespace}:${normalizedKey}`
      : normalizedKey;
  }

  /**
   * Throws a storage-related error.
   */
  protected throwStorageError(
    message: string
  ): never {
    throw new Error(message);
  }

  /**
   * Checks whether the storage is available.
   */
  public abstract isAvailable(): boolean;

  /**
   * Storage operations.
   */
  public abstract set(
    key: string,
    value: string
  ): void;

  public abstract get(
    key: string
  ): string | null;

  public abstract remove(
    key: string
  ): void;

  public abstract clear(): void;

  public abstract has(
    key: string
  ): boolean;

  public abstract keys(): string[];

  public abstract size(): number;
}
import type { IStorageAdapter } from "../adapters/IStorageAdapter";
import type { Serializer } from "../serializers/Serializer";
import type { StorageOptions } from "../types";

import { StorageError } from "../errors/StorageError";

export class StorageService<
  TSchema extends Record<string, unknown>
> {
  constructor(
    private readonly adapter: IStorageAdapter,
    private readonly serializer: Serializer
  ) {}

  /**
   * Store a value.
   */
  public set<K extends keyof TSchema>(
    key: K,
    value: TSchema[K],
    options?: StorageOptions
  ): void {
    try {
      this.adapter.set(
        key as string,
        this.serializer.serialize(value),
        options
      );
    } catch (error) {
      throw new StorageError(
        `Failed to store value for key "${String(key)}".`,
        error
      );
    }
  }

  /**
   * Get a value.
   */
  public get<K extends keyof TSchema>(
    key: K
  ): TSchema[K] | null {
    try {
      const value = this.adapter.get(key as string);

      if (value === null) {
        return null;
      }

      return this.serializer.deserialize<TSchema[K]>(value);
    } catch (error) {
      throw new StorageError(
        `Failed to retrieve value for key "${String(key)}".`,
        error
      );
    }
  }

  /**
   * Remove a value.
   */
  public remove<K extends keyof TSchema>(
    key: K
  ): void {
    this.adapter.remove(key as string);
  }

  /**
   * Check if a key exists.
   */
  public has<K extends keyof TSchema>(
    key: K
  ): boolean {
    return this.adapter.has(key as string);
  }

  /**
   * Clear all storage if supported.
   */
  public clear(): void {
    this.adapter.clear?.();
  }

  /**
   * Store multiple values.
   */
  public setMany(
    entries: Partial<TSchema>,
    options?: StorageOptions
  ): void {
    for (const [key, value] of Object.entries(entries)) {
      if (value !== undefined) {
        this.set(
          key as keyof TSchema,
          value as TSchema[keyof TSchema],
          options
        );
      }
    }
  }

  /**
   * Retrieve multiple values.
   */
  public getMany<K extends keyof TSchema>(
    keys: readonly K[]
  ): Pick<Partial<TSchema>, K> {
    const result = {} as Pick<Partial<TSchema>, K>;

    for (const key of keys) {
      result[key] = this.get(key) ?? undefined;
    }

    return result;
  }

  /**
   * Remove multiple values.
   */
  public removeMany<K extends keyof TSchema>(
    keys: readonly K[]
  ): void {
    keys.forEach((key) => this.remove(key));
  }

  /**
   * Get a value or return a default.
   */
  public getOrDefault<K extends keyof TSchema>(
    key: K,
    defaultValue: TSchema[K]
  ): TSchema[K] {
    return this.get(key) ?? defaultValue;
  }

  /**
   * Update a value.
   */
  public update<K extends keyof TSchema>(
    key: K,
    updater: (
      current: TSchema[K] | null
    ) => TSchema[K],
    options?: StorageOptions
  ): void {
    this.set(
      key,
      updater(this.get(key)),
      options
    );
  }

  /**
   * Merge object values.
   */
  public merge<
    K extends keyof TSchema,
    TValue extends object = Extract<TSchema[K], object>
  >(
    key: K,
    partial: Partial<TValue>,
    options?: StorageOptions
  ): void {
    const current =
      (this.get(key) as TValue | null) ?? ({} as TValue);

    this.set(
      key,
      {
        ...current,
        ...partial,
      } as TSchema[K],
      options
    );
  }

  /**
   * Lazily create and cache a value.
   */
  public remember<K extends keyof TSchema>(
    key: K,
    factory: () => TSchema[K],
    options?: StorageOptions
  ): TSchema[K] {
    const existing = this.get(key);

    if (existing !== null) {
      return existing;
    }

    const value = factory();

    this.set(key, value, options);

    return value;
  }
}
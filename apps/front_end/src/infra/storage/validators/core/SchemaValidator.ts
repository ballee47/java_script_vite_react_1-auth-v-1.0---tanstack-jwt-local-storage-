import { StorageSchema } from "../types/StorageSchema";
import { KeyValidator } from "./KeyValidator";
import { ValueValidator } from "./ValueValidator";

export class SchemaValidator {
  constructor(
    private readonly keyValidator: KeyValidator,
    private readonly valueValidator: ValueValidator
  ) {}

  /**
   * Validates a complete storage schema.
   */
  public validate<T>(schema: StorageSchema<T>): void {
    this.keyValidator.validate(schema.key);
    this.valueValidator.validate(schema.value);
    this.validateCreatedAt(schema.createdAt);
    this.validateUpdatedAt(schema.updatedAt);
    this.validateExpiresAt(schema.expiresAt);
    this.validateVersion(schema.version);
    this.validateMetadata(schema.metadata);
  }

  /**
   * Validates the creation timestamp.
   */
  private validateCreatedAt(timestamp: number): void {
    if (!Number.isFinite(timestamp) || timestamp < 0) {
      throw new Error("Storage createdAt must be a valid timestamp.");
    }
  }

  /**
   * Validates the last update timestamp.
   */
  private validateUpdatedAt(timestamp: number): void {
    if (!Number.isFinite(timestamp) || timestamp < 0) {
      throw new Error("Storage updatedAt must be a valid timestamp.");
    }
  }

  /**
   * Validates the expiration timestamp.
   */
  private validateExpiresAt(timestamp: number | null): void {
    if (
      timestamp !== null &&
      (!Number.isFinite(timestamp) || timestamp < 0)
    ) {
      throw new Error(
        "Storage expiresAt must be null or a valid timestamp."
      );
    }
  }

  /**
   * Validates the schema version.
   */
  private validateVersion(version: number): void {
    if (!Number.isInteger(version) || version < 1) {
      throw new Error(
        "Storage version must be a positive integer."
      );
    }
  }

  /**
   * Validates metadata.
   */
  private validateMetadata(
    metadata?: Record<string, unknown>
  ): void {
    if (
      metadata !== undefined &&
      (typeof metadata !== "object" ||
        metadata === null ||
        Array.isArray(metadata))
    ) {
      throw new Error(
        "Storage metadata must be an object."
      );
    }
  }
}
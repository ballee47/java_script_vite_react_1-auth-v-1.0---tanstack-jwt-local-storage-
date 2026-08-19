// validators/StorageOptionsValidator.ts

import type { StorageSetOptions } from "../types";

export class StorageOptionsValidator {

    /**
     * Validates storage options.
     */
    public validate(options?: StorageSetOptions): void {
        if (options === undefined) {
            return;
        }

        this.validateEncrypt(options.encrypt);
        this.validateSerialize(options.serialize);
        this.validateValidate(options.validate);
        this.validateTtl(options.ttl);
        this.validateVersion(options.version);
        this.validateOverwrite(options.overwrite);
    }

    /**
     * Validates the encrypt option.
     */
    private validateEncrypt(value: unknown): void {
        if (value === undefined) {
            return;
        }

        if (typeof value !== "boolean") {
            throw new TypeError(
                "Storage option 'encrypt' must be a boolean.",
            );
        }
    }

    /**
     * Validates the serialize option.
     */
    private validateSerialize(value: unknown): void {
        if (value === undefined) {
            return;
        }

        if (typeof value !== "boolean") {
            throw new TypeError(
                "Storage option 'serialize' must be a boolean.",
            );
        }
    }

    /**
     * Validates the validate option.
     */
    private validateValidate(value: unknown): void {
        if (value === undefined) {
            return;
        }

        if (typeof value !== "boolean") {
            throw new TypeError(
                "Storage option 'validate' must be a boolean.",
            );
        }
    }

    /**
     * Validates the TTL option.
     */
    private validateTtl(value: unknown): void {
        if (value === undefined) {
            return;
        }

        if (
            typeof value !== "number" ||
            !Number.isFinite(value) ||
            value < 0
        ) {
            throw new TypeError(
                "Storage option 'ttl' must be a finite number greater than or equal to 0.",
            );
        }
    }

    /**
     * Validates the schema version.
     */
    private validateVersion(value: unknown): void {
        if (value === undefined) {
            return;
        }

        if (
            typeof value !== "number" ||
            !Number.isInteger(value) ||
            value < 1
        ) {
            throw new TypeError(
                "Storage option 'version' must be a positive integer.",
            );
        }
    }

    /**
     * Validates the overwrite option.
     */
    private validateOverwrite(value: unknown): void {
        if (value === undefined) {
            return;
        }

        if (typeof value !== "boolean") {
            throw new TypeError(
                "Storage option 'overwrite' must be a boolean.",
            );
        }
    }
}
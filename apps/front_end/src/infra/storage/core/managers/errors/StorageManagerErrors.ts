// errors/StorageManagerErrors.ts

export class StorageManagerError extends Error {
    public readonly code: string;

    constructor(
        message: string,
        code: string,
    ) {
        super(message);

        this.name = "StorageManagerError";
        this.code = code;

        Object.setPrototypeOf(
            this,
            new.target.prototype,
        );
    }
}

export class StorageAlreadyRegisteredError
    extends StorageManagerError {

    constructor(name: string) {
        super(
            `Storage '${name}' is already registered.`,
            "STORAGE_ALREADY_REGISTERED",
        );

        this.name = "StorageAlreadyRegisteredError";
    }
}

export class StorageNotFoundError
    extends StorageManagerError {

    constructor(name: string) {
        super(
            `Storage '${name}' is not registered.`,
            "STORAGE_NOT_FOUND",
        );

        this.name = "StorageNotFoundError";
    }
}
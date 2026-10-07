import type { IStorageLogger } from "../interfaces/IStorageLogger";
import type {
  StorageLogEntry,
  StorageLogLevel,
} from "../types/StorageLogEntry";

export class ConsoleStorageLogger implements IStorageLogger {
  private createEntry(
    level: StorageLogLevel,
    message: string,
    metadata?: Record<string, unknown>,
    error?: unknown
  ): StorageLogEntry {
    return {
      level,
      message,
      timestamp: Date.now(),
      metadata,
      error,
    };
  }

  debug(
    message: string,
    metadata?: Record<string, unknown>
  ): void {
    const entry = this.createEntry("debug", message, metadata);

    console.debug(entry);
  }

  info(
    message: string,
    metadata?: Record<string, unknown>
  ): void {
    const entry = this.createEntry("info", message, metadata);

    console.info(entry);
  }

  warn(
    message: string,
    metadata?: Record<string, unknown>
  ): void {
    const entry = this.createEntry("warn", message, metadata);

    console.warn(entry);
  }

  error(
    error: unknown,
    metadata?: Record<string, unknown>
  ): void {
    const message =
      error instanceof Error ? error.message : String(error);

    const entry = this.createEntry(
      "error",
      message,
      metadata,
      error
    );

    console.error(entry);
  }
}
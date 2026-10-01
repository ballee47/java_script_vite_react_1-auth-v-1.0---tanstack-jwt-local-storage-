import type { IStorageLogger } from "../interfaces/IStorageLogger";

export class ConsoleStorageLogger implements IStorageLogger {
  debug(
    message: string,
    metadata?: Record<string, unknown>
  ): void {
    console.debug(message, metadata);
  }

  info(
    message: string,
    metadata?: Record<string, unknown>
  ): void {
    console.info(message, metadata);
  }

  warn(
    message: string,
    metadata?: Record<string, unknown>
  ): void {
    console.warn(message, metadata);
  }

  error(
    error: unknown,
    metadata?: Record<string, unknown>
  ): void {
    console.error(error, metadata);
  }
}
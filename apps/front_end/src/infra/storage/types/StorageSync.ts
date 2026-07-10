import { StorageEvent } from "./StorageEvents";

/**
 * Defines synchronization behavior between
 * different storage instances (tabs, windows, etc.).
 */
export interface StorageSync {
  /**
   * Broadcasts a storage event.
   *
   * @param event - Event to broadcast.
   */
  broadcast<T>(event: StorageEvent<T>): void;

  /**
   * Starts listening for storage events.
   *
   * @param listener - Event callback.
   */
  subscribe(
    listener: (event: StorageEvent) => void
  ): void;

  /**
   * Stops listening for storage events.
   *
   * @param listener - Event callback.
   */
  unsubscribe(
    listener: (event: StorageEvent) => void
  ): void;
}
/**
 * Supported storage event types.
 */
export enum StorageEventType {
  SET = "storage:set",
  GET = "storage:get",
  REMOVE = "storage:remove",
  CLEAR = "storage:clear",
  UPDATE = "storage:update",
}

/**
 * Represents a storage event.
 */
export interface StorageEvent<T = unknown> {
  /**
   * Type of the event.
   */
  type: StorageEventType;

  /**
   * Storage key.
   */
  key: string;

  /**
   * Event value.
   */
  value?: T;

  /**
   * Previous value (optional).
   * Useful for UPDATE operations.
   */
  oldValue?: T;

  /**
   * Event timestamp.
   */
  timestamp: number;
}
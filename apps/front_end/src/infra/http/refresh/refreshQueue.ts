import type { RefreshQueueItem } from "../types/queue/refreshQueueItem";

const queue: RefreshQueueItem[] = [];

/**
 * Adds a request to the refresh queue.
 */
export function enqueue(item: RefreshQueueItem): void {
  queue.push(item);
}

/**
 * Retries every queued request.
 */
export function resolveAll(): void {
  while (queue.length > 0) {
    const item = queue.shift();

    item?.resolve();
  }
}

/**
 * Rejects every queued request.
 */
export function rejectAll(error: unknown): void {
  while (queue.length > 0) {
    const item = queue.shift();

    item?.reject(error);
  }
}

/**
 * Removes every queued request.
 */
export function clear(): void {
  queue.length = 0;
}

/**
 * Number of waiting requests.
 */
export function size(): number {
  return queue.length;
}

/**
 * Returns true if the queue is empty.
 */
export function isEmpty(): boolean {
  return queue.length === 0;
}
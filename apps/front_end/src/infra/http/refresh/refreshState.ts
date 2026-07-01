/**
 * Holds the currently running refresh operation.
 *
 * When null:
 *   → No refresh is running.
 *
 * When Promise:
 *   → A refresh is already in progress.
 */
let refreshPromise: Promise<void> | null = null;

/**
 * Returns true if a refresh operation is currently running.
 */
export function isRefreshing(): boolean {
  return refreshPromise !== null;
}

/**
 * Returns the active refresh promise.
 */
export function getRefreshPromise(): Promise<void> | null {
  return refreshPromise;
}

/**
 * Stores the active refresh promise.
 */
export function setRefreshPromise(
  promise: Promise<void>
): void {
  refreshPromise = promise;
}

/**
 * Clears the refresh state.
 */
export function clearRefreshPromise(): void {
  refreshPromise = null;
}
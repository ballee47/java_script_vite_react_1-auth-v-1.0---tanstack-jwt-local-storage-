export interface RefreshQueueItem {
  resolve: () => void;
  reject: (reason?: unknown) => void;

  /**
   * Optional metadata for debugging and observability.
   */
  requestId?: string;
  createdAt?: number;
}
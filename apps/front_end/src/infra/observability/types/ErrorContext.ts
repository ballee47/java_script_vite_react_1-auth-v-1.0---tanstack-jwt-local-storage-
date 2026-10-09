
export interface ErrorContext {
  /**
   * Name of the module where the error occurred.
   * Example: "storage", "http", "authentication"
   */
  module?: string;

  /**
   * Name of the operation that failed.
   * Example: "getItem", "sendRequest"
   */
  operation?: string;

  /**
   * Unique identifier for the current request or operation.
   */
  correlationId?: string;

  /**
   * Additional diagnostic information.
   * Do not include passwords, tokens, or other sensitive data.
   */
  metadata?: Record<string, unknown>;
}


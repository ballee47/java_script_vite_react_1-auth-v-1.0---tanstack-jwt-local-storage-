
export interface ErrorContext {
  /**
   * Name of the module where the error occurred.
   * Examples: "storage", "http", "authentication"
   */
  readonly module?: string;

  /**
   * Name of the operation that failed.
   * Examples: "getItem", "sendRequest"
   */
  readonly operation?: string;

  /**
   * Name of the service where the error occurred.
   * Examples: "user-service", "payment-service"
   */
  readonly service?: string;

  /**
   * Identifier used to correlate related requests or operations.
   */
  readonly correlationId?: string;

  /**
   * Distributed tracing identifiers.
   * Prefer obtaining these from the active tracing context when possible.
   */
  readonly traceId?: string;
  readonly spanId?: string;

  /**
   * Additional diagnostic information relevant to the error.
   * Never include passwords, access tokens, secrets, or sensitive personal data.
   */
  readonly metadata?: Readonly<Record<string, unknown>>;
}

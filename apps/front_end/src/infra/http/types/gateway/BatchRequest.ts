// src/infra/http/types/gateway/BatchRequest.ts

/**
 * A collection of requests executed together.
 */
export type BatchRequest<T> = Promise<T>[];
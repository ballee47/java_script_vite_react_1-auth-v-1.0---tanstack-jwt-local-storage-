// src/infra/http/types/gateway/RequestParams.ts

/**
 * Query parameters appended to the URL.
 *
 * Example:
 * /products?page=1&search=laptop
 */
export type RequestParams = Record<
  string,
  unknown
>;
// src/infra/http/types/gateway/RequestOptions.ts

import { RequestParams } from "./RequestParams";




    
/**
 * Common options shared by all HTTP methods.
 */
export interface RequestOptions {
  /**
   * URL query parameters.
   */
  params?: RequestParams;

  /**
   * Custom request headers.
   */
  headers?: Record<string, string>;

  /**
   * Request timeout in milliseconds.
   */
  timeout?: number;

  /**
   * Abort an ongoing request.
   */
  signal?: AbortSignal;

  /**
   * Skip authentication for this request.
   */
  skipAuth?: boolean;
}
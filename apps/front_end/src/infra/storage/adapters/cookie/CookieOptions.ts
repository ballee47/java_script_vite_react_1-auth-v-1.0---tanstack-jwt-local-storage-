/**
 * Configuration options for browser cookies.
 */
export interface CookieOptions {
  /**
   * Cookie path.
   *
   * Default: "/"
   */
  path?: string;

  /**
   * Cookie domain.
   */
  domain?: string;

  /**
   * Absolute expiration date.
   */
  expires?: Date;

  /**
   * Lifetime in seconds.
   */
  maxAge?: number;

  /**
   * Send cookie only over HTTPS.
   */
  secure?: boolean;

  /**
   * Controls cross-site cookie behaviour.
   */
  sameSite?: "Strict" | "Lax" | "None";

  /**
   * Server-only flag.
   *
   * Browsers ignore this when writing cookies
   * through JavaScript, but it is included for
   * compatibility with server environments.
   */
  httpOnly?: boolean;
}
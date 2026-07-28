/**
 * Cookie related constants.
 */
export const CookieConstants = {
  /**
   * Cookie parsing.
   */
  COOKIE_SEPARATOR: ";",
  ATTRIBUTE_SEPARATOR: "; ",
  KEY_VALUE_SEPARATOR: "=",

  /**
   * Default values.
   */
  DEFAULT_PATH: "/",
  DEFAULT_SAME_SITE: "Lax" as const,

  /**
   * Cookie attributes.
   */
  PATH: "Path",
  DOMAIN: "Domain",
  EXPIRES: "Expires",
  MAX_AGE: "Max-Age",
  SECURE: "Secure",
  SAME_SITE: "SameSite",
  HTTP_ONLY: "HttpOnly",

  /**
   * Expired cookie date.
   */
  EXPIRED_DATE: "Thu, 01 Jan 1970 00:00:00 GMT"
} as const;
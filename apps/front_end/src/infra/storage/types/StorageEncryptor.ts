/**
 * Defines how values are encrypted and decrypted.
 *
 * Implementations may use AES, Web Crypto API,
 * CryptoJS, or any other encryption algorithm.
 */
export interface StorageEncryptor {
  /**
   * Encrypts a plain string.
   *
   * @param value - Plain text.
   * @returns Encrypted text.
   */
  encrypt(value: string): string;

  /**
   * Decrypts encrypted text.
   *
   * @param value - Encrypted text.
   * @returns Plain text.
   */
  decrypt(value: string): string;
}
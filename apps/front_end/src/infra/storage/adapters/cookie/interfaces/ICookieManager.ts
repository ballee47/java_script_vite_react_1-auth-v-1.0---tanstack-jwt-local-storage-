import { CookieOptions } from "../CookieOptions";

export interface ICookieManager {

    /**
     * Writes a cookie.
     */
    write(
        key: string,
        value: string,
        options?: CookieOptions
    ): void;

    /**
     * Reads a cookie.
     */
    read(
        key: string
    ): string | null;

    /**
     * Removes a cookie.
     */
    remove(
        key: string,
        options?: CookieOptions
    ): void;

    /**
     * Checks whether a cookie exists.
     */
    exists(
        key: string
    ): boolean;

    /**
     * Returns all cookie keys.
     */
    keys(): string[];

    /**
     * Removes all cookies.
     */
    clear(): void;

    /**
     * Returns the total number of cookies.
     */
    count(): number;
}
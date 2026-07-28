import { CookieOptions } from "../CookieOptions";

export interface ICookieSerializer {

    /**
     * Converts a key, value and options
     * into a valid cookie string.
     */
    serialize(
        key: string,
        value: string,
        options?: CookieOptions
    ): string;

}
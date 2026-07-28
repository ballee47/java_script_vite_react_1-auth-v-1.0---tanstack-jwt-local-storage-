import { CookieConstants } from "./CookieConstants";
import { ICookieParser } from "./interfaces/ICookieParser";

export class CookieParser
    implements ICookieParser {

    /**
     * Parses browser cookies into a map.
     */
    public parse(): Map<string, string> {

        const cookies = new Map<string, string>();

        if (
            typeof document === "undefined" ||
            !document.cookie
        ) {
            return cookies;
        }

        const entries = document.cookie.split(
            CookieConstants.COOKIE_SEPARATOR
        );

        for (const entry of entries) {

            const separatorIndex = entry.indexOf(
                CookieConstants.KEY_VALUE_SEPARATOR
            );

            if (separatorIndex === -1) {
                continue;
            }

            const key = entry
                .substring(0, separatorIndex)
                .trim();

            const value = decodeURIComponent(
                entry.substring(separatorIndex + 1)
            );

            cookies.set(key, value);
        }

        return cookies;
    }

}
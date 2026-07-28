import { CookieConstants } from "./CookieConstants";
import { CookieOptions } from "./CookieOptions";
import { ICookieManager } from "./interfaces/ICookieManager";
import { ICookieParser } from "./interfaces/ICookieParser";
import { ICookieSerializer } from "./interfaces/ICookieSerializer";

export class CookieManager
    implements ICookieManager
{
    constructor(
        private readonly serializer: ICookieSerializer,
        private readonly parser: ICookieParser,
        private readonly defaultOptions: CookieOptions = {}
    ) {}

    /**
     * Writes a cookie.
     */
    public write(
        key: string,
        value: string,
        options: CookieOptions = {}
    ): void {

        if (typeof document === "undefined") {
            return;
        }

        document.cookie = this.serializer.serialize(
            key,
            value,
            {
                ...this.defaultOptions,
                ...options
            }
        );
    }

    /**
     * Reads a cookie.
     */
    public read(
        key: string
    ): string | null {

        return (
            this.parser
                .parse()
                .get(key) ?? null
        );
    }

    /**
     * Removes a cookie.
     */
    public remove(
        key: string,
        options: CookieOptions = {}
    ): void {

        this.write(
            key,
            "",
            {
                ...options,
                expires: new Date(
                    CookieConstants.EXPIRED_DATE
                )
            }
        );
    }

    /**
     * Checks whether a cookie exists.
     */
    public exists(
        key: string
    ): boolean {

        return this.read(key) !== null;
    }

    /**
     * Returns all cookie keys.
     */
    public keys(): string[] {

        return Array.from(
            this.parser
                .parse()
                .keys()
        );
    }

    /**
     * Removes all cookies.
     */
    public clear(): void {

        for (const key of this.keys()) {
            this.remove(key);
        }
    }

    /**
     * Returns the total number of cookies.
     */
    public count(): number {

        return this.parser
            .parse()
            .size;
    }
}
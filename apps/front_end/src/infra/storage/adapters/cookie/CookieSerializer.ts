import { CookieOptions } from "./CookieOptions";
import { CookieConstants } from "./CookieConstants";
import { ICookieSerializer } from "./interfaces/ICookieSerializer";

export class CookieSerializer
    implements ICookieSerializer {

    /**
     * Builds a cookie string.
     */
    public serialize(
        key: string,
        value: string,
        options: CookieOptions = {}
    ): string {

        const attributes: string[] = [
            `${key}${CookieConstants.KEY_VALUE_SEPARATOR}${encodeURIComponent(value)}`
        ];

        this.appendPath(attributes, options);
        this.appendDomain(attributes, options);
        this.appendExpires(attributes, options);
        this.appendMaxAge(attributes, options);
        this.appendSecure(attributes, options);
        this.appendSameSite(attributes, options);
        this.appendHttpOnly(attributes, options);

        return attributes.join(
            CookieConstants.ATTRIBUTE_SEPARATOR
        );
    }

    private appendPath(
        attributes: string[],
        options: CookieOptions
    ): void {

        attributes.push(
            `${CookieConstants.PATH}=${
                options.path ??
                CookieConstants.DEFAULT_PATH
            }`
        );
    }

    private appendDomain(
        attributes: string[],
        options: CookieOptions
    ): void {

        if (options.domain) {
            attributes.push(
                `${CookieConstants.DOMAIN}=${options.domain}`
            );
        }
    }

    private appendExpires(
        attributes: string[],
        options: CookieOptions
    ): void {

        if (options.expires) {
            attributes.push(
                `${CookieConstants.EXPIRES}=${options.expires.toUTCString()}`
            );
        }
    }

    private appendMaxAge(
        attributes: string[],
        options: CookieOptions
    ): void {

        if (options.maxAge !== undefined) {
            attributes.push(
                `${CookieConstants.MAX_AGE}=${options.maxAge}`
            );
        }
    }

    private appendSecure(
        attributes: string[],
        options: CookieOptions
    ): void {

        if (options.secure) {
            attributes.push(
                CookieConstants.SECURE
            );
        }
    }

    private appendSameSite(
        attributes: string[],
        options: CookieOptions
    ): void {

        attributes.push(
            `${CookieConstants.SAME_SITE}=${
                options.sameSite ??
                CookieConstants.DEFAULT_SAME_SITE
            }`
        );
    }

    private appendHttpOnly(
        attributes: string[],
        options: CookieOptions
    ): void {

        if (options.httpOnly) {
            attributes.push(
                CookieConstants.HTTP_ONLY
            );
        }
    }
}
import { BaseStorageAdapter } from "./BaseStorageAdapter";
import { CookieManager } from "./cookie/CookieManager";
import { CookieParser } from "./cookie/CookieParser";
import { CookieSerializer } from "./cookie/CookieSerializer";
import { CookieOptions } from "./cookie/CookieOptions";
import { ICookieManager } from "./cookie/interfaces/ICookieManager";

export class CookieStorageAdapter
    extends BaseStorageAdapter
{
    private readonly manager: ICookieManager;

    constructor(
        namespace: string = "",
        options: CookieOptions = {}
    ) {
        super(namespace);

        this.manager = new CookieManager(
            new CookieSerializer(),
            new CookieParser(),
            options
        );
    }

    /**
     * Checks whether cookies are available.
     */
    public override isAvailable(): boolean {

        if (typeof document === "undefined") {
            return false;
        }

        try {

            const testKey = this.buildKey(
                "__cookie_test__"
            );

            this.manager.write(
                testKey,
                "1"
            );

            const available =
                this.manager.exists(
                    testKey
                );

            this.manager.remove(
                testKey
            );

            return available;

        } catch {

            return false;

        }
    }

    /**
     * Stores a value.
     */
    public override set(
        key: string,
        value: string
    ): void {

        this.manager.write(
            this.buildKey(key),
            value
        );

    }

    /**
     * Retrieves a value.
     */
    public override get(
        key: string
    ): string | null {

        return this.manager.read(
            this.buildKey(key)
        );

    }

    /**
     * Removes a value.
     */
    public override remove(
        key: string
    ): void {

        this.manager.remove(
            this.buildKey(key)
        );

    }

    /**
     * Removes all values belonging to this namespace.
     */
    public override clear(): void {

        for (const key of this.keys()) {

            this.remove(key);

        }

    }

    /**
     * Checks whether a key exists.
     */
    public override has(
        key: string
    ): boolean {

        return this.manager.exists(
            this.buildKey(key)
        );

    }

    /**
     * Returns every key in the namespace.
     */
    public override keys(): string[] {

        const prefix = this.namespace
            ? `${this.namespace}:`
            : "";

        return this.manager
            .keys()
            .filter(
                key => !prefix ||
                key.startsWith(prefix)
            )
            .map(
                key => prefix
                    ? key.substring(
                        prefix.length
                    )
                    : key
            );

    }

    /**
     * Returns the number of stored values.
     */
    public override size(): number {

        return this.keys().length;

    }

}
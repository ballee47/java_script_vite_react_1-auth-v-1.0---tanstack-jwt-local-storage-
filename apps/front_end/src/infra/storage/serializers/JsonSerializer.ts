// serializers/JsonSerializer.ts

import type { ISerializer } from "./interfaces/ISerializer";

export class JsonSerializer implements ISerializer {

    public serialize(value: unknown): string {
        return JSON.stringify(value);
    }

    public deserialize<T = unknown>(value: string): T {
        return JSON.parse(value) as T;
    }

}
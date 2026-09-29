import type { ISerializer } from "../../serializers/interfaces/ISerializer";

export class JsonSerializer implements ISerializer {
  serialize<T>(value: T): string {
    return JSON.stringify(value);
  }

  deserialize<T>(value: string): T {
    return JSON.parse(value) as T;
  }
}

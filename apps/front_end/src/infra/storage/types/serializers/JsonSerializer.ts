import { StorageSerializer } from "../StorageSerializer";

export class JsonSerializer implements StorageSerializer {
  serialize<T>(value: T): string {
    return JSON.stringify(value);
  }

  deserialize<T>(value: string): T {
    return JSON.parse(value) as T;
  }
}
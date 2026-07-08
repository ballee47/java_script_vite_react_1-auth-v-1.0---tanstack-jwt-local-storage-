import type { Serializer } from "./Serializer";

import { ParseError } from "../errors/ParseError";
import { SerializationError } from "../errors/SerializationError";

export class JsonSerializer implements Serializer {
  public serialize<T>(value: T): string {
    try {
      return JSON.stringify(value);
    } catch (error) {
      throw new SerializationError(error);
    }
  }

  public deserialize<T>(value: string): T {
    try {
      return JSON.parse(value) as T;
    } catch (error) {
      throw new ParseError(error);
    }
  }
}
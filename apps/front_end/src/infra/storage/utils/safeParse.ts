import { ParseError } from "../errors/ParseError";

export function safeParse<T>(value: string): T {
  try {
    return JSON.parse(value) as T;
  } catch {
    throw new ParseError();
  }
}
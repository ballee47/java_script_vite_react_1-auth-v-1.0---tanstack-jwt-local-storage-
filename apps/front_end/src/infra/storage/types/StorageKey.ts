import { StorageKeys } from "../constants";

type Values<T> = T[keyof T];

type NestedValues<T> =
  T extends object
    ? Values<{
        [K in keyof T]: NestedValues<T[K]>;
      }>
    : T;

export type StorageKey = NestedValues<typeof StorageKeys>;
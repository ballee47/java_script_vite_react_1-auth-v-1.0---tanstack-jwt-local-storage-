export interface IKeyValueStore<TValue = string> {
    set(key: string, value: TValue): void;
    get(key: string): TValue | undefined;
    has(key: string): boolean;
    remove(key: string): boolean;
    clear(): void;
    keys(): IterableIterator<string>;
    values(): IterableIterator<TValue>;
    entries(): IterableIterator<[string, TValue]>;

    readonly size: number;
}
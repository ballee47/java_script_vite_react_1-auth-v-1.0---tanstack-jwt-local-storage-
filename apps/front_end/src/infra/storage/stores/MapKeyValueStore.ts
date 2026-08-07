import { IKeyValueStore } from "./interfaces/IKeyValueStore";

export class MapKeyValueStore<TValue = string>
    implements IKeyValueStore<TValue>
{
    private readonly store = new Map<string, TValue>();

    public set(
        key: string,
        value: TValue
    ): void {
        this.store.set(key, value);
    }

    public get(
        key: string
    ): TValue | undefined {
        return this.store.get(key);
    }

    public has(
        key: string
    ): boolean {
        return this.store.has(key);
    }

    public remove(
        key: string
    ): boolean {
        return this.store.delete(key);
    }

    public clear(): void {
        this.store.clear();
    }

    public keys(): IterableIterator<string> {
        return this.store.keys();
    }

    public values(): IterableIterator<TValue> {
        return this.store.values();
    }

    public entries(): IterableIterator<[string, TValue]> {
        return this.store.entries();
    }

    public get size(): number {
        return this.store.size;
    }
}
import  { StorageFacade } from "../../facade/StorageFacade";

export interface IStorageManager {

    register(
        name: string,
        storage: StorageFacade,
    ): void;

    get(
        name: string,
    ): StorageFacade;

    has(
        name: string,
    ): boolean;

    remove(
        name: string,
    ): boolean;

    clear(): void;

    names(): readonly string[];
}
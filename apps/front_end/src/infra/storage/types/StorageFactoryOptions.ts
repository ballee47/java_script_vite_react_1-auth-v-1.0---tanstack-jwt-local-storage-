import { StorageType } from "./enums/StorageType";

export interface StorageFactoryOptions {
    type: StorageType;
    namespace?: string;
}
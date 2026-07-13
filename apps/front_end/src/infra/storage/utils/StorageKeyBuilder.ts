export class StorageKeyBuilder {
  static build(
    namespace: string,
    key: string
  ): string {
    return `${namespace}:${key}`;
  }
}
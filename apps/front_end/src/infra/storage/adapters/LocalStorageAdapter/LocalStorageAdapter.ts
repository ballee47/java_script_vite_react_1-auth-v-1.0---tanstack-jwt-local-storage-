import { BrowserStorageAdapter } from "../BrowserStorageAdapter";

export class LocalStorageAdapter extends BrowserStorageAdapter {
  constructor(namespace?: string) {
    super(localStorage, namespace);
  }

  /**
   * Checks whether localStorage is available in the current environment.
   */
  public override isAvailable(): boolean {
    try {
      const testKey = "__storage_test__";

      localStorage.setItem(testKey, testKey);
      localStorage.removeItem(testKey);

      return true;
    } catch {
      return false;
    }
  }
}
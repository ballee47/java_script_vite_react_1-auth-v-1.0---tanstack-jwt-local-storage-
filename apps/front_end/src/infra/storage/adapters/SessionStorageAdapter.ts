import { BrowserStorageAdapter } from "./BrowserStorageAdapter";

export class SessionStorageAdapter extends BrowserStorageAdapter {
  constructor(namespace = "") {
    super(sessionStorage, namespace);
  }

  public isAvailable(): boolean {
    return (
      typeof window !== "undefined" &&
      "sessionStorage" in window
    );
  }
}
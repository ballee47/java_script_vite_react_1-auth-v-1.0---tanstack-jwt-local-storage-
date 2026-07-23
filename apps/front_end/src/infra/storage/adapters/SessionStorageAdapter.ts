import { BaseStorageAdapter } from "./BaseStorageAdapter";

export class SessionStorageAdapter extends BaseStorageAdapter {
  constructor() {
    super(sessionStorage);
  }
}
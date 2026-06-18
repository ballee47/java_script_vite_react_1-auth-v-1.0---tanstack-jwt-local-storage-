export const API_VERSION = "v1";

export const withVersion = (url: string) =>
  `/api/${API_VERSION}${url}`;
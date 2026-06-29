export interface RequestHeaders {
  Authorization?: string;

  Accept?: string;

  "Content-Type"?: string;

  [key: string]: string | undefined;
}
export interface StorageSchema {
  access_token: string;

  user: unknown;

  theme: "light" | "dark";

  language: string;

  sidebar_state: boolean;

  cart: unknown[];

  products: unknown[];

  categories: unknown[];
}
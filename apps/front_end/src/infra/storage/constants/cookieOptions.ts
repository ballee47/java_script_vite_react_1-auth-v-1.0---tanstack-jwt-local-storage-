const COOKIE_OPTIONS = {
  path: "/",
  sameSite: "Lax" as const,
  secure: import.meta.env.PROD,
};

export const ACCESS_TOKEN_OPTIONS = {
  ...COOKIE_OPTIONS,
  expires: 7,
};

export const REFRESH_TOKEN_OPTIONS = {
  ...COOKIE_OPTIONS,
  expires: 30,
};

export const USERNAME_OPTIONS = {
  ...COOKIE_OPTIONS,
  expires: 30,
};
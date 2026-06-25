// // src/infra/storage/localStorage.ts

// // ─────────────────────────────────────────
// // KEYS — defined once, used everywhere
// // ─────────────────────────────────────────
// const KEYS = {
//   ACCESS_TOKEN: "access",
//   REFRESH_TOKEN: "refresh",
//   USERNAME: "username",
// } as const ;

// // ─────────────────────────────────────────
// // TOKEN STORAGE
// // ─────────────────────────────────────────
// export const tokenStorage = {

//   // GET
//   getAccessToken: (): string | null =>
//     sessionStorage.getItem(KEYS.ACCESS_TOKEN),

//   getRefreshToken: (): string | null =>
//     sessionStorage.getItem(KEYS.REFRESH_TOKEN),

//   // SET
//   setAccessToken: (token: string): void =>
//     sessionStorage.setItem(KEYS.ACCESS_TOKEN, token),

//   setTokens: (access: string, refresh: string): void => {
//     sessionStorage.setItem(KEYS.ACCESS_TOKEN, access);
//     sessionStorage.setItem(KEYS.REFRESH_TOKEN, refresh);
//   },

//   // REMOVE
//   clearTokens: (): void => {
//     sessionStorage.removeItem(KEYS.ACCESS_TOKEN);
//     sessionStorage.removeItem(KEYS.REFRESH_TOKEN);
//   },

//   // CHECK
//   hasAccessToken: (): boolean =>
//     !!sessionStorage.getItem(KEYS.ACCESS_TOKEN),
// };

// // ─────────────────────────────────────────
// // USER STORAGE
// // ─────────────────────────────────────────
// export const userStorage = {

//   getUsername: (): string | null =>
//     sessionStorage.getItem(KEYS.USERNAME),

//   setUsername: (username: string): void =>
//     sessionStorage.setItem(KEYS.USERNAME, username),

//   clearUsername: (): void =>
//     sessionStorage.removeItem(KEYS.USERNAME),
// };

// // ─────────────────────────────────────────
// // CLEAR EVERYTHING (on logout)
// // ─────────────────────────────────────────
// export const clearAllStorage = (): void => {
//   tokenStorage.clearTokens();
//   userStorage.clearUsername();
// };
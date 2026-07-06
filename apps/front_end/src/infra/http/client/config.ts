import { API_PREFIX } from "../config/apiConfig";


export const httpConfig = {
  baseURL: API_PREFIX,

  timeout: 15000,

  withCredentials: true, // IMPORTANT for httpOnly cookies (refresh token)

  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
}; 
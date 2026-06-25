import axios from "axios";
import { httpConfig } from "./config";

/**
 * Axios Instance (Enterprise-grade setup)
 * - Cookie-based auth
 * - CSRF protection
 * - Scalable for JWT/session hybrid systems
 */
export const axiosInstance = axios.create({
  baseURL: httpConfig.baseURL,
  timeout: httpConfig.timeout,
  withCredentials: true, // 🔥 REQUIRED for Django cookies (session + CSRF)
});


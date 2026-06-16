import axios from "axios";
import { env } from "@/config/env";

export const httpClient = axios.create({
  baseURL: env.API_BASE_URL,
  withCredentials: true,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

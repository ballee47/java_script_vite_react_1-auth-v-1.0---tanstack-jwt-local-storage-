import axios from "axios";
import { httpConfig } from "./config";

export const axiosInstance = axios.create({
  baseURL: httpConfig.baseURL,
  timeout: httpConfig.timeout,
  withCredentials: httpConfig.withCredentials,
  headers: httpConfig.headers,
});
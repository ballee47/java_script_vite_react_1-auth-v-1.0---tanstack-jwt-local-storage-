import axios from "axios";
import { httpConfig } from "./config";
import Cookies from "js-cookie";

export const axiosInstance = axios.create({
  baseURL: httpConfig.baseURL,
  timeout: httpConfig.timeout,
  withCredentials: true,
});
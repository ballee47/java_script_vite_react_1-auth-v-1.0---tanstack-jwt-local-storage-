import { InternalAxiosRequestConfig } from "axios";

export interface InternalRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}
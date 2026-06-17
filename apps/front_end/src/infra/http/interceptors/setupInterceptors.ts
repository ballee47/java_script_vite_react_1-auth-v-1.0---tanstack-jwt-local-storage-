import { axiosInstance } from "../client/axiosInstance";
import { requestInterceptor } from "./requestInterceptor";
import { responseInterceptor } from "./responseInterceptor";

let initialized = false;

export function setupInterceptors() {
  if (initialized) return;
  initialized = true;

  axiosInstance.interceptors.request.use(requestInterceptor);
  axiosInstance.interceptors.response.use(
    (res) => res,
    responseInterceptor
  );
}
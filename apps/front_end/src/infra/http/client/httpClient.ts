import { axiosInstance } from "./axiosInstance";
import { AxiosRequestConfig, AxiosResponse } from "axios";

class HttpClient {
  async request<T>(config: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> =
      await axiosInstance.request<T>(config);

    return response.data;
  }
}

export const httpClient = new HttpClient();
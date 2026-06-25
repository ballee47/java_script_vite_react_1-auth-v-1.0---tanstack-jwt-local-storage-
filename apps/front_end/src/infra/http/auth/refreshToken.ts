import axios from "axios";
import { httpConfig } from "../client/config";

export async function refreshToken(): Promise<void> {
  await axios.post(
    `${httpConfig.baseURL}/api/v1/api/token/refresh/`,
    {},
    {
      withCredentials: true,
    }
  );
}
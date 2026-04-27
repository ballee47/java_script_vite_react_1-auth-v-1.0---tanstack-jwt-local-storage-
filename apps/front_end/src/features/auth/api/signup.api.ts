import { httpClient } from "@/infra/http/httpClient";

export const signupApi = (data: {
  username: string;
  email: string;
  password: string;
}) => {
  return httpClient.post("register/", data);
};
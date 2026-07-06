import { authGateway } from "./authGateway";

/* LOGIN */

export type LoginPayload = {
  username: string;
  password: string;
};

export type LoginResponse = {
  message: string;
};

export const loginApi = (
  payload: LoginPayload
): Promise<LoginResponse> => {
  return authGateway.login<LoginResponse, LoginPayload>(
    payload
  );
};

/* ME */

export type MeResponse = {
  id: number;
  username: string;
  email: string;
};

export const fetchMeApi = (): Promise<MeResponse> => {
  return authGateway.me<MeResponse>();
};

/* SIGNUP */

export type SignupPayload = {
  username: string;
  email: string;
  password: string;
};

export const signupApi = (
  payload: SignupPayload
): Promise<void> => {
  return authGateway.register<void, SignupPayload>(
    payload
  );
};
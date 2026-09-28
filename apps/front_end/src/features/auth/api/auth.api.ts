
import { authGateway } from "./authGateway";

/* =====================================================
   LOGIN
===================================================== */

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

/* =====================================================
   CURRENT USER
===================================================== */

export type MeResponse = {
  id: number;
  email: string;
  name: string;
};

export const fetchMeApi = (): Promise<MeResponse> => {
  return authGateway.me<MeResponse>();
};

/* =====================================================
   SIGNUP
===================================================== */

export type SignupPayload = {
  username: string;
  email: string;
  password: string;
};

export type SignupResponse = {
  message: string;
};

export const signupApi = (
  payload: SignupPayload
): Promise<SignupResponse> => {
  return authGateway.register<
    SignupResponse,
    SignupPayload
  >(payload);
};

/* =====================================================
   LOGOUT
===================================================== */

export type LogoutResponse = {
  message: string;
};

export const logoutApi = (): Promise<LogoutResponse> => {
  return authGateway.logout<LogoutResponse>();
};

/* =====================================================
   REFRESH
===================================================== */

export type RefreshResponse = {
  message: string;
};

export const refreshApi = (): Promise<RefreshResponse> => {
  return authGateway.refresh<RefreshResponse>();
};


// src/features/auth/context/AuthContext.ts

import { createContext } from "react";
import type { MeResponse } from "../api/login.api";

export type AuthContextType = {
  user: MeResponse | null;
  isAuthenticated: boolean;
  isLoadingAuth: boolean;
};

export const AuthContext =
  createContext<AuthContextType | undefined>(
    undefined
  );
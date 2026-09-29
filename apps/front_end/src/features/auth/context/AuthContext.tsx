
import { createContext } from "react";

import type { MeResponse } from "../api/auth.api";

export interface AuthContextValue {
  user: MeResponse | null;
  isAuthenticated: boolean;
  isLoadingAuth: boolean;
}

export const AuthContext = createContext<AuthContextValue | undefined>(
  undefined,
);

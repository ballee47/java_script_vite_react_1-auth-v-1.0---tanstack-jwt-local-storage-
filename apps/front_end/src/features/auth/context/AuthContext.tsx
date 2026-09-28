
import { createContext } from "react";
import { User } from "../types/auth.types";


export interface AuthContextValue {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export const AuthContext = createContext<AuthContextValue | undefined>(
  undefined,
);


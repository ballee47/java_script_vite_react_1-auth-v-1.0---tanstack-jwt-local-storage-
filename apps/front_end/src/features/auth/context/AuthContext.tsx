// src/features/auth/context/AuthContext.ts
import { createContext } from "react";

// ─────────────────────────────────────────
// TYPE
// ─────────────────────────────────────────
export type AuthContextType = {
  isAuthenticated: boolean;
  isLoadingAuth: boolean;
};

// ─────────────────────────────────────────
// CONTEXT
// ─────────────────────────────────────────
export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  isLoadingAuth: true,
});
// src/features/auth/hooks/useAuth.ts

import { useContext } from "react";
import {
  AuthContext,
  type AuthContextValue,
} from "../context/AuthContext";

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error(
      "useAuth must be used within AuthProvider"
    );
  }

  return context;
}

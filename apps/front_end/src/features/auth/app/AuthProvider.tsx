
import { createContext } from "react";

import type { useMe } from "../hooks/useAuthQueries";

type User = NonNullable<ReturnType<typeof useMe>["data"]>;

export interface AuthContextValue {
  user: User | null;
  isAuthenticated: boolean;
  isLoadingAuth: boolean;
}

export const AuthContext = createContext<AuthContextValue | undefined>(
  undefined,
);


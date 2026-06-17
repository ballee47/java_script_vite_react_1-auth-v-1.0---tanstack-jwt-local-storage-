import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useMe, useLogin, useLogout } from "./useAuthQueries";

export function useAuth() {
  const { isAuthenticated, isLoadingAuth } = useContext(AuthContext);

  const { data: user } = useMe();
  const { mutate: login, isPending: isLoggingIn } = useLogin();
  const { mutate: logoutMutation, isPending: isLoggingOut } = useLogout();

  // ✅ WRAPPED LOGOUT (IMPORTANT FIX)
  const logout = (variables?: any, options?: any) => {
    logoutMutation(variables, {
      ...options,
      onSuccess: (...args: any[]) => {
        // optional: force clean UI state sync
        options?.onSuccess?.(...args);
      },
    });
  };

  return {
    // state
    user,
    isAuthenticated,
    isLoadingAuth,
    isLoggingIn,
    isLoggingOut,

    // actions
    login,
    logout, // ✅ now controlled wrapper
  };
}
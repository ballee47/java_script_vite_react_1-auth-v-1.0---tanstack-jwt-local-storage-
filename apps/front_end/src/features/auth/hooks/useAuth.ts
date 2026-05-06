import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useLogin, useMe, useLogout } from "./useAuthQueries";



export function useAuth() {
  const context = useContext(AuthContext);

  const loginMutation = useLogin();
  const logoutMutation = useLogout();
  const meQuery = useMe();

  return {
    ...context,

    // React Query auth actions
    login: loginMutation.mutate,
    logout: logoutMutation.mutate,

    // server state
    user: meQuery.data,
    isUserLoading: meQuery.isLoading,
    };
}
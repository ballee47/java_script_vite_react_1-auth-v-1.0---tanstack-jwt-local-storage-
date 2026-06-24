import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { loginApi, fetchMeApi } from "../api/login.api";
import { logout as logoutApi } from "@/infra/http/auth/logout";
import { queryKeys } from "@/query/keys";
import { clearAllStorage } from "@/infra/storage/cookieStorage";

/* =====================================================
   LOGIN
===================================================== */
export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: loginApi,

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: queryKeys.me,
      });

      await queryClient.refetchQueries({
        queryKey: queryKeys.me,
      });
    },
  });
};

/* =====================================================
   CURRENT USER
===================================================== */
export const useMe = () => {
  return useQuery({
    queryKey: queryKeys.me,
    queryFn: async () => {
      // Backend sets HttpOnly cookies; don't rely on document.cookie.
      // Try fetching the current user; server returns 401 if unauthenticated.
      return fetchMeApi();
    },

    retry: false,

    staleTime: 0,

    gcTime: 0,

    refetchOnWindowFocus: false,

    refetchOnReconnect: false,

    refetchOnMount: true,
  });
};

/* =====================================================
   LOGOUT (FIXED - REAL API + CLEAN CACHE RESET)
===================================================== */

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logoutApi,

    onSettled: () => {
      clearAllStorage();

      // Force AuthProvider to see "logged out"
      queryClient.setQueryData(
        queryKeys.me,
        null
      );

      // Optional: remove other cached data
      queryClient.removeQueries({
        queryKey: queryKeys.me,
        exact: true,
      });
    },
  });
};


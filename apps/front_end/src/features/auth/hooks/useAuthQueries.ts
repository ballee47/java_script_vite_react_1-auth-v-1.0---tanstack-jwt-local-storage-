import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { loginApi, fetchMeApi } from "../api/login.api";
import { logout as logoutApi } from "@/infra/http/auth/logout";
import { queryKeys } from "@/query/keys";

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
    queryFn: fetchMeApi,

    retry: false, // 🔥 correct for auth endpoints

    staleTime: 1000 * 60 * 5, // cache user for 5 min (prevents spam calls)

    gcTime: 1000 * 60 * 10, // keep cache for a bit

    refetchOnWindowFocus: false,

    refetchOnReconnect: false,

    refetchOnMount: true, // important for fresh auth check
  });
};

/* =====================================================
   LOGOUT (FIXED - REAL API + CLEAN CACHE RESET)
===================================================== */
export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      // 🔥 REAL BACKEND CALL (IMPORTANT FIX)
      await logoutApi();
    },

    onSuccess: () => {
      // 🔥 HARD RESET ALL AUTH STATE
      queryClient.removeQueries({ queryKey: queryKeys.me });
      queryClient.clear();
    },

    onError: () => {
      // Even if logout fails, still clear frontend state
      queryClient.removeQueries({ queryKey: queryKeys.me });
      queryClient.clear();
    },
  });
};
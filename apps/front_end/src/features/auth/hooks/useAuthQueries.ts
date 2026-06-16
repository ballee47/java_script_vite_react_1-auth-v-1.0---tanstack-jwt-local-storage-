// src/features/auth/hooks/useAuthQueries.ts

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { loginApi, fetchMeApi } from "../api/login.api";
import { queryKeys } from "@/query/keys";

/* =====================================================
   LOGIN
   - Backend sets HTTP-only cookies
   - No token storage in frontend
   ===================================================== */
export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: loginApi,

    onSuccess: async () => {
      // After login, immediately try to fetch user session
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
   CURRENT USER (SESSION CHECK)
   - Relies fully on cookies
   - No localStorage dependency
   ===================================================== */
export const useMe = () => {
  return useQuery({
    queryKey: queryKeys.me,
    queryFn: fetchMeApi,

    retry: (failureCount, error: any) => {
      // Don’t spam retry on 401 (invalid session)
      if (error?.response?.status === 401) return false;
      return failureCount < 2;
    },

    staleTime: 1000 * 60 * 5, // 5 minutes cache

    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
  });
};

/* =====================================================
   LOGOUT (FRONTEND ONLY FOR NOW)
   - Ideally backend should clear cookies
   ===================================================== */
export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      // OPTIONAL (best practice):
      // await httpClient.post("/api/logout/");
      return Promise.resolve();
    },

    onSuccess: () => {
      // Clear all cached user data
      queryClient.removeQueries({
        queryKey: queryKeys.me,
      });

      queryClient.clear();
    },
  });
};
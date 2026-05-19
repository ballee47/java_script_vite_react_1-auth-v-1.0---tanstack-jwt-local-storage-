// src/features/auth/hooks/useAuthQueries.ts
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { tokenStorage, clearAllStorage } from "@/infra/storage/cookieStorage";
import { loginApi, fetchMeApi } from "../api/login.api";
import { queryKeys } from "@/query/keys";

/* ---------------- LOGIN ---------------- */
export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: loginApi,
    onSuccess: (data) => {
      tokenStorage.setTokens(data.access, data.refresh);
      // ✅ invalidate AND refetch immediately
      queryClient.invalidateQueries({ queryKey: queryKeys.me });
      queryClient.refetchQueries({ queryKey: queryKeys.me }); // ✅ added
    },
  });
};

/* ---------------- ME ---------------- */
export const useMe = () => {
  return useQuery({
    queryKey: queryKeys.me,
    queryFn: fetchMeApi,
    retry: false,
    staleTime: 1000 * 60 * 5,              // ✅ 5 mins
    enabled: tokenStorage.hasAccessToken(),
  });
};

/* ---------------- LOGOUT ---------------- */
export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => Promise.resolve(),
    onSuccess: () => {
      clearAllStorage();
      queryClient.resetQueries({ queryKey: queryKeys.me });
      queryClient.clear(); // ✅ wipe full cache
    },
  });
};
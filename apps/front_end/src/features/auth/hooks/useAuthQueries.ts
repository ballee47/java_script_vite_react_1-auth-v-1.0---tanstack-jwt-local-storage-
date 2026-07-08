import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { loginApi, fetchMeApi } from "../api/login.api";
import { logout as logoutApi } from "@/infra/http/auth/logout";
import { queryKeys } from "@/query/keys";
import { clearStorage } from "@/infra/storage";

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

    retry: false,
    staleTime: 0,
    gcTime: 0,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: true,
  });
};

/* =====================================================
   LOGOUT
===================================================== */

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logoutApi,

    onSettled: () => {
      clearStorage();

      queryClient.setQueryData(
        queryKeys.me,
        null
      );

      queryClient.removeQueries({
        queryKey: queryKeys.me,
        exact: true,
      });
    },
  });
};
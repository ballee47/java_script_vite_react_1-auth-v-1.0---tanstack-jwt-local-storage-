
import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  loginApi,
  fetchMeApi,
} from "../api/auth.api";
import type { MeResponse } from "../api/auth.api";

import { logout as logoutApi } from "@/infra/http/auth/logout";

import { queryKeys } from "@/query/keys";

export function useMe() {
  return useQuery({
    queryKey: queryKeys.me,
    queryFn: fetchMeApi,
    retry: false,
  });
}

export function useLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: loginApi,

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: queryKeys.me,
      });
    },
  });
}

export function useLogout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logoutApi,

    onSuccess: () => {
      queryClient.setQueryData<MeResponse | null>(
        queryKeys.me,
        null,
      );
    },
  });
}


import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { httpClient } from "@/infra/http/httpClient";

/* ---------------- LOGIN ---------------- */
const login = async (data: { username: string; password: string }) => {
  const res = await httpClient.post("/api/token/", data);
  return res.data;
};

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: login,

    onSuccess: (data) => {
      // store JWT tokens
      localStorage.setItem("access", data.access);
      localStorage.setItem("refresh", data.refresh);

      // refresh user
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },
  });
};

/* ---------------- ME ---------------- */
const fetchMe = async () => {
  const res = await httpClient.get("/api/me/");
  return res.data;
};

export const useMe = () => {
  return useQuery({
    queryKey: ["me"],
    queryFn: fetchMe,
    retry: false,
    enabled: !!localStorage.getItem("access"),
  });
};

/* ---------------- LOGOUT ---------------- */
const logout = async () => {
  return Promise.resolve();
};

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logout,

    onSuccess: () => {
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");

      queryClient.removeQueries({ queryKey: ["me"] });
    },
  });
};
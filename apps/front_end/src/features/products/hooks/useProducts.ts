import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { queryKeys } from "@/query/keys";

export const useProducts = () => {
  return useQuery({
    queryKey: queryKeys.products,
    queryFn: async () => {
      const { data } = await axios.get(
        "http://127.0.0.1:8000/api/products/"
      );
      return data;
    },
  });
};
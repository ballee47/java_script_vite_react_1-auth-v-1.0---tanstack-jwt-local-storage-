import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/query/keys";
import { getCategories } from "../api/categories.api";

export function useCategories() {
  return useQuery({
    queryKey: queryKeys.categories,
    queryFn: getCategories,
  });
}

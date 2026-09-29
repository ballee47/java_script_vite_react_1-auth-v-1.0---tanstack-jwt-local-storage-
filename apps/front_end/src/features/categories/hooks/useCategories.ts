import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/query/keys";
import { getCategories } from "../api/categories.api";
import type { Category } from "../types/categories.types";

export function useCategories() {
  return useQuery({
    queryKey: queryKeys.categories,
    queryFn: () => getCategories<Category[]>(),
  });
}

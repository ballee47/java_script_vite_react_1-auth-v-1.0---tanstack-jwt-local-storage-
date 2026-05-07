// src/features/products/hooks/useProducts.ts
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/query/keys";
import { getProductsApi } from "../api/product.api"; // ✅ import from api file

export const useProducts = () => {
  return useQuery({
    queryKey: queryKeys.products,
    queryFn: getProductsApi, // ✅ clean — just pass the function
  });
};
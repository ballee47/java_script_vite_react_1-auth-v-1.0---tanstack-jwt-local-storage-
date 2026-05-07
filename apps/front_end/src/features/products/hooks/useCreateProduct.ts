// src/features/products/hooks/useCreateProduct.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { uploadImage } from "@/infra/storage/cloudinary";
import { createProductApi, Product } from "../api/product.api"; // ✅
import { queryKeys } from "@/query/keys";

type CreateProductInput = {
  form: {
    name: string;
    price: number;
    description?: string;
  };
  file: File;
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation<Product, Error, CreateProductInput>({
    mutationFn: async ({ form, file }) => {
      if (!file) throw new Error("Image file is required");

      // 1. upload image to cloudinary
      const imageUrl = await uploadImage(file);

      // 2. create product with httpClient (token auto attached) ✅
      return createProductApi({ ...form, image: imageUrl });
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.products,
        exact: true,
      });
    },
  });
};
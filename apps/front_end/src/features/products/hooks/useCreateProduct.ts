import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { uploadImage } from "@/infra/storage/cloudinary";
import { queryKeys } from "@/query/keys";

type ProductForm = {
  name: string;
  price: number;
  description?: string;
};

type CreateProductInput = {
  form: ProductForm;
  file: File;
};

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation<Product, Error, CreateProductInput>({
    mutationFn: async ({ form, file }) => {
      if (!file) throw new Error("Image file is required");

      const imageUrl = await uploadImage(file);

      const { data } = await axios.post<Product>(
        "http://127.0.0.1:8000/api/products/",
        {
          ...form,
          image: imageUrl,
        }
      );

      return data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.products,
        exact: true,
      });
    },
  });
};
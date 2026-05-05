import { useMutation, useQueryClient } from "@tanstack/react-query";
import { httpClient } from "@/infra/http/httpClient";
import { uploadImage } from "@/infra/storage/cloudinary";
import { queryKeys } from "@/query/keys";

export type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
};

type ProductForm = {
  name: string;
  price: number;
  description?: string;
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      form,
      file,
    }: {
      form: ProductForm;
      file: File;
    }): Promise<Product> => {
      if (!file) throw new Error("Image is required");

      const imageUrl = await uploadImage(file);

      const res = await httpClient.post("/api/products/", {
        ...form,
        image: imageUrl,
      });

      return res.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.products,
      });
    },
  });
};
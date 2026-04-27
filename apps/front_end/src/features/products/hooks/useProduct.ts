import axios from "axios";
import { uploadImage } from "@/infra/storage/cloudinary";

export const useProduct = () => {

  const createProduct = async (form: any, file: File) => {
    const imageUrl = await uploadImage(file); // ✅ Cloudinary

    const res = await axios.post("http://127.0.0.1:8000/api/products/", {
      ...form,
      image: imageUrl,
    });

    return res.data;
  };

  return { createProduct };
};
import { httpClient } from "@/infra/http/httpClient";
export const createProduct = async (data) => {
    const response = await httpClient.post("/products/", data);
    return response.data;
};
export const getProducts = async () => {
    const response = await httpClient.get("/products/");
    return response.data;
};

import { httpClient} from "@/infra/http/httpClient";


export const createCategories = async (data: any) => {
  const response = await httpClient.post("/categories/", data);
  return response.data;
};

export const getCategories = async () => {
  const response = await httpClient.get("/categories/");
  return response.data;
};

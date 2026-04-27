import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000/api/",
});

export const getProducts = async () => {
  const res = await API.get("products/");
  return res.data;
};
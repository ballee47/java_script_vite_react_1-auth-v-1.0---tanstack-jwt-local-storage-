import axios from "axios";

export const loginApi = async (username: string, password: string) => {
  const res = await axios.post("http://127.0.0.1:8000/api/token/", {
    username,
    password,
  });

  return res.data;
};
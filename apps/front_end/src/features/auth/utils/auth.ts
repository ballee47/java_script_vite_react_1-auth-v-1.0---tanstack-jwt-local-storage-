export const getUsername = () => {
  return localStorage.getItem("username");
};

export const getToken = () => {
  return localStorage.getItem("access");
};

export const logout = () => {
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");
  localStorage.removeItem("username");
};
import axios from "axios";

export const Login = async (data) => {
  const response = await axios.post("/auth/login", data);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
    window.location.reload();
  }
  return response.data;
};

export const logout = () => {
  localStorage.removeItem("user");
};

import axios from "axios";
const user = JSON.parse(localStorage.getItem("user"));

export const FetchLogInUser = async () => {
  const response = axios.get(`/auth/own`, {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  });
  return (await response).data;
};

export const FetchAllUsers = async () => {
  const response = await axios.get("/auth/users", {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  });
  return response.data;
};
export const FetchAllFriends = async () => {
  const response = await axios.get("/auth/getFriend", {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  });
  return response.data;
};

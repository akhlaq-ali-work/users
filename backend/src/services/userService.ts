import axiosClient from "../utils/axiosClient";

export const fetchAllUsers = async () => {
  const response = await axiosClient.get("/users");
  return response.data;
};

export const fetchUserById = async (id: string) => {
  const response = await axiosClient.get(`/users/${id}`);
  return response.data;
};

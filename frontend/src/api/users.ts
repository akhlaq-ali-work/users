import axiosInstance from "../utils/axiosInstance";

export const fetchUsers = async () => {
  const response = await axiosInstance.get("/api/users");
  return response.data;
};

export const fetchUserById = async (id: string) => {
  const response = await axiosInstance.get(`/api/users/${id}`);
  return response.data;
};

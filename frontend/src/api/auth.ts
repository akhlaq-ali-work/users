import axiosInstance from "../utils/axiosInstance";

export const login = async (credentials: {
  email: string;
  password: string;
}) => {
  const response = await axiosInstance.post("/api/auth/login", credentials);
  return response.data;
};

export const register = async (user: {
  name: string;
  email: string;
  password: string;
}) => {
  try {
    const response = await axiosInstance.post("/api/auth/register", user);
    console.log("✅ Register API success:", response.data);
    return response.data;
  } catch (err: any) {
    console.error("❌ Register API error:", err.response?.data || err.message);
    throw err;
  }
};

export const logout = async () => {
  const res = await axiosInstance.post("/api/auth/logout");
  return res.data;
};

export const checkAuth = async () => {
  const res = await axiosInstance.get("/api/auth/check-auth");
  return res.data;
};

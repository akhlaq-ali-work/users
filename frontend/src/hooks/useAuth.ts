import { useMutation, useQuery } from "@tanstack/react-query";
import { login, register, checkAuth, logout } from "../api/auth";
import { useDispatch } from "react-redux";
import { loginSuccess } from "@/features/auth/authSlice";
import { logout as logoutAction } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: login,
    onSuccess: () => {
      dispatch(loginSuccess());
    },
    onError: (error) => {
      console.error("Registration Error:", error?.response?.data?.error);
    },
  });
};

export const useRegister = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: register,
    onSuccess: (data) => {
      console.log("data: ", data);
      navigate("/login");
    },
    onError: (error) => {
      console.error("Registration Error:", error?.response?.data?.error);
    },
  });
};

export const useCheckAuth = () => {
  return useQuery({
    queryKey: ["auth"],
    queryFn: checkAuth,
    retry: false,
  });
};

export const useLogout = () => {
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      dispatch(logoutAction());
    },
    onError: (error) => {
      console.error("Logout failed:", error);
    },
  });
};

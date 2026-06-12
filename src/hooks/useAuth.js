import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { api } from "../services/api";
import { queryClient } from "../services/queryClient";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";

export const useLogin = () =>
  useMutation({
    mutationFn: async (payload) => {
      const res = await api.post("/auth/login", payload);
      return res.data?.data;
    },
    onSuccess: (data) => {
      useAuthStore
        .getState()
        .setAuth({ user: data.user, accessToken: data.accessToken, refreshToken: data.refreshToken });
      queryClient.invalidateQueries({ queryKey: ["auth", "me"] });
      toast.success("Logged in successfully");
    },
    onError: (error) => {
      const message = error?.response?.data?.message || "Login failed";
      toast.error(message);
    },
  });

export const useRegister = () =>
  useMutation({
    mutationFn: async (payload) => {
      const res = await api.post("/auth/register", payload);
      return res.data?.data; // returns { userId, email }
    },
    onError: (error) => {
      const errors = error?.response?.data?.errors;

      if (Array.isArray(errors) && errors.length) {
        errors.forEach((err) => {
          toast.error(err.message.replace(/^"body\.[^"]+"\s*/, ""));
        });
        return;
      }

      toast.error(error?.response?.data?.message || "Validation Error");
    },
  });

export const useVerifyOtp = () =>
  useMutation({
    mutationFn: async ({ userId, otp }) => {
      const res = await api.post("/auth/verify-otp", { userId, otp });
      return res.data?.data;
    },
    onError: (err) =>
      toast.error(err?.response?.data?.message || "Invalid OTP"),
  });

export const useResendOtp = () =>
  useMutation({
    mutationFn: async ({ userId }) => {
      const res = await api.post("/auth/resend-otp", { userId });
      return res.data?.data;
    },
    onSuccess: () => toast.success("OTP resent to your email!"),
    onError: (err) =>
      toast.error(err?.response?.data?.message || "Failed to resend OTP"),
  });

export const useLogout = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async () => {
      await api.post("/auth/logout");
      return true;
    },
    onSuccess: () => {
      useAuthStore.getState().clearAuth();
      queryClient.clear();
      toast.success("Logged out");
      navigate("/login");
    },
    onError: () => {
      useAuthStore.getState().clearAuth();
      queryClient.clear();
      toast.success("Logged out");
      navigate("/login");
    },
  });
};

export const useMe = (options = {}) =>
  useQuery({
    queryKey: ["auth", "me"],
    queryFn: async () => {
      const res = await api.get("/auth/me");
      return res.data?.data;
    },
    staleTime: 1000 * 60 * 5,
    ...options,
  });

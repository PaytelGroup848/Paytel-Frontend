import { useMutation, useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { api } from '../services/api';
import { queryClient } from '../services/queryClient';
import { useAuthStore } from '../store/authStore';

export const useLogin = () =>
  useMutation({
    mutationFn: async (payload) => {
      const res = await api.post('/auth/login', payload);
      return res.data?.data;
    },
    onSuccess: (data) => {
      useAuthStore.getState().setAuth({ user: data.user, accessToken: data.accessToken });
      queryClient.invalidateQueries({ queryKey: ['auth', 'me'] });
      toast.success('Logged in successfully');
    },
    onError: () => toast.error('Login failed'),
  });

export const useRegister = () =>
  useMutation({
    mutationFn: async (payload) => {
      const res = await api.post('/auth/register', payload);
      return res.data?.data;
    },
    onSuccess: () => toast.success('Account created. Please login.'),
    onError: () => toast.error('Registration failed'),
  });

export const useLogout = () =>
  useMutation({
    mutationFn: async () => {
      await api.post('/auth/logout');
      return true;
    },
    onSuccess: () => {
      useAuthStore.getState().clearAuth();
      queryClient.clear();
      toast.success('Logged out');
    },
    onError: () => {
      useAuthStore.getState().clearAuth();
      queryClient.clear();
      toast.success('Logged out');
    },
  });

export const useMe = () =>
  useQuery({
    queryKey: ['auth', 'me'],
    queryFn: async () => {
      const res = await api.get('/auth/me');
      return res.data?.data;
    },
    staleTime: 1000 * 60 * 5,
  });


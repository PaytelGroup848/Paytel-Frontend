import { useMutation, useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { api } from '../services/api';
import { queryClient } from '../services/queryClient';

export const useProfile = () =>
  useQuery({
    queryKey: ['user', 'profile'],
    queryFn: async () => {
      const res = await api.get('/users/profile');
      return res.data?.data;
    },
    staleTime: 1000 * 60 * 5,
  });

export const useUpdateProfile = () =>
  useMutation({
    mutationFn: async (payload) => {
      const res = await api.put('/users/profile', payload);
      return res.data?.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user', 'profile'] });
      toast.success('Profile updated');
    },
    onError: () => toast.error('Profile update failed'),
  });

export const useUpdatePassword = () =>
  useMutation({
    mutationFn: async (payload) => {
      const res = await api.put('/users/password', payload);
      return res.data?.data;
    },
    onSuccess: () => toast.success('Password updated'),
    onError: () => toast.error('Password update failed'),
  });

export const useSessions = () =>
  useQuery({
    queryKey: ['user', 'sessions'],
    queryFn: async () => {
      const res = await api.get('/users/sessions');
      return res.data?.data;
    },
    staleTime: 0,
  });

export const useDeleteSession = () =>
  useMutation({
    mutationFn: async (id) => {
      const res = await api.delete(`/users/sessions/${id}`);
      return res.data?.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user', 'sessions'] });
      toast.success('Session revoked');
    },
    onError: () => toast.error('Failed to revoke session'),
  });


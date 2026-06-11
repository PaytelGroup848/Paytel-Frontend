import { useMutation, useQuery } from '@tanstack/react-query';
import { api } from '../services/api';
import { queryClient } from '../services/queryClient';
import toast from 'react-hot-toast';

export const useAdminUsers = (params = {}) =>
  useQuery({
    queryKey: ['admin', 'users', params],
    queryFn: () =>
      api.get('/auth/admin/users', { params }).then((r) => ({
        items: r.data?.data || [],
        meta: r.data?.meta || {},
      })),
    staleTime: 0,
  });

export const useCreateAdminUser = () =>
  useMutation({
    mutationFn: (data) =>
      api.post('/auth/admin/users', data).then((r) => r.data?.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'users'] });
      toast.success('User created successfully!');
    },
    onError: (err) =>
      toast.error(err?.response?.data?.message || 'Failed to create user'),
  });

export const useTerminateUser = () =>
  useMutation({
    mutationFn: (id) =>
      api.put(`/auth/admin/users/${id}/terminate`).then((r) => r.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'users'] });
      toast.success('User terminated');
    },
  });

export const useUnterminateUser = () =>
  useMutation({
    mutationFn: (id) =>
      api.put(`/auth/admin/users/${id}/unterminate`).then((r) => r.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'users'] });
      toast.success('User unterminated');
    },
  });

export const useDeleteAdminUser = () =>
  useMutation({
    mutationFn: (id) => api.delete(`/auth/admin/users/${id}`).then((r) => r.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'users'] });
      toast.success('User deleted');
    },
    onError: (err) =>
      toast.error(err?.response?.data?.message || 'Failed to delete user'),
  });

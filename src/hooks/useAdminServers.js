import { useMutation, useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { api } from '../services/api';
import { queryClient } from '../services/queryClient';

export const useServers = () =>
  useQuery({
    queryKey: ['admin', 'servers'],
    queryFn: async () => {
      const res = await api.get('/admin/servers');
      return res.data?.data || [];
    },
    staleTime: 0,
  });

export const useAddServer = () =>
  useMutation({
    mutationFn: async (payload) => {
      const res = await api.post('/admin/servers', payload);
      return res.data?.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'servers'] });
      toast.success('Server added');
    },
    onError: () => toast.error('Failed to add server'),
  });

export const useUpdateServer = () =>
  useMutation({
    mutationFn: async ({ id, payload }) => {
      const res = await api.put(`/admin/servers/${id}`, payload);
      return res.data?.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'servers'] });
      toast.success('Server updated');
    },
    onError: () => toast.error('Failed to update server'),
  });

export const useDeleteServer = () =>
  useMutation({
    mutationFn: async (id) => {
      const res = await api.delete(`/admin/servers/${id}`);
      return res.data?.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'servers'] });
      toast.success('Server deleted');
    },
    onError: () => toast.error('Failed to delete server'),
  });

export const useServerStats = (id) =>
  useQuery({
    queryKey: ['admin', 'server', id, 'stats'],
    queryFn: async () => {
      const res = await api.get(`/admin/servers/${id}/stats`);
      return res.data?.data;
    },
    enabled: Boolean(id),
    staleTime: 0,
    refetchInterval: 30000,
  });

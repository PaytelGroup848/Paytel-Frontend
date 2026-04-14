import { useMutation, useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { api } from '../services/api';
import { queryClient } from '../services/queryClient';

export const usePlans = () =>
  useQuery({
    queryKey: ['hosting', 'plans'],
    queryFn: async () => {
      const res = await api.get('/hosting/plans');
      return res.data?.data;
    },
    staleTime: 1000 * 60 * 10,
  });

export const useInstances = () =>
  useQuery({
    queryKey: ['hosting', 'instances'],
    queryFn: async () => {
      const res = await api.get('/hosting/instances');
      return res.data?.data;
    },
    staleTime: 0,
  });

export const useInstance = (id) =>
  useQuery({
    queryKey: ['hosting', 'instance', id],
    queryFn: async () => {
      const res = await api.get(`/hosting/instances/${id}`);
      return res.data?.data;
    },
    enabled: Boolean(id),
    staleTime: 0,
  });

export const usePurchaseHosting = () =>
  useMutation({
    mutationFn: async (payload) => {
      const res = await api.post('/hosting/purchase', payload);
      return res.data?.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['hosting', 'instances'] });
      toast.success('Hosting created! Proceed to payment.');
    },
    onError: () => toast.error('Failed to create hosting'),
  });

export const useTerminateInstance = () =>
  useMutation({
    mutationFn: async (id) => {
      const res = await api.delete(`/hosting/instances/${id}`);
      return res.data?.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['hosting', 'instances'] });
      toast.success('Instance terminated');
    },
    onError: () => toast.error('Failed to terminate instance'),
  });


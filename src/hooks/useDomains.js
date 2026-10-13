import { useMutation, useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { api } from '../services/api';
import { queryClient } from '../services/queryClient';

export const useDomains = () =>
  useQuery({
    queryKey: ['domains'],
    queryFn: async () => {
      const res = await api.get('/domains');
      return res.data?.data;
    },
    staleTime: 0,
  });

export const useDomain = (id) =>
  useQuery({
    queryKey: ['domain', id],
    queryFn: async () => {
      const res = await api.get(`/domains/${id}`);
      return res.data?.data;
    },
    enabled: Boolean(id),
    staleTime: 0,
  });

export const useCheckAvailability = () =>
  useMutation({
    mutationFn: async (name) => {
      const res = await api.get(`/domains/check?name=${encodeURIComponent(name)}`);
      return res.data?.data;
    },
    onError: () => toast.error('Availability check failed'),
  });

export const useRegisterDomain = () =>
  useMutation({
    mutationFn: async (payload) => {
      const res = await api.post('/domains/register', payload);
      return res.data?.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['domains'] });
      toast.success('Domain registered');
    },
    onError: () => toast.error('Domain registration failed'),
  });

export const useDNSRecords = (id) =>
  useQuery({
    queryKey: ['dns', id],
    queryFn: async () => {
      const res = await api.get(`/domains/${id}/dns`);
      return res.data?.data;
    },
    enabled: Boolean(id),
    staleTime: 0,
  });

export const useUpdateDNS = () =>
  useMutation({
    mutationFn: async ({ id, record }) => {
      const res = await api.put(`/domains/${id}/dns`, record);
      return res.data?.data;
    },
    onSuccess: (_data, vars) => {
      queryClient.invalidateQueries({ queryKey: ['dns', vars.id] });
      toast.success('DNS record updated');
    },
    onError: () => toast.error('DNS update failed'),
  });


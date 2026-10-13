import { useMutation, useQuery } from '@tanstack/react-query';
import { api } from '../services/api';
import { queryClient } from '../services/queryClient';
import toast from 'react-hot-toast';

export const useTallyPlans = () =>
  useQuery({
    queryKey: ['tally', 'plans'],
    queryFn: () => api.get('/vps/tally-plans').then(r => r.data?.data || []),
    staleTime: 1000 * 60 * 10,
  });

export const useCreateTallyOrder = () =>
  useMutation({
    mutationFn: (data) =>
      api.post('/vps/tally-order', data).then(r => r.data?.data),
    onError: (err) =>
      toast.error(err?.response?.data?.message || 'Failed to create order'),
  });

export const useVerifyTallyPayment = () =>
  useMutation({
    mutationFn: (data) =>
      api.post('/vps/tally-verify', data).then(r => r.data?.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vps', 'instances'] });
    },
    onError: (err) =>
      toast.error(err?.response?.data?.message || 'Payment verification failed'),
  });

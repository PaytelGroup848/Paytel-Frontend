import { useMutation, useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { api } from '../services/api';
import { queryClient } from '../services/queryClient';

export const useBillingPlans = () =>
  useQuery({
    queryKey: ['billing', 'plans'],
    queryFn: async () => {
      const res = await api.get('/billing/plans');
      return res.data?.data;
    },
    staleTime: 1000 * 60 * 10,
  });

export const useInvoices = (params = { page: 1, limit: 10 }) =>
  useQuery({
    queryKey: ['billing', 'invoices', params],
    queryFn: async () => {
      const res = await api.get('/billing/invoices', { params });
      return res.data;
    },
    staleTime: 0,
  });

export const useBillingInvoices = (params = { page: 1, limit: 10 }) =>
  useQuery({
    queryKey: ['billing', 'invoices', params],
    queryFn: async () => {
      const res = await api.get('/billing/invoices', { params });
      return res.data;
    },
    staleTime: 0,
  });

export const useInvoice = (id) =>
  useQuery({
    queryKey: ['billing', 'invoice', id],
    queryFn: async () => {
      const res = await api.get(`/billing/invoices/${id}`);
      return res.data?.data;
    },
    enabled: Boolean(id),
    staleTime: 0,
  });

export const useSubscription = () =>
  useQuery({
    queryKey: ['billing', 'subscription'],
    queryFn: async () => {
      const res = await api.get('/billing/subscription');
      return res.data?.data;
    },
    staleTime: 0,
  });

export const useCreateOrder = () =>
  useMutation({
    mutationFn: async (payload) => {
      
      const res = await api.post('/billing/create-order', payload);
  
      return res.data?.data;
    },
    onError: () => toast.error('Failed to create order'),
  });

export const useVerifyPayment = () =>
  useMutation({
    mutationFn: async (payload) => {
      const res = await api.post('/billing/verify-payment', payload);
      return res.data?.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['billing', 'invoices'] });
      queryClient.invalidateQueries({ queryKey: ['billing', 'subscription'] });
      toast.success('Payment verified');
    },
    onError: () => toast.error('Payment verification failed'),
  });

export const useCancelSubscription = () =>
  useMutation({
    mutationFn: async () => {
      const res = await api.post('/billing/cancel');
      return res.data?.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['billing', 'subscription'] });
      toast.success('Subscription cancelled');
    },
    onError: () => toast.error('Cancel failed'),
  });


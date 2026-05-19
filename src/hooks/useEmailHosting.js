import { useMutation, useQuery } from '@tanstack/react-query';
import { api } from '../services/api';
import { queryClient } from '../services/queryClient';
import toast from 'react-hot-toast';

export const useEmailPlans = () =>
  useQuery({
    queryKey: ['email-hosting', 'plans'],
    queryFn: () => api.get('/email-hosting/plans').then(r => r.data?.data),
    staleTime: 1000 * 60 * 10,
  });

export const useEmailOrders = () =>
  useQuery({
    queryKey: ['email-hosting', 'orders'],
    queryFn: () => api.get('/email-hosting/orders').then(r => r.data?.data),
    staleTime: 0,
  });

export const useEmailOrder = (id) =>
  useQuery({
    queryKey: ['email-hosting', 'order', id],
    queryFn: () => api.get(`/email-hosting/orders/${id}`).then(r => r.data?.data),
    enabled: !!id,
    staleTime: 0,
  });

export const useDnsRecords = (id) =>
  useQuery({
    queryKey: ['email-hosting', 'dns', id],
    queryFn: () => api.get(`/email-hosting/orders/${id}/dns-records`).then(r => r.data?.data),
    enabled: !!id,
    staleTime: 0,
  });

export const useCreateEmailOrder = () =>
  useMutation({
    mutationFn: (data) =>
      api.post('/email-hosting/order', data).then(r => r.data?.data),
    onError: (err) =>
      toast.error(err?.response?.data?.message || 'Failed to create order'),
  });

export const useVerifyEmailPayment = () =>
  useMutation({
    mutationFn: (data) =>
      api.post('/email-hosting/verify-payment', data).then(r => r.data?.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['email-hosting', 'orders'] });
    },
    onError: (err) =>
      toast.error(err?.response?.data?.message || 'Payment verification failed'),
  });

export const useVerifyDkim = (id) =>
  useMutation({
    mutationFn: () =>
      api.post(`/email-hosting/orders/${id}/verify-dkim`).then(r => r.data?.data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['email-hosting', 'order', id] });
      if (data?.verified) toast.success('DKIM verified! Your email is active.');
      else toast.error('DKIM not verified yet. Check DNS records and try again.');
    },
  });

export const useMailboxes = (id) =>
  useQuery({
    queryKey: ['email-hosting', 'mailboxes', id],
    queryFn: () =>
      api.get(`/email-hosting/orders/${id}/mailboxes`).then(r => r.data?.data),
    enabled: !!id,
    staleTime: 0,
  });

// export const useCreateMailbox = (id) =>
//   useMutation({
//     mutationFn: (data) =>
//       api.post(`/email-hosting/orders/${id}/mailboxes`, data).then(r => r.data),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ['email-hosting', 'mailboxes', id] });
//       toast.success('Mailbox created!');
//     },
//     onError: (err) =>
//       toast.error(err?.response?.data?.message || 'Failed to create mailbox'),
//   });

// Make sure your useCreateMailbox hook is correctly configured
export const useCreateMailbox = (orderId) => {
  return useMutation({
    mutationFn: async (data) => {
      const response = await api.post(`/email-hosting/orders/${orderId}/mailboxes`, data);
      return response.data;
    },
    onSuccess: () => {
      // Invalidate and refetch mailboxes query
      queryClient.invalidateQueries(['mailboxes', orderId]);
    },
    onError: (error) => {
      console.error('Create mailbox error:', error);
      throw error;
    }
  });
};


export const useDeleteMailbox = (id) =>
  useMutation({
    mutationFn: (email) =>
      api.delete(`/email-hosting/orders/${id}/mailboxes`, { data: { email } }).then(r => r.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['email-hosting', 'mailboxes', id] });
      toast.success('Mailbox deleted');
    },
  });

export const useAliases = (id) =>
  useQuery({
    queryKey: ['email-hosting', 'aliases', id],
    queryFn: () =>
      api.get(`/email-hosting/orders/${id}/aliases`).then(r => r.data?.data),
    enabled: !!id,
    staleTime: 0,
  });

export const useCreateAlias = (id) =>
  useMutation({
    mutationFn: (data) =>
      api.post(`/email-hosting/orders/${id}/aliases`, data).then(r => r.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['email-hosting', 'aliases', id] });
      toast.success('Alias created!');
    },
    onError: (err) =>
      toast.error(err?.response?.data?.message || 'Failed to create alias'),
  });

export const useDeleteAlias = (id) =>
  useMutation({
    mutationFn: (aliasId) =>
      api.delete(`/email-hosting/orders/${id}/aliases`, { data: { aliasId } }).then(r => r.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['email-hosting', 'aliases', id] });
      toast.success('Alias deleted');
    },
  });


  export const useDnsStatus = (id, ) =>
  useQuery({
    queryKey: ['email-hosting', 'dns-status', id],
    queryFn: () => api.get(`/email-hosting/orders/${id}/dns-status`).then(r => r.data?.data),
    enabled: !!id,
    // refetchInterval: refetchInterval,
    staleTime: 0,
  });


  
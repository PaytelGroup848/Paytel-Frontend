import { useMutation, useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { api } from '../services/api';
import { queryClient } from '../services/queryClient';

const multipartConfig = {
  headers: { 'Content-Type': 'multipart/form-data' },
};

export const useTickets = (params = {}) =>
  useQuery({
    queryKey: ['support', 'tickets', params],
    queryFn: async () => {
      const res = await api.get('/support/tickets', { params });
      return {
        items: res.data?.data || [],
        meta: res.data?.meta || {},
      };
    },
    staleTime: 0,
  });

export const useTicket = (ticketId) =>
  useQuery({
    queryKey: ['support', 'ticket', ticketId],
    queryFn: async () => {
      const res = await api.get(`/support/tickets/${ticketId}`);
      return res.data?.data;
    },
    enabled: Boolean(ticketId),
    staleTime: 0,
  });

export const useCreateTicket = () =>
  useMutation({
    mutationFn: (formData) =>
      api.post('/support/tickets', formData, multipartConfig).then((r) => r.data?.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['support', 'tickets'] });
      toast.success('Ticket raised successfully!');
    },
    onError: (err) =>
      toast.error(err?.response?.data?.message || 'Failed to create ticket'),
  });

export const useAddReply = (ticketId) =>
  useMutation({
    mutationFn: (formData) =>
      api
        .post(`/support/tickets/${ticketId}/reply`, formData, multipartConfig)
        .then((r) => r.data?.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['support', 'ticket', ticketId] });
      queryClient.invalidateQueries({ queryKey: ['support', 'tickets'] });
    },
    onError: (err) =>
      toast.error(err?.response?.data?.message || 'Failed to send reply'),
  });

export const useCloseTicket = () =>
  useMutation({
    mutationFn: (ticketId) =>
      api.put(`/support/tickets/${ticketId}/close`).then((r) => r.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['support', 'tickets'] });
      toast.success('Ticket closed');
    },
    onError: (err) =>
      toast.error(err?.response?.data?.message || 'Failed to close ticket'),
  });

export const useAdminTickets = (params = {}) =>
  useQuery({
    queryKey: ['support', 'admin', 'tickets', params],
    queryFn: async () => {
      const res = await api.get('/support/admin/tickets', { params });
      return {
        items: res.data?.data || [],
        meta: res.data?.meta || {},
      };
    },
    staleTime: 0,
  });

export const useAdminTicket = (ticketId, enabled = true) =>
  useQuery({
    queryKey: ['support', 'admin', 'ticket', ticketId],
    queryFn: async () => {
      const res = await api.get(`/support/admin/tickets/${ticketId}`);
      return res.data?.data;
    },
    enabled: Boolean(ticketId) && enabled,
    staleTime: 0,
  });

export const useTicketStats = () =>
  useQuery({
    queryKey: ['support', 'admin', 'stats'],
    queryFn: async () => {
      const res = await api.get('/support/admin/stats');
      return res.data?.data;
    },
    staleTime: 30000,
  });

export const useAdminReply = (ticketId) =>
  useMutation({
    mutationFn: (formData) =>
      api
        .post(`/support/admin/tickets/${ticketId}/reply`, formData, multipartConfig)
        .then((r) => r.data?.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['support', 'ticket', ticketId] });
      queryClient.invalidateQueries({ queryKey: ['support', 'admin', 'ticket', ticketId] });
      queryClient.invalidateQueries({ queryKey: ['support', 'admin', 'tickets'] });
      toast.success('Reply sent!');
    },
    onError: (err) =>
      toast.error(err?.response?.data?.message || 'Failed to send reply'),
  });

export const useUpdateTicketStatus = () =>
  useMutation({
    mutationFn: ({ ticketId, status }) =>
      api
        .put(`/support/admin/tickets/${ticketId}/status`, { status })
        .then((r) => r.data),
    onSuccess: (_data, { ticketId }) => {
      queryClient.invalidateQueries({ queryKey: ['support', 'admin', 'tickets'] });
      queryClient.invalidateQueries({ queryKey: ['support', 'admin', 'stats'] });
      queryClient.invalidateQueries({ queryKey: ['support', 'admin', 'ticket', ticketId] });
      queryClient.invalidateQueries({ queryKey: ['support', 'ticket', ticketId] });
      toast.success('Status updated');
    },
    onError: (err) =>
      toast.error(err?.response?.data?.message || 'Failed to update status'),
  });

export const useDeleteTicket = () =>
  useMutation({
    mutationFn: (ticketId) =>
      api.delete(`/support/admin/tickets/${ticketId}`).then((r) => r.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['support', 'admin', 'tickets'] });
      queryClient.invalidateQueries({ queryKey: ['support', 'admin', 'stats'] });
      toast.success('Ticket deleted');
    },
    onError: (err) =>
      toast.error(err?.response?.data?.message || 'Failed to delete ticket'),
  });

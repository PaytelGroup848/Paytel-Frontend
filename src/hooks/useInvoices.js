import { useMutation, useQuery } from '@tanstack/react-query';
import { api } from '../services/api';
import { queryClient } from '../services/queryClient';
import toast from 'react-hot-toast';

export const useAdminInvoices = (params = {}) =>
  useQuery({
    queryKey: ['admin', 'invoices', params],
    queryFn: () =>
      api
        .get('/invoices', {
          params: { ...params, populate: 'userId' },
        })
        .then((r) => ({
          items: r.data?.data || [],
          meta: r.data?.meta || {},
        })),
    staleTime: 0,
  });

export const useAdminInvoice = (id) =>
  useQuery({
    queryKey: ['admin', 'invoice', id],
    queryFn: () =>
      api
        .get(`/invoices/${id}`, { params: { populate: 'userId' } })
        .then((r) => r.data?.data),
    enabled: !!id,
    staleTime: 0,
  });

export const useMyInvoices = (params = {}) =>
  useQuery({
    queryKey: ['invoices', 'my', params],
    queryFn: () =>
      api.get('/invoices/my', { params }).then((r) => ({
        items: r.data?.data || [],
        meta: r.data?.meta || {},
      })),
    staleTime: 0,
  });

export const useCreateInvoice = () =>
  useMutation({
    mutationFn: (data) => api.post('/invoices', data).then((r) => r.data?.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'invoices'] });
      toast.success('Invoice created successfully!');
    },
    onError: (err) =>
      toast.error(err?.response?.data?.message || 'Failed to create invoice'),
  });

export const useUpdateInvoiceStatus = () =>
  useMutation({
    mutationFn: ({ id, status }) =>
      api.put(`/invoices/${id}/status`, { status }).then((r) => r.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'invoices'] });
      toast.success('Invoice status updated');
    },
  });

export const useDeleteInvoice = () =>
  useMutation({
    mutationFn: (id) => api.delete(`/invoices/${id}`).then((r) => r.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'invoices'] });
      toast.success('Invoice deleted');
    },
  });

export const downloadInvoicePdf = async (id, invoiceNo) => {
  try {
    const response = await api.get(`/invoices/${id}/download`, {
      responseType: 'blob',
    });
    const url = window.URL.createObjectURL(
      new Blob([response.data], { type: 'application/pdf' })
    );
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${invoiceNo || 'invoice'}.pdf`);
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
  } catch (err) {
    toast.error('Failed to download PDF');
  }
};

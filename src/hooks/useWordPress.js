import { useMutation, useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { api } from '../services/api';
import { queryClient } from '../services/queryClient';

export const useInstances = (params = {}) =>
  useQuery({
    queryKey: ['wordpress', 'instances', params],
    queryFn: async () => {
      const res = await api.get('/wordpress', { params });
      return { items: res.data?.data || [], meta: res.data?.meta || {} };
    },
    staleTime: 0,
  });

export const useInstance = (id, options = {}) =>
  useQuery({
    queryKey: ['wordpress', 'instance', id],
    queryFn: async () => {
      const res = await api.get(`/wordpress/${id}`);
      
      return res.data?.data;
    },
    enabled: Boolean(id) && (options.enabled ?? true),
    staleTime: 0,
    refetchInterval: options.refetchInterval,
  });

export const useCreateInstance = () =>
  useMutation({
    mutationFn: async (payload) => {
      const res = await api.post('/wordpress', payload);
      return res.data?.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wordpress', 'instances'] });
    },
    onError: () => toast.error('Failed to create WordPress instance'),
  });

export const useVerifyDNS = () =>
  useMutation({
    mutationFn: async ({ instanceId }) => {
      const res = await api.post('/wordpress/verify-dns', { instanceId });
      return res.data?.data;
    },
    onError: () => toast.error('DNS verification failed'),
  });

export const useResetPassword = () =>
  useMutation({
    mutationFn: ({ id, newPassword }) =>
      api.post(`/wordpress/${id}/reset-password`, { newPassword })
        .then(r => r.data),
  });

export const useInstanceCredentials = (id, enabled) =>
  useQuery({
    queryKey: ['wordpress', 'credentials', id],
    queryFn: () =>
      api.get(`/wordpress/${id}/credentials`).then(r => r.data?.data),
    enabled: !!id && enabled,
    staleTime: 0,
    
  });

export const useGetFiles = (id, path = '') =>
  useQuery({
    queryKey: ['wordpress', 'files', id, path],
    queryFn: async () => {
      const res = await api.get(`/wordpress/${id}/files`, { params: { path } });
      return res.data?.data || [];
    },
    enabled: Boolean(id),
    staleTime: 0,
  });

export const useCreateFolder = (instanceId) => {
  return useMutation({
    mutationFn: ({ name, path }) =>
      api.post(`/wordpress/${instanceId}/files/folder`, { name, path })
        .then(r => r.data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['wordpress', 'files', instanceId, variables.path]
      });
      toast.success('Folder created successfully!');
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || 'Failed to create folder');
    },
  });
};

export const useCreateFile = (instanceId) => {
  return useMutation({
    mutationFn: ({ name, path }) =>
      api.post(`/wordpress/${instanceId}/files/create`, { name, path })
        .then(r => r.data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['wordpress', 'files', instanceId, variables.path]
      });
      toast.success('File created successfully!');
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || 'Failed to create file');
    },
  });
};

export const useDeleteItem = (instanceId) => {
  return useMutation({
    mutationFn: ({ name, path }) =>
      api.delete(`/wordpress/${instanceId}/files/delete`, { data: { name, path } })
        .then(r => r.data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['wordpress', 'files', instanceId, variables.path]
      });
      toast.success('Deleted successfully!');
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || 'Failed to delete');
    },
  });
};

export const useDeleteInstance = () =>
  useMutation({
    mutationFn: async (id) => {
      const res = await api.delete(`/wordpress/${id}`);
      return res.data?.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wordpress', 'instances'] });
      toast.success('Instance deleted');
    },
    onError: () => toast.error('Failed to delete instance'),
  });

export const useDbTables = (id) =>
  useQuery({
    queryKey: ['wordpress', 'db-tables', id],
    queryFn: () =>
      api.get(`/wordpress/${id}/db-tables`).then(r => r.data?.data),
    enabled: !!id,
    staleTime: 0,
  });

export const useDbCredentials = (id, enabled) =>
  useQuery({
    queryKey: ['wordpress', 'db-credentials', id],
    queryFn: () =>
      api.get(`/wordpress/${id}/db-credentials`).then(r => r.data?.data),
    enabled: !!id && enabled,
    staleTime: 0,
  });

export const useAnalytics = (id, page = 1) =>
  useQuery({
    queryKey: ['wordpress', 'analytics', id, page],
    queryFn: () => api.get(`/wordpress/${id}/analytics?page=${page}`).then(r => r.data?.data),
    enabled: !!id,
    staleTime: 0,
  });

export const useBackups = (id) =>
  useQuery({
    queryKey: ['wordpress', 'backups', id],
    queryFn: () => api.get(`/wordpress/${id}/backups`).then(r => r.data?.data),
    enabled: !!id,
    staleTime: 0,
  });

export const downloadBackupPdf = async (id, domain) => {
  const response = await api.get(`/wordpress/${id}/backups/download-pdf`, {
    responseType: 'blob',
  });
  const url = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `backup-report-${domain}-${new Date().toISOString().slice(0,10)}.pdf`);
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(url);
};

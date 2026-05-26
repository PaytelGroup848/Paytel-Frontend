import { useMutation, useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { api } from '../services/api';
import { queryClient } from '../services/queryClient';

export const usePhpPlans = () =>
  useQuery({
    queryKey: ['php', 'plans'],
    queryFn: () => api.get('/php/plans').then(r => r.data?.data),
    staleTime: 1000 * 60 * 10,
  });

export const usePhpInstances = (params = {}) =>
  useQuery({
    queryKey: ['php', 'instances', params],
    queryFn: () => api.get('/php/instances', { params }).then(r => ({
      items: r.data?.data || [],
      meta: r.data?.meta || {}
    })),
    staleTime: 0,
  });

export const usePhpInstance = (id) =>
  useQuery({
    queryKey: ['php', 'instance', id],
    queryFn: () => {
      if (!id) throw new Error('Instance ID is required');
      return api.get(`/php/instances/${id}`).then(r => r.data?.data);
    },
    enabled: !!id, // This prevents the query from running when id is undefined
    staleTime: 0,
    retry: false,
  });

export const usePhpCredentials = (id) =>
  useQuery({
    queryKey: ['php', 'credentials', id],
    queryFn: () => api.get(`/php/instances/${id}/credentials`).then(r => r.data?.data),
    enabled: !!id,
    staleTime: 1000 * 60 * 5, // 5 min cache
  });

export const useCreatePhpOrder = () =>
  useMutation({
    mutationFn: (data) => api.post('/php/order', data).then(r => r.data?.data),
    onError: (err) => toast.error(err?.response?.data?.message || 'Failed to create order'),
  });

export const useVerifyPhpPayment = () =>
  useMutation({
    mutationFn: (data) => api.post('/php/verify-payment', data).then(r => r.data?.data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['php', 'instances'] }),
  });

export const useVerifyPhpDNS = () =>
  useMutation({
    mutationFn: (data) => api.post('/php/verify-dns', data).then(r => r.data?.data),
  });

export const useSetupPhpDomain = () =>
  useMutation({
    mutationFn: (data) => api.post('/php/setup-domain', data).then(r => r.data?.data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['php', 'instances'] }),
    // onError: (err) => toast.error(err?.response?.data?.message || 'Domain already in use'),
  });


// Make sure instanceId is properly passed
export const usePhpFileList = (id, path = '') =>
  useQuery({
    queryKey: ['php', 'files', id, path],
    queryFn: async () => {
      if (!id) {
        console.error('usePhpFileList: No instance ID provided');
        return [];
      }
      const response = await api.get(`/php/instances/${id}/files`, { params: { path } });
      return response.data?.data || [];
    },
    enabled: !!id,
    staleTime: 0,
  });

export const useCreatePhpFile = () =>
  useMutation({
    mutationFn: ({ id, path, fileName, content = '' }) => {
      if (!id) {
        throw new Error('Instance ID is required');
      }
      return api.post(`/php/instances/${id}/files/create`, { path, fileName, content }).then(r => r.data);
    },
    onSuccess: (_, { id, path }) => {
      queryClient.invalidateQueries({ queryKey: ['php', 'files', id, path] });
      toast.success('File created successfully');
    },
    onError: (error) => {
      console.error('Create file error:', error);
      toast.error(error?.response?.data?.message || 'Failed to create file');
    },
  });

// Get single file content
export const usePhpFileContent = (id, filePath) =>
  useQuery({
    queryKey: ['php', 'file-content', id, filePath],
    queryFn: () => {
      if (!id || !filePath) throw new Error('Instance ID and file path are required');
      return api.get(`/php/instances/${id}/files/content`, { params: { path: filePath } }).then(r => r.data?.data);
    },
    enabled: !!id && !!filePath,
    staleTime: 0,
  });

// Save file content
export const useSavePhpFileContent = () =>
  useMutation({
    mutationFn: ({ id, path, content }) => 
      api.post(`/php/instances/${id}/files/content`, { path, content }).then(r => r.data),
    onSuccess: (_, { id, path }) => {
      queryClient.invalidateQueries({ queryKey: ['php', 'file-content', id, path] });
      queryClient.invalidateQueries({ queryKey: ['php', 'files', id] });
      toast.success('File saved successfully');
    },
    onError: () => toast.error('Failed to save file'),
  });


// Create new folder
export const useCreatePhpFolder = () =>
  useMutation({
    mutationFn: ({ id, path, folderName }) => 
      api.post(`/php/instances/${id}/folders/create`, { path, folderName }).then(r => r.data),
    onSuccess: (_, { id, path }) => {
      queryClient.invalidateQueries({ queryKey: ['php', 'files', id, path] });
      toast.success('Folder created successfully');
    },
    onError: () => toast.error('Failed to create folder'),
  });

// Delete file or folder
export const useDeletePhpItem = () =>
  useMutation({
    mutationFn: ({ id, path }) => 
      api.delete(`/php/instances/${id}/files`, { data: { path } }).then(r => r.data),
    onSuccess: (_, { id, path }) => {
      const parentPath = path.split('/').slice(0, -1).join('/');
      queryClient.invalidateQueries({ queryKey: ['php', 'files', id, parentPath] });
      toast.success('Deleted successfully');
    },
    onError: () => toast.error('Failed to delete'),
  });

// Rename file or folder
export const useRenamePhpItem = () =>
  useMutation({
    mutationFn: ({ id, path, newName }) => 
      api.put(`/php/instances/${id}/files/rename`, { path, newName }).then(r => r.data),
    onSuccess: (_, { id, path }) => {
      const parentPath = path.split('/').slice(0, -1).join('/');
      queryClient.invalidateQueries({ queryKey: ['php', 'files', id, parentPath] });
      toast.success('Renamed successfully');
    },
    onError: () => toast.error('Failed to rename'),
  });

// Upload file
export const useUploadPhpFile = () =>
  useMutation({
    mutationFn: ({ id, path, fileName, content }) => 
      api.post(`/php/instances/${id}/files/upload`, { path, fileName, content }).then(r => r.data),
    onSuccess: (_, { id, path }) => {
      queryClient.invalidateQueries({ queryKey: ['php', 'files', id, path] });
      toast.success('File uploaded successfully');
    },
    onError: () => toast.error('Failed to upload file'),
  });

// Download file

export const useDownloadPhpFile = () =>
  useMutation({
    mutationFn: async ({ id, path }) => {
      if (!path) {
        throw new Error('File path is required');
      }
      
    
      
      const response = await api.get(`/php/instances/${id}/files/download`, {
        params: { path: path },
        responseType: 'blob'
      });
      
      // Create download link
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      
      // Extract filename from path
      const fileName = path.split('/').pop();
      link.setAttribute('download', fileName);
      
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      
      return { success: true };
    },
    onSuccess: () => {
      toast.success('File downloaded successfully');
    },
    onError: (error) => {
      console.error('[Hook] Download error:', error);
      toast.error(error?.response?.data?.message || 'Failed to download file');
    },
  });

// Existing delete and suspend hooks
export const useDeletePhpInstance = () =>
  useMutation({
    mutationFn: (id) => api.delete(`/php/instances/${id}`).then(r => r.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['php', 'instances'] });
      toast.success('Instance deleted successfully');
    },
    onError: () => toast.error('Failed to delete instance'),
  });

export const useSuspendPhpInstance = () =>
  useMutation({
    mutationFn: (id) => api.post(`/php/instances/${id}/suspend`).then(r => r.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['php', 'instances'] });
      toast.success('Instance suspended successfully');
    },
    onError: () => toast.error('Failed to suspend instance'),
  });
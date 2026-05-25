import { useMutation, useQuery } from '@tanstack/react-query';
import { api } from '../services/api';
import { queryClient } from '../services/queryClient';
import toast from 'react-hot-toast';

export const useVpsPlans = (type = 'linux') =>
  useQuery({
    queryKey: ['vps', 'plans', type],
    queryFn: () => api.get(`/vps/plans?type=${type}`).then((r) => r.data?.data),
    staleTime: 1000 * 60 * 10,
  });

export const useOsTemplates = () =>
  useQuery({
    queryKey: ['vps', 'os-templates'],
    queryFn: () => api.get('/vps/os-templates').then((r) => r.data?.data),
    staleTime: 1000 * 60 * 30,
  });

export const useCalculatePrice = () =>
  useMutation({
    mutationFn: (data) => api.post('/vps/calculate-price', data).then((r) => r.data?.data),
  });



export const useCreateVpsOrder = () =>
  useMutation({
    mutationFn: async (data) => {
      console.log('🔍 useCreateVpsOrder received data:', data);
      
      //  Ensure payload has all required fields
      const payload = {
        planId: data.planId,
        os: data.os,
        tenureMonths: data.tenureMonths,
        hostname: data.hostname,
        rootPassword: data.rootPassword,
        userEmail: data.userEmail
      };
      
      console.log('Sending VPS order payload:', payload);
      
      const response = await api.post('/vps/order', payload);
      return response.data?.data;
    },
    onError: (error) => {
      console.error('Order error:', error);
      toast.error(error.response?.data?.message || 'Failed to create order');
    }
  });

  

export const useVerifyVpsPayment = () =>
  useMutation({
    mutationFn: (data) => api.post('/vps/verify-payment', data).then((r) => r.data?.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vps', 'instances'] });
      toast.success('Payment verified and VPS provisioned!');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Payment verification failed');
    }
  });

export const useVpsInstances = () =>
  useQuery({
    queryKey: ['vps', 'instances'],
    queryFn: () => api.get('/vps/instances').then((r) => r.data?.data),
    staleTime: 0,
  });

export const useVpsInstance = (id) =>
  useQuery({
    queryKey: ['vps', 'instance', id],
    queryFn: async () => {
      const response = await api.get(`/vps/instances/${id}`);
      return response.data?.data;
    },
    enabled: !!id,
    staleTime: 0,
  });

export const useVpsStats = (id) =>
  useQuery({
    queryKey: ['vps', 'stats', id],
    queryFn: () => api.get(`/vps/instances/${id}/stats`).then((r) => r.data?.data),
    enabled: !!id,
    staleTime: 0,
    refetchInterval: 30000,
  });

export const useStartVps = () =>
  useMutation({
    mutationFn: (id) => api.post(`/vps/instances/${id}/start`).then((r) => r.data),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ['vps', 'instance', id] });
      toast.success('VPS starting...');
    },
    onError: () => toast.error('Failed to start VPS'),
  });

export const useStopVps = () =>
  useMutation({
    mutationFn: (id) => api.post(`/vps/instances/${id}/stop`).then((r) => r.data),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ['vps', 'instance', id] });
      toast.success('VPS stopping...');
    },
    onError: () => toast.error('Failed to stop VPS'),
  });

export const useRebootVps = () =>
  useMutation({
    mutationFn: (id) => api.post(`/vps/instances/${id}/reboot`).then((r) => r.data),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ['vps', 'instance', id] });
      toast.success('VPS rebooting...');
    },
    onError: () => toast.error('Failed to reboot VPS'),
  });

export const useDeleteVps = () =>
  useMutation({
    mutationFn: (id) => api.delete(`/vps/instances/${id}`).then((r) => r.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vps', 'instances'] });
      toast.success('VPS deleted successfully');
    },
    onError: () => toast.error('Failed to delete VPS'),
  });


  export const useVpsStatus = (id) =>
  useQuery({
    queryKey: ['vps', 'status', id],
    queryFn: () => api.get(`/vps/instances/${id}/status`).then((r) => r.data?.data),
    enabled: !!id,
    staleTime: 0,
    // refetchInterval: 10000, // Check status every 10 seconds
  });


  export const usePoweroffVps = () =>
  useMutation({
    mutationFn: (id) => api.post(`/vps/instances/${id}/poweroff`).then((r) => r.data),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ['vps', 'instance', id] });
      queryClient.invalidateQueries({ queryKey: ['vps', 'status', id] });
      toast.success('VPS powered off...');
    },
    onError: () => toast.error('Failed to power off VPS'),
  });


export const useVpsMetrics = (id, refetchInterval = 5000) =>
  useQuery({
    queryKey: ['vps', 'metrics', id],
    queryFn: () => api.get(`/vps/instances/${id}/metrics`).then((r) => r.data?.data),
    enabled: !!id,
    refetchInterval: refetchInterval,
    staleTime: 0,
    retry: 2,
  });


  export const useChangeRootPassword = () =>
  useMutation({
    mutationFn: ({ id, currentPassword, newPassword }) => 
      api.post(`/vps/instances/${id}/change-password`, { currentPassword, newPassword }).then((r) => r.data?.data),
    onSuccess: () => {
      toast.success('Root password changed successfully!');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to change password');
    },
  });


export const useRebuildVps = () =>
  useMutation({
    mutationFn: ({ id, osId, newPassword, confirmPassword }) => 
      api.post(`/vps/instances/${id}/rebuild`, { osId, newPassword, confirmPassword }).then((r) => r.data?.data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['vps', 'instance', id] });
      queryClient.invalidateQueries({ queryKey: ['vps', 'status', id] });
      toast.success('VPS rebuild initiated! The server will be reinstalled with the new OS.');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to rebuild VPS');
    },
  });



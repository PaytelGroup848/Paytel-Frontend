import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '../services/api';
import toast from 'react-hot-toast';

// ==================== DOCKER INSTALLATION ====================

export const useInstallDocker = (instanceId) => {
  const queryClient = useQueryClient(); 
  
  return useMutation({
    mutationFn: () => api.post(`/vps/instances/${instanceId}/docker/install`).then(r => r.data?.data),
    onSuccess: (data) => {
      if (data.alreadyInstalled) {
        toast.success('Docker is already installed!');
      } else {
        toast.success('Docker installed successfully!');
      }
      queryClient.invalidateQueries({ queryKey: ['docker', 'status', instanceId] });
    },
    onError: (error) => {
      // toast.error(error.response?.data?.message || 'Failed to install Docker');
    },
  });
};

export const useDockerStatus = (instanceId) =>
  useQuery({
    queryKey: ['docker', 'status', instanceId],
    queryFn: () => api.get(`/vps/instances/${instanceId}/docker/status`).then(r => r.data?.data),
    enabled: !!instanceId,
    refetchOnWindowFocus: true,
  });

// ==================== DOCKER IMAGES ====================

export const usePullImage = (instanceId) => {
  const queryClient = useQueryClient(); 
  
  return useMutation({
    mutationFn: ({ imageName, imageTag = 'latest' }) => 
      api.post(`/vps/instances/${instanceId}/docker/images/pull`, { imageName, imageTag })
        .then(r => r.data?.data),
    onSuccess: () => {
      toast.success('Image pulled successfully!');
      queryClient.invalidateQueries({ queryKey: ['docker', 'images', instanceId] });
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to pull image');
    },
  });
};

export const useImages = (instanceId) =>
  useQuery({
    queryKey: ['docker', 'images', instanceId],
    queryFn: () => api.get(`/vps/instances/${instanceId}/docker/images`).then(r => r.data?.data || []),
    enabled: !!instanceId,
  });

// ==================== DOCKER CONTAINERS ====================

export const useContainers = (instanceId) =>
  useQuery({
    queryKey: ['docker', 'containers', instanceId],
    queryFn: () => api.get(`/vps/instances/${instanceId}/docker/containers`).then(r => r.data?.data || []),
    enabled: !!instanceId,
  });

export const useCreateContainer = (instanceId) => {
  const queryClient = useQueryClient(); 
  
  return useMutation({
    mutationFn: (containerData) => 
      api.post(`/vps/instances/${instanceId}/docker/containers`, containerData)
        .then(r => r.data?.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['docker', 'containers', instanceId] });
      toast.success('Container created successfully!');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to create container');
    },
  });
};

export const useContainerDetails = (containerId) =>
  useQuery({
    queryKey: ['docker', 'container', containerId],
    queryFn: () => api.get(`/vps/docker/containers/${containerId}`).then(r => r.data?.data),
    enabled: !!containerId,
  });

export const useStartContainer = (instanceId) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (containerId) => 
      api.post(`/vps/docker/containers/${containerId}/start`).then(r => r.data?.data),
    onSuccess: (_, containerId) => {
      queryClient.invalidateQueries({ queryKey: ['docker', 'containers', instanceId] });
      queryClient.invalidateQueries({ queryKey: ['docker', 'container', containerId] });
      toast.success('Container started!');
    },
    onError: (error) => {
      console.log("this is start error ", error);
      toast.error(error.response?.data?.message || 'Failed to start container');
    },
  });
};

export const useStopContainer = (instanceId) => {
  const queryClient = useQueryClient(); // ✅ Move here
  
  return useMutation({
    mutationFn: (containerId) => 
      api.post(`/vps/docker/containers/${containerId}/stop`).then(r => r.data?.data),
    onSuccess: (_, containerId) => {
      queryClient.invalidateQueries({ queryKey: ['docker', 'containers', instanceId] });
      queryClient.invalidateQueries({ queryKey: ['docker', 'container', containerId] });
      toast.success('Container stopped!');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to stop container');
    },
  });
};

export const useRestartContainer = (instanceId) => {
  const queryClient = useQueryClient(); // ✅ Move here
  
  return useMutation({
    mutationFn: (containerId) => 
      api.post(`/vps/docker/containers/${containerId}/restart`).then(r => r.data?.data),
    onSuccess: (_, containerId) => {
      queryClient.invalidateQueries({ queryKey: ['docker', 'containers', instanceId] });
      queryClient.invalidateQueries({ queryKey: ['docker', 'container', containerId] });
      toast.success('Container restarted!');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to restart container');
    },
  });
};

export const useRemoveContainer = (instanceId) => {
  const queryClient = useQueryClient(); // ✅ Move here
  
  return useMutation({
    mutationFn: (containerId) => 
      api.delete(`/vps/docker/containers/${containerId}`).then(r => r.data?.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['docker', 'containers', instanceId] });
      toast.success('Container removed!');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to remove container');
    },
  });
};

export const useContainerLogs = (containerId, lines = 100) =>
  useQuery({
    queryKey: ['docker', 'logs', containerId],
    queryFn: () => api.get(`/vps/docker/containers/${containerId}/logs?lines=${lines}`).then(r => r.data?.data),
    enabled: !!containerId,
  });

export const useContainerStats = (containerId) =>
  useQuery({
    queryKey: ['docker', 'stats', containerId],
    queryFn: () => api.get(`/vps/docker/containers/${containerId}/stats`).then(r => r.data?.data),
    enabled: !!containerId,
  });
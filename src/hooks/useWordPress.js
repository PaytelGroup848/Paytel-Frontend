import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { api } from "../services/api";
import { queryClient } from "../services/queryClient";

export const useInstances = (params = {}) =>
  useQuery({
    queryKey: ["wordpress", "instances", params],
    queryFn: async () => {
      const res = await api.get("/wordpress", { params });
      return { items: res.data?.data || [], meta: res.data?.meta || {} };
    },
    staleTime: 0,
  });

export const useInstance = (id, options = {}) =>
  useQuery({
    queryKey: ["wordpress", "instance", id],
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
      const res = await api.post("/wordpress", payload);
      return res.data?.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wordpress", "instances"] });
    },
    onError: () => toast.error("Failed to create WordPress instance"),
  });

export const useVerifyDNS = () =>
  useMutation({
    mutationFn: async ({ instanceId }) => {
      const res = await api.post("/wordpress/verify-dns", { instanceId });
      return res.data?.data;
    },
    onError: () => toast.error("DNS verification failed"),
  });

export const useResetPassword = () =>
  useMutation({
    mutationFn: ({ id, newPassword }) =>
      api
        .post(`/wordpress/${id}/reset-password`, { newPassword })
        .then((r) => r.data),
  });

export const useInstanceCredentials = (id, enabled) =>
  useQuery({
    queryKey: ["wordpress", "credentials", id],
    queryFn: () =>
      api.get(`/wordpress/${id}/credentials`).then((r) => r.data?.data),
    enabled: !!id && enabled,
    staleTime: 0,
  });

export const useGetFiles = (id, path = "") =>
  useQuery({
    queryKey: ["wordpress", "files", id, path],
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
      api
        .post(`/wordpress/${instanceId}/files/folder`, { name, path })
        .then((r) => r.data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["wordpress", "files", instanceId, variables.path],
      });
      toast.success("Folder created successfully!");
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || "Failed to create folder");
    },
  });
};

export const useCreateFile = (instanceId) => {
  return useMutation({
    mutationFn: ({ name, path }) =>
      api
        .post(`/wordpress/${instanceId}/files/create`, { name, path })
        .then((r) => r.data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["wordpress", "files", instanceId, variables.path],
      });
      toast.success("File created successfully!");
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || "Failed to create file");
    },
  });
};

export const useDeleteItem = (instanceId) => {
  return useMutation({
    mutationFn: ({ name, path }) =>
      api
        .delete(`/wordpress/${instanceId}/files/delete`, {
          data: { name, path },
        })
        .then((r) => r.data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["wordpress", "files", instanceId, variables.path],
      });
      toast.success("Deleted successfully!");
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || "Failed to delete");
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
      queryClient.invalidateQueries({ queryKey: ["wordpress", "instances"] });
      toast.success("Instance deleted");
    },
    onError: () => toast.error("Failed to delete instance"),
  });

export const useDbTables = (id) =>
  useQuery({
    queryKey: ["wordpress", "db-tables", id],
    queryFn: () =>
      api.get(`/wordpress/${id}/db-tables`).then((r) => r.data?.data),
    enabled: !!id,
    staleTime: 0,
  });

export const useDbCredentials = (id, enabled) =>
  useQuery({
    queryKey: ["wordpress", "db-credentials", id],
    queryFn: () =>
      api.get(`/wordpress/${id}/db-credentials`).then((r) => r.data?.data),
    enabled: !!id && enabled,
    staleTime: 0,
  });

export const useAnalytics = (id, page = 1) =>
  useQuery({
    queryKey: ["wordpress", "analytics", id, page],
    queryFn: () =>
      api
        .get(`/wordpress/${id}/analytics?page=${page}`)
        .then((r) => r.data?.data),
    enabled: !!id,
    staleTime: 0,
  });

export const useBackups = (id) =>
  useQuery({
    queryKey: ["wordpress", "backups", id],
    queryFn: () =>
      api.get(`/wordpress/${id}/backups`).then((r) => r.data?.data),
    enabled: !!id,
    staleTime: 0,
  });

export const downloadBackupPdf = async (id, domain) => {
  const response = await api.get(`/wordpress/${id}/backups/download-pdf`, {
    responseType: "blob",
  });
  const url = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute(
    "download",
    `backup-report-${domain}-${new Date().toISOString().slice(0, 10)}.pdf`,
  );
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(url);
};

export const downloadBackupZip = async (instanceId, backupName) => {
  const toastId = toast.loading(
    "Downloading backup... Large folders may take 1-2 minutes.",
  );
  try {
    const response = await api.get(
      `/wordpress/${instanceId}/backups/${backupName}/download-zip`,
      {
        responseType: "blob",
        timeout: 600000, // 10 minutes
      },
    );

    toast.dismiss(toastId);

    const blob = new Blob([response.data], {
      type: "application/gzip",
    });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${backupName}.tar.gz`);
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);

    toast.success("Download complete!");
  } catch (err) {
    toast.dismiss(toastId);
    throw err;
  }
};

export const useUploadZip = (instanceId) =>
  useMutation({
    mutationFn: (formData) =>
      api
        .post(`/wordpress/${instanceId}/files/upload-archive`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
          timeout: 30000,
        })
        .then((r) => r.data),
    onSuccess: (_, variables) => {
      const path = variables.get("path") || "";
      toast.success("Archive uploaded! Extraction in progress...");
      setTimeout(() => {
        queryClient.invalidateQueries({
          queryKey: ["wordpress", "files", instanceId, path],
        });
      }, 5000);
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || "Failed to upload archive");
    },
  });

export const useGetFileContent = (instanceId, filePath) =>
  useQuery({
    queryKey: ["wordpress", "file-content", instanceId, filePath],
    queryFn: async () => {
      if (!filePath) {
        console.log("[useGetFileContent] No filePath provided, skipping");
        return null;
      }
      console.log("[useGetFileContent] Fetching content for:", filePath);
      const res = await api.get(`/wordpress/${instanceId}/files/content`, {
        params: { path: filePath },
      });
      return res.data?.data;
    },
    enabled: !!instanceId && !!filePath, // Only run when filePath exists
    staleTime: 0,
  });

export const useSaveFileContent = (instanceId) =>
  useMutation({
    mutationFn: ({ filePath, content }) =>
      api
        .post(`/wordpress/${instanceId}/files/content`, {
          path: filePath,
          content,
        })
        .then((r) => r.data),
    onSuccess: (_, { filePath }) => {
      queryClient.invalidateQueries({
        queryKey: ["wordpress", "file-content", instanceId, filePath],
      });
      queryClient.invalidateQueries({
        queryKey: ["wordpress", "files", instanceId],
      });
      toast.success("File saved successfully");
    },
    onError: () => toast.error("Failed to save file"),
  });

// Rename file or folder
export const useRenameItem = (instanceId) =>
  useMutation({
    mutationFn: ({ oldPath, newName, isFolder = false }) =>
      api
        .put(`/wordpress/${instanceId}/files/rename`, {
          oldPath,
          newName,
          isFolder,
        })
        .then((r) => r.data),
    onSuccess: (_, variables) => {
      const parentPath = variables.oldPath.split("/").slice(0, -1).join("/");
      queryClient.invalidateQueries({
        queryKey: ["wordpress", "files", instanceId, parentPath],
      });
      toast.success("Renamed successfully");
    },
    onError: () => toast.error("Failed to rename"),
  });

// Upload single file
export const useUploadFile = (instanceId) =>
  useMutation({
    mutationFn: async ({ file, path }) => {
      console.log("[useUploadFile] File received:", file);
      console.log("[useUploadFile] File type:", typeof file);
      console.log("[useUploadFile] File name:", file?.name);

      if (!file || !(file instanceof File)) {
        console.error("[useUploadFile] Invalid file object");
        throw new Error("Invalid file. Please select a valid file.");
      }

      const formData = new FormData();
      formData.append("file", file, file.name); // Add filename as third parameter
      if (path) formData.append("path", path);

      // Log FormData contents
      for (let pair of formData.entries()) {
        console.log(
          "FormData entry:",
          pair[0],
          pair[1] instanceof File ? `File: ${pair[1].name}` : pair[1],
        );
      }

      const response = await api.post(
        `/wordpress/${instanceId}/files/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );
      return response.data;
    },
    onSuccess: (_, { path }) => {
      queryClient.invalidateQueries({
        queryKey: ["wordpress", "files", instanceId, path],
      });
      toast.success("File uploaded successfully");
    },
    onError: (error) => {
      console.error("[useUploadFile] Error:", error);
      toast.error(error?.response?.data?.message || "Failed to upload file");
    },
  });

export const useMoveItem = (instanceId) =>
  useMutation({
    mutationFn: ({ sourcePath, destinationPath, isFolder = false }) =>
      api
        .put(`/wordpress/${instanceId}/files/move`, {
          sourcePath,
          destinationPath,
          isFolder,
        })
        .then((r) => r.data),
    onSuccess: (_, { sourcePath, destinationPath }) => {
      // Invalidate both source and destination paths
      const sourceParent = sourcePath.split("/").slice(0, -1).join("/");
      const destParent = destinationPath.split("/").slice(0, -1).join("/");
      queryClient.invalidateQueries({
        queryKey: ["wordpress", "files", instanceId, sourceParent],
      });
      queryClient.invalidateQueries({
        queryKey: ["wordpress", "files", instanceId, destParent],
      });
      toast.success("Item moved successfully");
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || "Failed to move item");
    },
  });

export const useDownloadFile = (instanceId) =>
  useMutation({
    mutationFn: async ({ filePath }) => {
      const response = await api.get(
        `/wordpress/${instanceId}/files/download`,
        {
          params: { path: filePath },
          responseType: "blob",
        },
      );
      return response.data;
    },
    onSuccess: (data, { filePath }) => {
      const fileName = filePath.split("/").pop();
      const url = window.URL.createObjectURL(new Blob([data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      toast.success("File downloaded successfully");
    },
    onError: () => toast.error("Failed to download file"),
  });

export const useDownloadFolder = (instanceId) =>
  useMutation({
    mutationFn: async ({ folderPath }) => {
      const response = await api.get(
        `/wordpress/${instanceId}/folders/download`,
        {
          params: { path: folderPath },
          responseType: "blob",
          timeout: 300000,
        },
      );
      return response.data;
    },
    onSuccess: (data, { folderPath }) => {
      const folderName = folderPath.split("/").pop();
      const fileName = `${folderName}.zip`;
      const url = window.URL.createObjectURL(new Blob([data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      toast.success("Folder downloaded successfully");
    },
    onError: () => toast.error("Failed to download folder"),
  });

export const useDownloadHtdocs = (instanceId) =>
  useMutation({
    mutationFn: async (domain) => {
      const response = await api.get(
        `/wordpress/${instanceId}/htdocs/download`,
        {
          responseType: "blob",
          timeout: 600000,
        },
      );
      return { data: response.data, domain };
    },
    onSuccess: (result) => {
      const fileName = `${result.domain || "website"}.zip`;
      const url = window.URL.createObjectURL(new Blob([result.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      toast.success("Website downloaded successfully");
    },
    onError: () => toast.error("Failed to download website"),
  });

export const useDropAllTables = (instanceId) =>
  useMutation({
    mutationFn: async () => {
      const response = await api.delete(`/wordpress/${instanceId}/tables/drop`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["wordpress", "instance", instanceId],
      });
      toast.success("All WordPress tables dropped successfully!");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Failed to drop tables");
    },
  });

export const useSslStatus = (instanceId) =>
  useQuery({
    queryKey: ["wordpress", "ssl", "status", instanceId],
    queryFn: async () => {
      const response = await api.get(`/wordpress/${instanceId}/ssl/status`);
      return response.data?.data;
    },
    enabled: !!instanceId,
    staleTime: 60000, // 1 minute
  });

export const useInstallSsl = (instanceId) =>
  useMutation({
    mutationFn: async () => {
      const response = await api.post(`/wordpress/${instanceId}/ssl/install`);
      return response.data?.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["wordpress", "ssl", "status", instanceId],
      });
      toast.success("SSL installed successfully!");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Failed to install SSL");
    },
  });

import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  FaDatabase, FaPlusCircle, FaUndoAlt, FaSpinner, 
  FaClock, FaHdd, FaFileArchive, FaCloudUploadAlt
} from 'react-icons/fa';
import toast from 'react-hot-toast';
import { api } from '../../../services/api';


// API functions
const fetchBackups = (id) => api.get(`/vps/instances/${id}/backups`).then(r => r.data?.data?.backups || []);
const startBackup = (id) => api.post(`/vps/instances/${id}/backups/start`);
const restoreBackup = (id, backupId) => api.post(`/vps/instances/${id}/backups/restore`, { backupId });

function SnapShot() {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const [creating, setCreating] = useState(false);

  // Query for backups
  const { data: backups = [], isLoading, refetch } = useQuery({
    queryKey: ['vps', 'backups', id],
    queryFn: () => fetchBackups(id),
    enabled: !!id,
  });

  // Start Backup Mutation
  const startBackupMutation = useMutation({
    mutationFn: () => startBackup(id),
    onSuccess: () => {
      toast.success('Backup started!');
      refetch();
      setCreating(false);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to start backup');
      setCreating(false);
    },
  });

  // Restore Backup Mutation
  const restoreBackupMutation = useMutation({
    mutationFn: (backupId) => restoreBackup(id, backupId),
    onSuccess: () => {
      toast.success('Restore started! VPS will be restored within 24hours.');
      refetch();
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to restore backup');
    },
  });

  const handleStartBackup = () => {
    setCreating(true);
    startBackupMutation.mutate();
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return 'N/A';
    const date = new Date(dateStr);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };

  return (
    <div className="min-h-screen bg-[#f0f2f8] font-sans antialiased">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
              <FaDatabase className="text-indigo-500" />
              Backups
            </h1>
            <p className="text-slate-500 text-sm">Create and manage VPS backups</p>
          </div>
          <button
            onClick={handleStartBackup}
            disabled={creating}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-semibold disabled:opacity-50"
          >
            {creating ? <FaSpinner className="animate-spin" /> : <FaCloudUploadAlt />}
            Create Backup
          </button>
        </div>

        {/* Backups List */}
        {isLoading ? (
          <div className="text-center py-8">
            <FaSpinner className="animate-spin text-indigo-500 text-2xl mx-auto" />
          </div>
        ) : backups.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg border border-slate-200">
            <FaFileArchive className="text-4xl text-slate-300 mx-auto mb-2" />
            <p className="text-slate-500">No backups found</p>
            <p className="text-slate-400 text-sm">Click "Create Backup" to start your first backup</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-500">Filename</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-500">Created</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-500">Size</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-500">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-500">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {backups.map((backup) => (
                  <tr key={backup.backupid} className="hover:bg-slate-50">
                    <td className="px-4 py-3 text-sm text-slate-700">{backup.filename}</td>
                    <td className="px-4 py-3 text-sm text-slate-600">{formatDate(backup.date)}</td>
                    <td className="px-4 py-3 text-sm text-slate-600">{backup.size_str}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        backup.status === 'completed' ? 'bg-green-100 text-green-700' :
                        backup.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-blue-100 text-blue-700'
                      }`}>
                        {backup.status || 'completed'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => {
                          if (confirm(`Restore from ${backup.filename}? This will restart your VPS.`)) {
                            restoreBackupMutation.mutate(backup.backupid);
                          }
                        }}
                        disabled={restoreBackupMutation.isPending}
                        className="text-indigo-600 hover:text-indigo-800"
                      >
                        <FaUndoAlt size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default SnapShot;
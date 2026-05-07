import { useState } from 'react';
import { 
  FaPlay, FaStop, FaRedo, FaTrash, FaTerminal, FaChartLine,
  FaDocker, FaSpinner, FaCircle
} from 'react-icons/fa';
import {
  useStartContainer,
  useStopContainer,
  useRestartContainer,
  useRemoveContainer,
  useContainerStats
} from '../../hooks/useDocker';

const statusColors = {
  running: 'bg-green-500',
  stopped: 'bg-red-500',
  restarting: 'bg-yellow-500',
  exited: 'bg-gray-500',
  creating: 'bg-blue-500',
};

export default function ContainerCard({ container, instanceId, onViewLogs, onViewStats }) {
  const [actionLoading, setActionLoading] = useState(null);
  const startContainer = useStartContainer(instanceId);
  const stopContainer = useStopContainer(instanceId);
  const restartContainer = useRestartContainer(instanceId);
  const removeContainer = useRemoveContainer(instanceId);
  const { data: stats } = useContainerStats(container.containerId);

  const handleAction = async (action, mutation) => {
    setActionLoading(action);
    await mutation.mutateAsync(container.containerId);
    setActionLoading(null);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4 hover:shadow-md transition-all">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center">
            <FaDocker className="text-indigo-600" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-800">{container.containerName}</h3>
            <p className="text-xs text-slate-500 font-mono">
              {container.imageName}:{container.imageTag}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${statusColors[container.status] || 'bg-gray-500'}`} />
          <span className="text-xs text-slate-500 capitalize">{container.status}</span>
        </div>
      </div>

      {/* Ports */}
      {container.ports?.length > 0 && (
        <div className="mb-3">
          <p className="text-xs text-slate-500 mb-1">Ports</p>
          <div className="flex flex-wrap gap-2">
            {container.ports.map((port, idx) => (
              <span key={idx} className="text-xs bg-slate-100 px-2 py-1 rounded font-mono">
                {port.hostPort} → {port.containerPort}/{port.protocol}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Stats Preview */}
      {stats && container.status === 'running' && (
        <div className="mb-3 grid grid-cols-2 gap-2 text-xs">
          <div className="bg-slate-50 rounded p-2">
            <span className="text-slate-500">CPU</span>
            <span className="block font-semibold text-slate-700">{stats.cpu?.toFixed(1)}%</span>
          </div>
          <div className="bg-slate-50 rounded p-2">
            <span className="text-slate-500">Memory</span>
            <span className="block font-semibold text-slate-700">
              {stats.memory?.percentage?.toFixed(1)}%
            </span>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-2 pt-2 border-t border-slate-100">
        {container.status === 'stopped' && (
          <button
            onClick={() => handleAction('start', startContainer)}
            disabled={actionLoading === 'start'}
            className="flex-1 px-3 py-1.5 bg-green-50 text-green-700 rounded-lg text-sm font-medium hover:bg-green-100 flex items-center justify-center gap-1"
          >
            {actionLoading === 'start' ? <FaSpinner className="animate-spin" /> : <FaPlay size={12} />}
            Start
          </button>
        )}
        {container.status === 'running' && (
          <>
            <button
              onClick={() => handleAction('stop', stopContainer)}
              disabled={actionLoading === 'stop'}
              className="flex-1 px-3 py-1.5 bg-red-50 text-red-700 rounded-lg text-sm font-medium hover:bg-red-100 flex items-center justify-center gap-1"
            >
              {actionLoading === 'stop' ? <FaSpinner className="animate-spin" /> : <FaStop size={12} />}
              Stop
            </button>
            <button
              onClick={() => handleAction('restart', restartContainer)}
              disabled={actionLoading === 'restart'}
              className="flex-1 px-3 py-1.5 bg-yellow-50 text-yellow-700 rounded-lg text-sm font-medium hover:bg-yellow-100 flex items-center justify-center gap-1"
            >
              {actionLoading === 'restart' ? <FaSpinner className="animate-spin" /> : <FaRedo size={12} />}
              Restart
            </button>
          </>
        )}
        <button
          onClick={() => onViewLogs(container)}
          className="px-3 py-1.5 bg-slate-100 text-slate-600 rounded-lg text-sm font-medium hover:bg-slate-200 flex items-center justify-center gap-1"
        >
          <FaTerminal size={12} /> Logs
        </button>
        <button
          onClick={() => onViewStats(container)}
          className="px-3 py-1.5 bg-slate-100 text-slate-600 rounded-lg text-sm font-medium hover:bg-slate-200 flex items-center justify-center gap-1"
        >
          <FaChartLine size={12} /> Stats
        </button>
        <button
          onClick={() => {
            if (confirm(`Remove container ${container.containerName}?`)) {
              handleAction('remove', removeContainer);
            }
          }}
          disabled={actionLoading === 'remove'}
          className="px-3 py-1.5 bg-red-50 text-red-600 rounded-lg text-sm font-medium hover:bg-red-100 flex items-center justify-center gap-1"
        >
          {actionLoading === 'remove' ? <FaSpinner className="animate-spin" /> : <FaTrash size={12} />}
        </button>
      </div>
    </div>
  );
}
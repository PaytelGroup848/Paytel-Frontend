import { FaChartLine, FaTimes, FaMicrochip, FaMemory, FaNetworkWired, FaHdd } from 'react-icons/fa';
import { useContainerStats } from '../../hooks/useDocker';

export default function ContainerStats({ container, isOpen, onClose }) {
  const { data: stats, isLoading } = useContainerStats(container?.containerId);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-full max-w-md">
        <div className="flex justify-between items-center px-6 py-4 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <FaChartLine className="text-indigo-600" />
            <span className="font-semibold">{container?.containerName} - Stats</span>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <FaTimes />
          </button>
        </div>
        <div className="p-6 space-y-4">
          {isLoading ? (
            <div className="text-center py-8">Loading stats...</div>
          ) : stats ? (
            <>
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <FaMicrochip className="text-indigo-500" />
                  <span className="text-slate-600">CPU Usage</span>
                </div>
                <span className="font-semibold text-slate-800">{stats.cpu?.toFixed(2)}%</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <FaMemory className="text-indigo-500" />
                  <span className="text-slate-600">Memory Usage</span>
                </div>
                <span className="font-semibold text-slate-800">
                  {stats.memory?.percentage?.toFixed(2)}% ({stats.memory?.used} / {stats.memory?.limit})
                </span>
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <FaNetworkWired className="text-indigo-500" />
                  <span className="text-slate-600">Network</span>
                </div>
                <span className="font-semibold text-slate-800 text-sm">{stats.network}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <FaHdd className="text-indigo-500" />
                  <span className="text-slate-600">Block I/O</span>
                </div>
                <span className="font-semibold text-slate-800 text-sm">{stats.blockIO}</span>
              </div>
            </>
          ) : (
            <div className="text-center py-8 text-slate-500">No stats available</div>
          )}
        </div>
      </div>
    </div>
  );
}
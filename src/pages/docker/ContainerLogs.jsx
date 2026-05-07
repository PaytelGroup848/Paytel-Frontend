import { FaSpinner, FaTerminal, FaTimes } from 'react-icons/fa';
import { useContainerLogs } from '../../hooks/useDocker';

export default function ContainerLogs({ container, isOpen, onClose }) {
  const { data: logs, isLoading } = useContainerLogs(container?.containerId);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-gray-900 rounded-xl w-full max-w-3xl max-h-[80vh] flex flex-col">
        <div className="flex justify-between items-center px-4 py-3 border-b border-gray-700">
          <div className="flex items-center gap-2">
            <FaTerminal className="text-green-400" />
            <span className="text-white font-mono text-sm">{container?.containerName} - Logs</span>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <FaTimes />
          </button>
        </div>
        <div className="flex-1 overflow-auto p-4">
          {isLoading ? (
            <div className="flex justify-center py-8">
              <FaSpinner className="animate-spin text-gray-400 text-2xl" />
            </div>
          ) : (
            <pre className="text-xs text-green-400 font-mono whitespace-pre-wrap">
              {logs?.logs || 'No logs available'}
            </pre>
          )}
        </div>
      </div>
    </div>
  );
}
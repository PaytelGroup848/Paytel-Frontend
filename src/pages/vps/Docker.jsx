// frontend/src/pages/vps/Docker.jsx
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { 
  FaDocker, FaPlus, FaSpinner, FaServer, FaCheckCircle,
  FaPlay, FaStop, FaRedo, FaTrash, FaTerminal,
  FaCopy, FaDownload
} from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import DockerCatalog from "../../pages/docker/DockerCatalog";
import { ArrowLeft, ArrowRight, X } from 'lucide-react';
import {
  useDockerStatus,
  useInstallDocker,
  useContainers,
  useStartContainer,
  useStopContainer,
  useRestartContainer,
  useRemoveContainer,
  useCreateContainer,
  useContainerLogs
} from '../../hooks/useDocker';
import { useVpsInstances } from '../../hooks/useVps';

export default function Docker() {
  const { id } = useParams();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [activeTab, setActiveTab] = useState('containers');
  const [installing, setInstalling] = useState(false);
  
  // Logs modal states
  const [showLogsModal, setShowLogsModal] = useState(false);
  const [selectedContainer, setSelectedContainer] = useState(null);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [logLines, setLogLines] = useState(200);

  // Form state
  const [formData, setFormData] = useState({
    containerName: '',
    imageName: 'nginx',
    imageTag: 'latest',
    ports: [{ hostPort: '', containerPort: '', protocol: 'tcp' }],
    env: [{ key: '', value: '' }],
    restartPolicy: 'no',
    cpuLimit: '',
    memoryLimit: '',
  });

  // Hooks
  const { data: dockerStatus, refetch: refetchDockerStatus } = useDockerStatus(id);
  const { data: containers = [], refetch: refetchContainers, isLoading: loading } = useContainers(id);
  const { data: logsData, refetch: refetchLogs, isLoading: loadingLogs } = useContainerLogs(selectedContainer?.containerId, logLines);
  const { data: instances, isLoading } = useVpsInstances();
  
  const installDocker = useInstallDocker(id);
  const createContainer = useCreateContainer(id);
  const startContainer = useStartContainer(id);
  const stopContainer = useStopContainer(id);
  const restartContainer = useRestartContainer(id);
  const removeContainer = useRemoveContainer(id);

  // Auto-refresh containers
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     refetchContainers();
  //   }, 15000);
  //   return () => clearInterval(interval);
  // }, [id, refetchContainers]);

  // Auto-refresh logs
  useEffect(() => {
    let interval;
    if (showLogsModal && autoRefresh && selectedContainer) {
      interval = setInterval(() => {
        refetchLogs();
      }, 10000);
    }
    return () => clearInterval(interval);
  }, [showLogsModal, autoRefresh, selectedContainer, refetchLogs]);

  const handleInstallDocker = async () => {
    setInstalling(true);
    await installDocker.mutateAsync();
    await refetchDockerStatus();
    setInstalling(false);
  };

  const handleCreateContainer = async (e) => {
    e.preventDefault();
    
    const cleanedPorts = formData.ports.filter(p => p.hostPort && p.containerPort);
    const cleanedEnv = {};
    formData.env.forEach(env => {
      if (env.key && env.key.trim() && env.value && env.value.trim()) {
        cleanedEnv[env.key.trim()] = env.value.trim();
      }
    });
    
    const payload = {
      containerName: formData.containerName,
      imageName: formData.imageName,
      imageTag: formData.imageTag,
      ports: cleanedPorts,
      env: cleanedEnv,
      restartPolicy: formData.restartPolicy,
      cpuLimit: formData.cpuLimit ? parseFloat(formData.cpuLimit) : null,
      memoryLimit: formData.memoryLimit ? parseInt(formData.memoryLimit) : null,
    };
    
    await createContainer.mutateAsync(payload);
    setShowCreateModal(false);
    refetchContainers();
    setFormData({
      containerName: '',
      imageName: 'nginx',
      imageTag: 'latest',
      ports: [{ hostPort: '', containerPort: '', protocol: 'tcp' }],
      env: [{ key: '', value: '' }],
      restartPolicy: 'no',
      cpuLimit: '',
      memoryLimit: '',
    });
  };

  const handleStartContainer = (containerId) => {
    startContainer.mutate(containerId);
  };

  const handleStopContainer = (containerId) => {
    stopContainer.mutate(containerId);
  };

  const handleRestartContainer = (containerId) => {
    restartContainer.mutate(containerId);
  };

  const handleRemoveContainer = (containerId, containerName) => {
    if (confirm(`Remove container "${containerName}" permanently?`)) {
      removeContainer.mutate(containerId);
    }
  };

  const handleViewLogs = (container) => {
    setSelectedContainer(container);
    setShowLogsModal(true);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'running': return 'bg-green-500';
      case 'stopped': return 'bg-red-500';
      case 'restarting': return 'bg-yellow-500';
      default: return 'bg-gray-400';
    }
  };

  // Show install button if Docker not installed
  if (dockerStatus && !dockerStatus.installed) {
    return (
      <div className="min-h-screen bg-slate-50 py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="bg-white rounded-xl border border-slate-200 p-8 text-center">
            <FaDocker className="text-5xl text-indigo-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Docker is not installed</h2>
            <p className="text-slate-500 mb-6">Install Docker on your VPS to run containers</p>
            <button
              onClick={handleInstallDocker}
              disabled={installing || installDocker.isPending}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 mx-auto disabled:opacity-50"
            >
              {(installing || installDocker.isPending) ? <FaSpinner className="animate-spin" /> : <FaDocker />}
              Install Docker
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Show loading while checking status
  if (!dockerStatus) {
    return (
      <div className="min-h-screen bg-slate-50 py-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <FaSpinner className="animate-spin text-indigo-500 text-3xl mx-auto" />
          <p className="text-slate-500 mt-2">Checking Docker status...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <Link
  to={`/vps/paid/${instances?.[0]?.id}`}
  className="
    inline-flex items-center gap-2 mb-5
    px-4 py-2.5
    rounded-xl
    bg-white/80 backdrop-blur-md
    border border-gray-200
    text-gray-700 font-medium text-sm
    shadow-sm
    transition-all duration-200
    hover:bg-white hover:shadow-md hover:-translate-y-0.5
    active:scale-95
  "
>
  <ArrowLeft size={18} />
  <span>Back</span>
</Link>
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
              <FaDocker className="text-indigo-600" />
              Docker Containers
            </h1>
            <p className="text-slate-500 text-sm">Run and manage Docker containers on your VPS</p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium"
          >
            <FaPlus size={14} />
            Create Container
          </button>
        </div>

        {/* Docker Status */}
        <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-3 flex items-center gap-3">
          <FaCheckCircle className="text-green-500" />
          <div>
            <span className="font-medium text-green-800">Docker is installed</span>
            <span className="text-green-600 text-sm ml-2">{dockerStatus?.version}</span>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-slate-200">
          <button
            onClick={() => setActiveTab('containers')}
            className={`px-4 py-2 font-medium transition-all ${
              activeTab === 'containers'
                ? 'text-indigo-600 border-b-2 border-indigo-600'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            My Containers ({containers.length})
          </button>
          <button
            onClick={() => setActiveTab('catalog')}
            className={`px-4 py-2 font-medium transition-all ${
              activeTab === 'catalog'
                ? 'text-indigo-600 border-b-2 border-indigo-600'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            App Catalog
          </button>
        </div>

        {/* Containers Tab */}
        {activeTab === 'containers' && (
          <>
            {loading ? (
              <div className="flex justify-center py-12">
                <FaSpinner className="animate-spin text-indigo-500 text-3xl" />
              </div>
            ) : containers.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-xl border border-slate-200">
                <FaServer className="text-4xl text-slate-300 mx-auto mb-3" />
                <p className="text-slate-500">No containers found</p>
                <p className="text-slate-400 text-sm">Click "Create Container" to start your first container</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {containers.map((container) => (
                  <div key={container.containerId} className="bg-white rounded-xl border border-slate-200 p-4 hover:shadow-md transition-all">
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
                        <div className={`w-2 h-2 rounded-full ${getStatusColor(container.status)}`} />
                        <span className="text-xs text-slate-500 capitalize">{container.status}</span>
                      </div>
                    </div>

                    {container.ports?.length > 0 && (
                      <div className="mb-3">
                        <p className="text-xs text-slate-500 mb-1">Ports</p>
                        <div className="flex flex-wrap gap-2">
                          {container.ports.map((port, idx) => (
                            <span key={idx} className="text-xs bg-slate-100 px-2 py-1 rounded font-mono">
                              {port.hostPort} → {port.containerPort}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="flex gap-2 pt-2 border-t border-slate-100">
                      {container.status === 'stopped' && (
                        <button
                          onClick={() => handleStartContainer(container.containerId)}
                          disabled={startContainer.isPending}
                          className="flex-1 px-3 py-1.5 bg-green-50 text-green-700 rounded-lg text-sm font-medium hover:bg-green-100 flex items-center justify-center gap-1 disabled:opacity-50"
                        >
                          {startContainer.isPending ? <FaSpinner className="animate-spin" /> : <FaPlay size={12} />}
                          Start
                        </button>
                      )}
                      {container.status === 'running' && (
                        <>
                          <button
                            onClick={() => handleStopContainer(container.containerId)}
                            disabled={stopContainer.isPending}
                            className="flex-1 px-3 py-1.5 bg-red-50 text-red-700 rounded-lg text-sm font-medium hover:bg-red-100 flex items-center justify-center gap-1 disabled:opacity-50"
                          >
                            {stopContainer.isPending ? <FaSpinner className="animate-spin" /> : <FaStop size={12} />}
                            Stop
                          </button>
                          <button
                            onClick={() => handleRestartContainer(container.containerId)}
                            disabled={restartContainer.isPending}
                            className="flex-1 px-3 py-1.5 bg-yellow-50 text-yellow-700 rounded-lg text-sm font-medium hover:bg-yellow-100 flex items-center justify-center gap-1 disabled:opacity-50"
                          >
                            {restartContainer.isPending ? <FaSpinner className="animate-spin" /> : <FaRedo size={12} />}
                            Restart
                          </button>
                        </>
                      )}
                      <button
                        onClick={() => handleViewLogs(container)}
                        className="px-3 py-1.5 bg-slate-100 text-slate-600 rounded-lg text-sm font-medium hover:bg-slate-200 flex items-center justify-center gap-1"
                      >
                        <FaTerminal size={12} /> Logs
                      </button>
                      <button
                        onClick={() => handleRemoveContainer(container.containerId, container.containerName)}
                        disabled={removeContainer.isPending}
                        className="px-3 py-1.5 bg-red-50 text-red-600 rounded-lg text-sm font-medium hover:bg-red-100 disabled:opacity-50"
                      >
                        {removeContainer.isPending ? <FaSpinner className="animate-spin" /> : <FaTrash size={12} />}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* Catalog Tab */}
        {activeTab === 'catalog' && (
          <DockerCatalog instanceId={id} onContainerCreated={refetchContainers} />
        )}

        {/* Create Container Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <FaDocker className="text-indigo-600" />
                  Create Container
                </h2>
                <button onClick={() => setShowCreateModal(false)} className="text-slate-400 hover:text-slate-600">
                  <X/>
                </button>
              </div>

              <form onSubmit={handleCreateContainer} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Container Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.containerName}
                    onChange={(e) => setFormData({ ...formData, containerName: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                    placeholder="my-container"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Docker Image *</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      required
                      value={formData.imageName}
                      onChange={(e) => setFormData({ ...formData, imageName: e.target.value })}
                      className="flex-1 px-3 py-2 border border-slate-300 rounded-lg"
                      placeholder="nginx"
                    />
                    <input
                      type="text"
                      value={formData.imageTag}
                      onChange={(e) => setFormData({ ...formData, imageTag: e.target.value })}
                      className="w-32 px-3 py-2 border border-slate-300 rounded-lg"
                      placeholder="latest"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Port Mapping</label>
                  {formData.ports.map((port, idx) => (
                    <div key={idx} className="flex gap-2 mb-2">
                      <input
                        type="number"
                        placeholder="Host Port"
                        value={port.hostPort}
                        onChange={(e) => {
                          const newPorts = [...formData.ports];
                          newPorts[idx].hostPort = e.target.value;
                          setFormData({ ...formData, ports: newPorts });
                        }}
                        className="flex-1 px-3 py-2 border border-slate-300 rounded-lg"
                      />
                      <span className="py-2">→</span>
                      <input
                        type="number"
                        placeholder="Container Port"
                        value={port.containerPort}
                        onChange={(e) => {
                          const newPorts = [...formData.ports];
                          newPorts[idx].containerPort = e.target.value;
                          setFormData({ ...formData, ports: newPorts });
                        }}
                        className="flex-1 px-3 py-2 border border-slate-300 rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, ports: formData.ports.filter((_, i) => i !== idx) })}
                        className="text-red-500 px-2"
                      >
                        <X/>
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, ports: [...formData.ports, { hostPort: '', containerPort: '', protocol: 'tcp' }] })}
                    className="text-indigo-600 text-sm"
                  >
                    + Add Port
                  </button>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Restart Policy</label>
                  <select
                    value={formData.restartPolicy}
                    onChange={(e) => setFormData({ ...formData, restartPolicy: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                  >
                    <option value="no">No</option>
                    <option value="always">Always</option>
                    <option value="on-failure">On Failure</option>
                  </select>
                </div>

                <div className="flex gap-3 pt-4">
                  <button type="button" onClick={() => setShowCreateModal(false)} className="flex-1 px-4 py-2 border border-slate-300 rounded-lg">
                    Cancel
                  </button>
                  <button type="submit" disabled={createContainer.isPending} className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 disabled:opacity-50">
                    {createContainer.isPending && <FaSpinner className="animate-spin" />}
                    Create Container
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Logs Modal */}
        {showLogsModal && selectedContainer && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
            <div className="bg-gray-900 rounded-xl w-full max-w-5xl max-h-[85vh] flex flex-col shadow-2xl">
              <div className="flex justify-between items-center px-6 py-4 border-b border-gray-700">
                <div className="flex items-center gap-3">
                  <FaTerminal className="text-green-400 text-xl" />
                  <div>
                    <h3 className="text-white font-semibold">{selectedContainer.containerName}</h3>
                    <p className="text-gray-400 text-xs font-mono">{selectedContainer.imageName}:{selectedContainer.imageTag}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <select
                    value={logLines}
                    onChange={(e) => {
                      setLogLines(parseInt(e.target.value));
                    }}
                    className="bg-gray-800 text-gray-300 text-sm px-2 py-1 rounded border border-gray-600"
                  >
                    <option value={50}>50 lines</option>
                    <option value={100}>100 lines</option>
                    <option value={200}>200 lines</option>
                    <option value={500}>500 lines</option>
                    <option value={1000}>1000 lines</option>
                  </select>
                  
                  <button
                    onClick={() => setAutoRefresh(!autoRefresh)}
                    className={`px-2 py-1 rounded text-sm ${autoRefresh ? 'bg-green-600 text-white' : 'bg-gray-700 text-gray-400'}`}
                  >
                    {autoRefresh ? 'Auto ON' : 'Auto OFF'}
                  </button>
                  
                  <button onClick={() => refetchLogs()} className="text-gray-400 hover:text-white">
                    <FaRedo size={14} />
                  </button>
                  
                  <button
                    onClick={() => {
                      const blob = new Blob([logsData?.logs || ''], { type: 'text/plain' });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement('a');
                      a.href = url;
                      a.download = `${selectedContainer.containerName}-logs.txt`;
                      a.click();
                      URL.revokeObjectURL(url);
                    }}
                    className="text-gray-400 hover:text-white"
                  >
                    <FaDownload size={14} />
                  </button>
                  
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(logsData?.logs || '');
                      toast.success('Logs copied!');
                    }}
                    className="text-gray-400 hover:text-white"
                  >
                    <FaCopy size={14} />
                  </button>
                  
                  <button onClick={() => setShowLogsModal(false)} className="text-gray-400 hover:text-white text-xl">
                    ✕
                  </button>
                </div>
              </div>
              
              <div className="flex-1 overflow-auto p-4">
                {loadingLogs ? (
                  <div className="flex justify-center items-center h-64">
                    <FaSpinner className="animate-spin text-gray-400 text-3xl" />
                  </div>
                ) : (
                  <pre className="text-sm font-mono text-green-400 whitespace-pre-wrap break-words">
                    {logsData?.logs || 'No logs available'}
                  </pre>
                )}
              </div>
              
              <div className="px-6 py-2 border-t border-gray-700 text-xs text-gray-500">
                📄 {(logsData?.logs || '').split('\n').length} lines | {autoRefresh ? 'Auto-refreshing' : 'Manual refresh'}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
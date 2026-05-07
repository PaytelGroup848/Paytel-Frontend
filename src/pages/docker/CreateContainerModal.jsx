import { useState } from 'react';
import { FaTimes, FaPlus, FaTrash, FaDocker } from 'react-icons/fa';
import { useCreateContainer } from '../../hooks/useDocker';

const POPULAR_IMAGES = [
  { name: 'nginx', tag: 'latest', description: 'Web server' },
  { name: 'mysql', tag: '8.0', description: 'MySQL database' },
  { name: 'postgres', tag: 'latest', description: 'PostgreSQL database' },
  { name: 'redis', tag: 'alpine', description: 'Redis cache' },
  { name: 'node', tag: '18-alpine', description: 'Node.js runtime' },
  { name: 'python', tag: '3.11-slim', description: 'Python runtime' },
  { name: 'ubuntu', tag: '22.04', description: 'Ubuntu OS' },
  { name: 'mongo', tag: 'latest', description: 'MongoDB database' },
];

export default function CreateContainerModal({ instanceId, isOpen, onClose }) {
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

  const createContainer = useCreateContainer(instanceId);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await createContainer.mutateAsync(formData);
    if (result.success) {
      onClose();
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
    }
  };

  const addPort = () => {
    setFormData({
      ...formData,
      ports: [...formData.ports, { hostPort: '', containerPort: '', protocol: 'tcp' }]
    });
  };

  const removePort = (index) => {
    setFormData({
      ...formData,
      ports: formData.ports.filter((_, i) => i !== index)
    });
  };

  const updatePort = (index, field, value) => {
    const newPorts = [...formData.ports];
    newPorts[index][field] = value;
    setFormData({ ...formData, ports: newPorts });
  };

  const addEnv = () => {
    setFormData({
      ...formData,
      env: [...formData.env, { key: '', value: '' }]
    });
  };

  const removeEnv = (index) => {
    setFormData({
      ...formData,
      env: formData.env.filter((_, i) => i !== index)
    });
  };

  const updateEnv = (index, field, value) => {
    const newEnv = [...formData.env];
    newEnv[index][field] = value;
    setFormData({ ...formData, env: newEnv });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <FaDocker className="text-indigo-600" />
            Create Container
          </h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <FaTimes />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Container Name */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Container Name *
            </label>
            <input
              type="text"
              required
              value={formData.containerName}
              onChange={(e) => setFormData({ ...formData, containerName: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="my-container"
            />
          </div>

          {/* Image Selection */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Docker Image *
            </label>
            <div className="grid grid-cols-2 gap-2 mb-2">
              {POPULAR_IMAGES.map((img) => (
                <button
                  key={img.name}
                  type="button"
                  onClick={() => setFormData({ ...formData, imageName: img.name, imageTag: img.tag })}
                  className={`text-left px-3 py-2 rounded-lg border text-sm ${
                    formData.imageName === img.name
                      ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                      : 'border-slate-200 hover:border-indigo-300'
                  }`}
                >
                  <span className="font-mono">{img.name}</span>
                  <span className="text-xs text-slate-500 ml-2">{img.tag}</span>
                  <p className="text-xs text-slate-400 mt-1">{img.description}</p>
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                required
                value={formData.imageName}
                onChange={(e) => setFormData({ ...formData, imageName: e.target.value })}
                className="flex-1 px-3 py-2 border border-slate-300 rounded-lg"
                placeholder="image:tag"
              />
              <input
                type="text"
                value={formData.imageTag}
                onChange={(e) => setFormData({ ...formData, imageTag: e.target.value })}
                className="w-32 px-3 py-2 border border-slate-300 rounded-lg"
                placeholder="tag"
              />
            </div>
          </div>

          {/* Port Mapping */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium text-slate-700">Port Mapping</label>
              <button type="button" onClick={addPort} className="text-indigo-600 text-sm flex items-center gap-1">
                <FaPlus size={12} /> Add Port
              </button>
            </div>
            <div className="space-y-2">
              {formData.ports.map((port, idx) => (
                <div key={idx} className="flex gap-2 items-center">
                  <input
                    type="number"
                    placeholder="Host Port"
                    value={port.hostPort}
                    onChange={(e) => updatePort(idx, 'hostPort', e.target.value)}
                    className="flex-1 px-3 py-2 border border-slate-300 rounded-lg"
                  />
                  <span>→</span>
                  <input
                    type="number"
                    placeholder="Container Port"
                    value={port.containerPort}
                    onChange={(e) => updatePort(idx, 'containerPort', e.target.value)}
                    className="flex-1 px-3 py-2 border border-slate-300 rounded-lg"
                  />
                  <select
                    value={port.protocol}
                    onChange={(e) => updatePort(idx, 'protocol', e.target.value)}
                    className="w-24 px-3 py-2 border border-slate-300 rounded-lg"
                  >
                    <option value="tcp">TCP</option>
                    <option value="udp">UDP</option>
                  </select>
                  <button
                    type="button"
                    onClick={() => removePort(idx)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaTrash size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Environment Variables */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium text-slate-700">Environment Variables</label>
              <button type="button" onClick={addEnv} className="text-indigo-600 text-sm flex items-center gap-1">
                <FaPlus size={12} /> Add Variable
              </button>
            </div>
            <div className="space-y-2">
              {formData.env.map((env, idx) => (
                <div key={idx} className="flex gap-2 items-center">
                  <input
                    type="text"
                    placeholder="KEY"
                    value={env.key}
                    onChange={(e) => updateEnv(idx, 'key', e.target.value)}
                    className="flex-1 px-3 py-2 border border-slate-300 rounded-lg font-mono text-sm"
                  />
                  <span>=</span>
                  <input
                    type="text"
                    placeholder="value"
                    value={env.value}
                    onChange={(e) => updateEnv(idx, 'value', e.target.value)}
                    className="flex-1 px-3 py-2 border border-slate-300 rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => removeEnv(idx)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaTrash size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Advanced Settings */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Restart Policy
              </label>
              <select
                value={formData.restartPolicy}
                onChange={(e) => setFormData({ ...formData, restartPolicy: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg"
              >
                <option value="no">No</option>
                <option value="always">Always</option>
                <option value="on-failure">On Failure</option>
                <option value="unless-stopped">Unless Stopped</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                CPU Limit (cores)
              </label>
              <input
                type="number"
                step="0.1"
                value={formData.cpuLimit}
                onChange={(e) => setFormData({ ...formData, cpuLimit: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                placeholder="Unlimited"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Memory Limit (MB)
              </label>
              <input
                type="number"
                value={formData.memoryLimit}
                onChange={(e) => setFormData({ ...formData, memoryLimit: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                placeholder="Unlimited"
              />
            </div>
          </div>

          <div className="sticky bottom-0 bg-white pt-4 border-t border-slate-200 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={createContainer.isPending}
              className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {createContainer.isPending && <FaSpinner className="animate-spin" />}
              Create Container
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
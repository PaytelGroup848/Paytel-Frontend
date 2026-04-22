import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, X, ChevronRight, Server, Database, Globe, Shield,
  Layers, Terminal, Cpu, HardDrive, Key, User, Mail, Lock,
  PlusCircle, CheckCircle, AlertCircle, Loader2
} from 'lucide-react';

// ------------------- MOCK API (replace with real backend) -------------------
const fetchCatalogs = async () => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  return [
    {
      id: 'mysql',
      name: 'MySQL',
      icon: Database,
      description: 'Popular open-source relational database management system.',
      requiredFields: [
        { name: 'database', label: 'Database Name', type: 'text', placeholder: 'myapp_db' },
        { name: 'username', label: 'Username', type: 'text', placeholder: 'db_user' },
        { name: 'password', label: 'Password', type: 'password', placeholder: 'strong password' },
        { name: 'root_password', label: 'Root Password', type: 'password', placeholder: 'root password' }
      ]
    },
    {
      id: 'nginx',
      name: 'Nginx',
      icon: Globe,
      description: 'High-performance web server and reverse proxy.',
      requiredFields: [
        { name: 'domain', label: 'Domain Name', type: 'text', placeholder: 'example.com' },
        { name: 'email', label: 'Email', type: 'email', placeholder: 'admin@example.com' }
      ]
    },
    {
      id: 'wordpress',
      name: 'WordPress',
      icon: Layers,
      description: 'Most popular CMS for websites and blogs.',
      requiredFields: [
        { name: 'site_title', label: 'Site Title', type: 'text', placeholder: 'My Blog' },
        { name: 'admin_user', label: 'Admin Username', type: 'text', placeholder: 'admin' },
        { name: 'admin_password', label: 'Admin Password', type: 'password', placeholder: 'strong password' },
        { name: 'admin_email', label: 'Admin Email', type: 'email', placeholder: 'admin@example.com' }
      ]
    },
    {
      id: 'mongodb',
      name: 'MongoDB',
      icon: Database,
      description: 'NoSQL document database for modern applications.',
      requiredFields: [
        { name: 'db_name', label: 'Database Name', type: 'text', placeholder: 'myapp' },
        { name: 'username', label: 'Username', type: 'text', placeholder: 'mongouser' },
        { name: 'password', label: 'Password', type: 'password', placeholder: 'secure password' }
      ]
    },
    {
      id: 'redis',
      name: 'Redis',
      icon: Cpu,
      description: 'In-memory data structure store (cache, message broker).',
      requiredFields: [
        { name: 'password', label: 'Redis Password', type: 'password', placeholder: 'set a password' }
      ]
    },
    {
      id: 'postgresql',
      name: 'PostgreSQL',
      icon: Database,
      description: 'Advanced open-source relational database.',
      requiredFields: [
        { name: 'db_name', label: 'Database Name', type: 'text', placeholder: 'app_db' },
        { name: 'username', label: 'Username', type: 'text', placeholder: 'postgres_user' },
        { name: 'password', label: 'Password', type: 'password', placeholder: 'strong password' }
      ]
    }
  ];
};

const deployService = async (serviceId, credentials) => {
  // Simulate deployment API call
  await new Promise(resolve => setTimeout(resolve, 2000));
  // Return redirect URL (mock)
  return {
    success: true,
    redirectUrl: `/docker/containers/${serviceId}-${Date.now()}`,
    message: 'Container deployed successfully!'
  };
};

// ------------------- MAIN COMPONENT -------------------
const Catalogs = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedService, setSelectedService] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const [deploying, setDeploying] = useState(false);
  const [deployMessage, setDeployMessage] = useState({ type: '', text: '' });

  // Fetch catalogs on mount
  useEffect(() => {
    fetchCatalogs().then(data => {
      setServices(data);
      setLoading(false);
    });
  }, []);

  // Filter services based on search term
  const filteredServices = services.filter(service =>
    service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openModal = (service) => {
    setSelectedService(service);
    // Initialize form data with empty values
    const initial = {};
    service.requiredFields.forEach(field => {
      initial[field.name] = '';
    });
    setFormData(initial);
    setModalOpen(true);
    setDeployMessage({ type: '', text: '' });
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDeploy = async (e) => {
    e.preventDefault();
    setDeploying(true);
    try {
      const result = await deployService(selectedService.id, formData);
      setDeployMessage({ type: 'success', text: result.message });
      // Redirect after short delay
      setTimeout(() => {
        window.location.href = result.redirectUrl;
      }, 1500);
    } catch (error) {
      setDeployMessage({ type: 'error', text: 'Deployment failed. Please try again.' });
      setDeploying(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50/30 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
            <Server className="text-indigo-600" size={32} />
            Docker Catalogs
          </h1>
          <p className="text-slate-500 mt-2">One-click deploy popular applications and databases</p>
        </div>

        {/* Search and Stats Bar */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4 mb-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search services..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X size={16} />
              </button>
            )}
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <span className="font-semibold text-indigo-600">{filteredServices.length}</span>
            <span>services available</span>
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="animate-spin text-indigo-600" size={40} />
          </div>
        ) : (
          <>
            {/* Services Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredServices.map((service, idx) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                >
                  <div className="p-6">
                    <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center mb-4">
                      <service.icon className="text-indigo-600" size={28} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 mb-2">{service.name}</h3>
                    <p className="text-slate-500 text-sm mb-4 line-clamp-2">{service.description}</p>
                    <button
                      onClick={() => openModal(service)}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition active:scale-95"
                    >
                      Deploy <ChevronRight size={16} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Empty State */}
            {filteredServices.length === 0 && (
              <div className="text-center py-20">
                <Search className="mx-auto text-slate-300" size={48} />
                <h3 className="mt-4 text-lg font-semibold text-slate-700">No services found</h3>
                <p className="text-slate-500">Try a different search term</p>
              </div>
            )}
          </>
        )}

        {/* Deployment Modal */}
        <AnimatePresence>
          {modalOpen && selectedService && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => !deploying && setModalOpen(false)}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center">
                      <selectedService.icon className="text-indigo-600" size={20} />
                    </div>
                    <h2 className="text-xl font-bold text-slate-800">Deploy {selectedService.name}</h2>
                  </div>
                  {!deploying && (
                    <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                      <X size={20} />
                    </button>
                  )}
                </div>

                <form onSubmit={handleDeploy} className="p-6 space-y-4">
                  {selectedService.requiredFields.map((field) => (
                    <div key={field.name}>
                      <label className="block text-sm font-medium text-slate-700 mb-1">
                        {field.label}
                      </label>
                      <input
                        type={field.type}
                        name={field.name}
                        value={formData[field.name] || ''}
                        onChange={handleInputChange}
                        placeholder={field.placeholder}
                        required
                        disabled={deploying}
                        className="w-full px-4 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-slate-50 disabled:text-slate-500"
                      />
                    </div>
                  ))}

                  {deployMessage.text && (
                    <div className={`flex items-center gap-2 p-3 rounded-xl text-sm ${
                      deployMessage.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                    }`}>
                      {deployMessage.type === 'success' ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
                      {deployMessage.text}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={deploying}
                    className="w-full flex items-center justify-center gap-2 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition disabled:opacity-50"
                  >
                    {deploying ? <Loader2 className="animate-spin" size={18} /> : <PlusCircle size={18} />}
                    {deploying ? 'Deploying...' : 'Deploy Now'}
                  </button>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Catalogs;
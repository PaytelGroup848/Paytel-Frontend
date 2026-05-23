import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  FolderOpen, 
  Globe, 
  Database, 
  Cpu, 
  Activity, 
  AlertCircle, 
  ArrowLeft,
  ExternalLink,
  ShieldCheck,
  File,
  Folder,
  Server,
  Code2,
  Lock,
  Eye,
  EyeOff,
  Copy,
  Zap,
  TrendingUp,
  HardDrive,
  Clock,
  Trash2,
  Edit3,
  Upload,
  Download,
  Plus,
  X,
  Save,
  Check,
  MoreVertical
} from 'lucide-react';
import { 
  usePhpInstance, 
  usePhpFileList, 
  useDeletePhpInstance, 
  useSuspendPhpInstance, 
  usePhpCredentials,
  usePhpFileContent,
  useSavePhpFileContent,
  useCreatePhpFile,
  useCreatePhpFolder,
  useDeletePhpItem,
  useRenamePhpItem,
  useUploadPhpFile,
  useDownloadPhpFile
} from '../../../hooks/usePhpHosting';
import toast from 'react-hot-toast';
import Badge from '../../../components/ui/Badge';
import Button from '../../../components/ui/Button';
import { LuFilePen } from "react-icons/lu";

const SidebarItem = ({ icon: Icon, label, active, onClick }) => (
  <motion.button
    onClick={onClick}
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    className={`w-full flex items-center gap-3 sm:gap-4 px-4 sm:px-6 py-3 sm:py-4 rounded-2xl transition-all duration-300 group relative overflow-hidden ${
      active 
        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-2xl shadow-indigo-300/50' 
        : 'text-slate-600 hover:bg-white hover:shadow-lg hover:shadow-slate-200/50 border border-transparent hover:border-slate-100'
    }`}
  >
    {active && (
      <motion.div
        layoutId="activeTab"
        className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600"
        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
      />
    )}
    <Icon size={18} className={`relative z-10 ${active ? 'text-white' : 'text-slate-400 group-hover:text-indigo-600'} sm:w-5 sm:h-5`} />
    <span className="relative z-10 text-xs sm:text-sm font-bold uppercase tracking-wider">{label}</span>
  </motion.button>
);

const StatCard = ({ icon: Icon, label, value, action, iconBg }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    whileHover={{ y: -4 }}
    className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-lg hover:shadow-2xl transition-all duration-300"
  >
    <div className={`w-12 h-12 sm:w-14 sm:h-14 ${iconBg} rounded-2xl flex items-center justify-center text-white mb-4 sm:mb-6 shadow-lg`}>
      <Icon size={20} className="sm:w-6 sm:h-6" />
    </div>
    <p className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider">{label}</p>
    <h4 className="text-lg sm:text-xl font-black text-slate-900 mt-1 sm:mt-2 truncate">{value}</h4>
    {action && <div className="mt-4">{action}</div>}
  </motion.div>
);

// Modal Component
const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-3xl max-w-md w-full shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <h3 className="text-lg font-black text-slate-900 uppercase tracking-wider">{title}</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors">
            <X size={20} />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </motion.div>
    </motion.div>
  );
};

const OverviewTab = ({ instance }) => {
  const deleteInstance = useDeletePhpInstance();
  const suspendInstance = useSuspendPhpInstance();
  const { data: credentials, isLoading: isCredsLoading } = usePhpCredentials(instance.id);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (window.confirm('Are you sure? This will permanently delete the site and all files.')) {
      await deleteInstance.mutateAsync(instance.id);
      navigate('/websites/php/paid');
    }
  };

  const handleSuspend = async () => {
    if (window.confirm('Suspend this site? It will be disabled until you reactivate it.')) {
      await suspendInstance.mutateAsync(instance.id);
    }
  };

  const copyToClipboard = (text, label) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard`);
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <StatCard
          icon={Globe}
          label="Site Domain"
          value={instance.domain}
          iconBg="bg-gradient-to-br from-indigo-500 to-purple-500"
          action={
            <a href={`http://${instance.domain}`} target="_blank" rel="noreferrer" 
              className="inline-flex items-center gap-2 text-indigo-600 text-[10px] sm:text-xs font-bold uppercase tracking-wider hover:gap-3 transition-all">
              Visit Site <ExternalLink size={12} />
            </a>
          }
        />
        <StatCard
          icon={ShieldCheck}
          label="SSL Status"
          value={instance.sslActive ? 'Active' : 'Inactive'}
          iconBg="bg-gradient-to-br from-emerald-500 to-teal-500"
          action={<p className="text-[10px] font-bold text-emerald-600">Protected by Let's Encrypt</p>}
        />
        <StatCard
          icon={Server}
          label="Server IP"
          value={instance.serverIp}
          iconBg="bg-gradient-to-br from-amber-500 to-orange-500"
          action={<div className="flex items-center gap-2"><div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" /><span>Running</span></div>}
        />
      </div>

      {instance.siteType === 'mysql' && (
        <motion.div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-lg">
          <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl flex items-center justify-center text-white shadow-lg">
                <Database size={20} />
              </div>
              <div>
                <h3 className="font-black text-slate-900 uppercase tracking-wider">Database Credentials</h3>
                <p className="text-xs text-slate-500">MySQL connection details</p>
              </div>
            </div>
            <a href="https://phpmyadmin.cloudedata.com:22222/db/pma/" target="_blank" rel="noreferrer" 
              className="px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-xl shadow-lg hover:bg-blue-700 transition-all inline-flex items-center gap-2">
              phpMyAdmin <ExternalLink size={14} />
            </a>
          </div>
          
          {isCredsLoading ? (
            <div className="animate-pulse space-y-4">Loading...</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="p-4 bg-slate-50 rounded-2xl">
                <p className="text-[10px] font-bold text-slate-400">DB Name</p>
                <p className="font-black text-slate-900 truncate">{credentials?.dbName || instance.dbName || 'N/A'}</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-2xl">
                <p className="text-[10px] font-bold text-slate-400">DB User</p>
                <p className="font-black text-slate-900 truncate">{credentials?.dbUser || instance.dbUser || 'N/A'}</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-2xl">
                <p className="text-[10px] font-bold text-slate-400">DB Password</p>
                <div className="flex items-center justify-between">
                  <p className="font-black font-mono">{showPassword ? (credentials?.dbPassword || '********') : '••••••••'}</p>
                  <button onClick={() => setShowPassword(!showPassword)} className="text-slate-400 hover:text-indigo-600">
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

const FileManagerTab = ({ instance }) => {
  // CRITICAL: Get the correct ID (handle both id and _id)
  const instanceId = instance?.id || instance?._id;
  
  console.log('FileManagerTab - instance:', instance);
  console.log('FileManagerTab - instanceId:', instanceId);
  
  // If no instanceId, don't render
  if (!instanceId) {
    return (
      <div className="bg-red-50 p-4 rounded-xl text-red-600">
        Error: Invalid instance ID. Please refresh the page.
      </div>
    );
  }
  
  const [currentPath, setCurrentPath] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('');
  const [newItemName, setNewItemName] = useState('');
  const [newFileContent, setNewFileContent] = useState('');
  const [editingFile, setEditingFile] = useState(null);
  const [editContent, setEditContent] = useState('');
  const [renamingItem, setRenamingItem] = useState(null);
  const [renameNewName, setRenameNewName] = useState('');
  const [fileInputRef, setFileInputRef] = useState(null);

  // Use instanceId everywhere instead of instance.id
  const { data: files, isLoading, refetch } = usePhpFileList(instanceId, currentPath);
  const { data: fileContentData, refetch: refetchContent } = usePhpFileContent(instanceId, editingFile);
  const { mutate: saveFileContent } = useSavePhpFileContent();
  const { mutate: deleteItem } = useDeletePhpItem();
  const { mutate: renameItem } = useRenamePhpItem();
  const { mutate: createFile } = useCreatePhpFile();
  const { mutate: createFolder } = useCreatePhpFolder();
  const { mutate: uploadFile } = useUploadPhpFile();
  const { mutate: downloadFile } = useDownloadPhpFile();

  // Debug: Log files to see structure
  useEffect(() => {
    if (files && files.length > 0) {
      console.log('Files structure:', files);
      console.log('First file path:', files[0]?.path);
    }
  }, [files]);

  useEffect(() => {
    if (fileContentData?.content) {
      setEditContent(fileContentData.content);
    }
  }, [fileContentData]);

  const handleFolderClick = (folderName) => {
    setCurrentPath(prev => `${prev}/${folderName}`.replace(/\/+/g, '/'));
  };

  const handleBack = () => {
    const parts = currentPath.split('/').filter(Boolean);
    parts.pop();
    setCurrentPath(parts.length ? `/${parts.join('/')}` : '');
  };

const handleFileEdit = (file) => {
  setEditingFile(file.path);
  refetchContent();
  setModalType('edit');
  setIsModalOpen(true);
};

const handleSaveEdit = () => {
  saveFileContent({
    id: instanceId,  
    path: editingFile,
    content: editContent
  }, {
    onSuccess: () => {
      setIsModalOpen(false);
      setEditingFile(null);
      setEditContent('');
      refetch();
      toast.success('File saved successfully');
    }
  });
};

const handleDelete = (itemPath) => {
  if (window.confirm(`Delete ${itemPath}?`)) {
    deleteItem({ id: instanceId, path: itemPath }, {  // Change from instance.id
      onSuccess: () => refetch()
    });
  }
};

const handleRename = () => {
  if (renamingItem && renameNewName) {
    renameItem({
      id: instanceId,  
      path: renamingItem.path,
      newName: renameNewName
    }, {
      onSuccess: () => {
        setRenamingItem(null);
        setRenameNewName('');
        refetch();
        toast.success('Renamed successfully');
      }
    });
  }
};

const handleCreate = () => {
  if (modalType === 'file') {
    createFile({
      id: instanceId,  // Change from instance.id
      path: currentPath,
      fileName: newItemName,
      content: newFileContent
    }, {
      onSuccess: () => {
        setIsModalOpen(false);
        setNewItemName('');
        setNewFileContent('');
        refetch();
        toast.success('File created');
      }
    });
  } else if (modalType === 'folder') {
    createFolder({
      id: instanceId,  // Change from instance.id
      path: currentPath,
      folderName: newItemName
    }, {
      onSuccess: () => {
        setIsModalOpen(false);
        setNewItemName('');
        refetch();
        toast.success('Folder created');
      }
    });
  }
};

const handleFileUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const base64 = e.target.result.split(',')[1];
      uploadFile({
        id: instanceId,  // Change from instance.id
        path: currentPath,
        fileName: file.name,
        content: base64
      }, {
        onSuccess: () => {
          refetch();
          toast.success('File uploaded');
        }
      });
    };
    reader.readAsDataURL(file);
  }
};

const handleDownload = (file) => {
  console.log('Download clicked for file:', file);
  
  if (!file || !file.path) {
    console.error('Invalid file object:', file);
    toast.error('Invalid file path');
    return;
  }
  
  console.log('Downloading file with path:', file.path);
  downloadFile({ id: instanceId, path: file.path });  // Change from instance.id
};


  if (!instance) return null;

  return (
    <>
      <motion.div className="bg-white rounded-3xl border border-slate-100 shadow-lg overflow-hidden">
        <div className="p-4 sm:p-6 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-slate-100">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              {currentPath && (
                <button onClick={handleBack} className="w-10 cursor-pointer h-10 rounded-xl bg-white shadow flex items-center justify-center text-slate-500 hover:text-indigo-600 transition-all">
                  <ArrowLeft size={18} />
                </button>
              )}
              <div className="min-w-0 flex-1">
                <h3 className="font-black text-slate-900 uppercase tracking-wider">File Manager</h3>
                <p className="text-xs text-slate-500 truncate">/var/www/{instance.domain}{currentPath}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <input type="file" ref={setFileInputRef} onChange={handleFileUpload} className="hidden" />
              <button onClick={() => fileInputRef?.click()} className="px-3 cursor-pointer py-2 bg-indigo-600 text-white text-xs font-bold rounded-xl shadow hover:bg-indigo-700 transition-all inline-flex items-center gap-2">
                <Upload size={14} /> Upload
              </button>
              <button onClick={() => { setModalType('file'); setNewItemName(''); setNewFileContent(''); setIsModalOpen(true); }} className="px-3 cursor-pointer py-2 bg-emerald-600 text-white text-xs font-bold rounded-xl shadow hover:bg-emerald-700 transition-all inline-flex items-center gap-2">
                <Plus size={14} /> New File
              </button>
              <button onClick={() => { setModalType('folder'); setNewItemName(''); setIsModalOpen(true); }} className="px-3 py-2 cursor-pointer bg-purple-600 text-white text-xs font-bold rounded-xl shadow hover:bg-purple-700 transition-all inline-flex items-center gap-2">
                <Plus size={14} /> New Folder
              </button>
            </div>
          </div>
        </div>

        <div className="p-4">
          {isLoading ? (
            <div className="space-y-2">Loading...</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-xs font-black text-slate-400 border-b">
                    <th className="px-4 py-3 text-left">Name</th>
                    <th className="px-4 py-3 text-left hidden sm:table-cell">Size</th>
                    <th className="px-4 py-3 text-left hidden md:table-cell">Modified</th>
                    <th className="px-4 py-3 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {files?.map((file) => (
                    <tr key={file.path} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${file.isDirectory ? 'bg-indigo-100 text-indigo-600' : 'bg-slate-100 text-slate-600'}`}>
                            {file.isDirectory ? <Folder size={16} /> : <File size={16} />}
                          </div>
                          <span className={`font-medium ${file.isDirectory ? 'text-indigo-600 cursor-pointer hover:underline' : 'text-slate-700'}`}
                            onClick={() => file.isDirectory && handleFolderClick(file.name)}>
                            {file.name}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-slate-500 hidden sm:table-cell">{file.isDirectory ? '-' : file.size}</td>
                      <td className="px-4 py-3 text-sm text-slate-500 hidden md:table-cell">{file.modified}</td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          {!file.isDirectory && (
                            <>
                              <button onClick={() => handleFileEdit(file)} className="p-1 cursor-pointer text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Edit">
                                <Edit3 size={16} />
                              </button>
                                <button 
      onClick={() => handleDownload(file)}  // Pass the whole file object, not just path
      className="p-1 cursor-pointer text-green-600 hover:bg-green-50 rounded-lg transition-colors"
      title="Download"
    >
      <Download size={16} />
    </button>
                            </>
                          )}
                          <button onClick={() => { setRenamingItem(file); setRenameNewName(file.name); setIsModalOpen(true); setModalType('rename'); }} className="p-1 cursor-pointer text-amber-600 hover:bg-amber-50 rounded-lg transition-colors" title="Rename">
                            <LuFilePen />
                          </button>
                          <button onClick={() => handleDelete(file.path)} className="p-1 cursor-pointer text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </motion.div>

      {/* Modals */}
      <Modal isOpen={isModalOpen} onClose={() => { setIsModalOpen(false); setRenamingItem(null); setEditingFile(null); }} title={
        modalType === 'file' ? 'Create New File' :
        modalType === 'folder' ? 'Create New Folder' :
        modalType === 'rename' ? 'Rename Item' :
        'Edit File'
      }>
        {modalType === 'file' && (
          <div className="space-y-4">
            <input type="text" placeholder="File name (e.g., index.html)" value={newItemName} onChange={(e) => setNewItemName(e.target.value)} className="w-full p-3 border rounded-xl" />
            <textarea placeholder="File content (optional)" value={newFileContent} onChange={(e) => setNewFileContent(e.target.value)} rows={5} className="w-full p-3 border rounded-xl font-mono text-sm" />
            <button onClick={handleCreate} className="w-full py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-all">Create File</button>
          </div>
        )}
        {modalType === 'folder' && (
          <div className="space-y-4">
            <input type="text" placeholder="Folder name" value={newItemName} onChange={(e) => setNewItemName(e.target.value)} className="w-full p-3 border rounded-xl" />
            <button onClick={handleCreate} className="w-full py-3 bg-purple-600 text-white font-bold rounded-xl hover:bg-purple-700 transition-all">Create Folder</button>
          </div>
        )}
        {modalType === 'rename' && renamingItem && (
          <div className="space-y-4">
            <input type="text" value={renameNewName} onChange={(e) => setRenameNewName(e.target.value)} className="w-full p-3 border rounded-xl" />
            <button onClick={handleRename} className="w-full py-3 bg-amber-600 text-white font-bold rounded-xl hover:bg-amber-700 transition-all">Rename</button>
          </div>
        )}
        {modalType === 'edit' && (
          <div className="space-y-4">
            <textarea value={editContent} onChange={(e) => setEditContent(e.target.value)} rows={10} className="w-full p-3 border rounded-xl font-mono text-sm" />
            <button onClick={handleSaveEdit} className="w-full py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all inline-flex items-center justify-center gap-2">
              <Save size={16} /> Save Changes
            </button>
          </div>
        )}
      </Modal>
    </>
  );
};

export default function PhpDashboard() {
  const { instanceId } = useParams();
  const [activeTab, setActiveTab] = useState('overview');
  const { data: instance, isLoading } = usePhpInstance(instanceId);

  if (isLoading) return <div className="min-h-screen flex items-center justify-center"><div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" /></div>;
  if (!instance) return <div className="min-h-screen flex items-center justify-center">Instance not found</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-purple-50/30 flex flex-col lg:flex-row">
      <div className="w-full lg:w-80 p-6 lg:p-10 border-r border-slate-200/50 bg-white/80 backdrop-blur-xl">
        <Link to="/websites/php/paid" className="inline-flex items-center gap-2 text-slate-500 hover:text-indigo-600 text-xs font-bold mb-8">
          <ArrowLeft size={14} /> All PHP Sites
        </Link>
        <div className="mb-8">
          <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-2xl mb-4 ${
            instance.siteType === 'html' ? 'bg-gradient-to-br from-blue-500 to-cyan-500' :
            instance.siteType === 'php' ? 'bg-gradient-to-br from-purple-500 to-pink-500' :
            'bg-gradient-to-br from-emerald-500 to-teal-500'
          }`}>
            {instance.siteType === 'html' ? <Code2 size={28} /> : instance.siteType === 'php' ? <Cpu size={28} /> : <Database size={28} />}
          </div>
          <h2 className="text-2xl font-black text-slate-900 truncate">{instance.domain}</h2>
          <div className="flex gap-2 mt-2">
            <Badge className="bg-emerald-500 text-white">Active</Badge>
            <Badge className="bg-slate-600 text-white">{instance.siteType}</Badge>
          </div>
        </div>
        <nav className="space-y-2">
          <SidebarItem icon={LayoutDashboard} label="Overview" active={activeTab === 'overview'} onClick={() => setActiveTab('overview')} />
          <SidebarItem icon={FolderOpen} label="File Manager" active={activeTab === 'files'} onClick={() => setActiveTab('files')} />
        </nav>
      </div>
      <main className="flex-1 p-6 lg:p-12">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-black bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            {activeTab === 'overview' ? 'Site Overview' : 'File Manager'}
          </h1>
          <button onClick={() => window.open(`http://${instance.domain}`, '_blank')} className="px-4 cursor-pointer py-2 border-2 border-indigo-600 text-indigo-600 font-bold rounded-xl hover:bg-indigo-600 hover:text-white transition-all">
            Open Site <ExternalLink size={14} className="inline ml-2" />
          </button>
        </header>
        <AnimatePresence mode="wait">
          <motion.div key={activeTab} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            {activeTab === 'overview' && <OverviewTab instance={instance} />}
            {activeTab === 'files' && <FileManagerTab instance={instance} />}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
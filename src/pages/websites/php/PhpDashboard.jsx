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
  MoreVertical,
  Loader2
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
    whileHover={{ x: 4 }}
    whileTap={{ scale: 0.99 }}
    className={`w-full flex items-center gap-3.5 px-5 py-3.5 rounded-xl transition-all duration-200 group relative overflow-hidden font-semibold ${
      active 
        ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/10' 
        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 border border-transparent'
    }`}
  >
    <Icon size={18} className={`${active ? 'text-white' : 'text-slate-400 group-hover:text-slate-700'}`} />
    <span className="text-xs uppercase tracking-wider">{label}</span>
  </motion.button>
);

const StatCard = ({ icon: Icon, label, value, action, iconBg }) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm flex flex-col justify-between"
  >
    <div>
      <div className={`w-10 h-10 ${iconBg} rounded-xl flex items-center justify-center text-white mb-4 shadow-sm`}>
        <Icon size={18} />
      </div>
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{label}</p>
      <h4 className="text-base sm:text-lg font-bold text-slate-900 mt-1 truncate select-all">{value}</h4>
    </div>
    {action && <div className="mt-4 pt-3 border-t border-slate-50">{action}</div>}
  </motion.div>
);

// Modern Modal Frame
const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-slate-950/40 backdrop-blur-md"
          onClick={onClose}
        />
        <motion.div
          initial={{ scale: 0.95, y: 10, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.95, y: 10, opacity: 0 }}
          transition={{ type: "spring", damping: 25 }}
          className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-100 relative z-10 overflow-hidden"
        >
          <div className="flex items-center justify-between px-6 py-4 bg-slate-50 border-b border-slate-100">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">{title}</h3>
            <button onClick={onClose} className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all">
              <X size={16} />
            </button>
          </div>
          <div className="p-6 overflow-y-auto max-h-[calc(100vh-10rem)]">{children}</div>
        </motion.div>
      </div>
    </AnimatePresence>
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
      navigate('/php-hosting/paid');
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
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <StatCard
          icon={Globe}
          label="Site Domain"
          value={instance.domain}
          iconBg="bg-slate-900"
          action={
            <a href={`http://${instance.domain}`} target="_blank" rel="noreferrer" 
              className="inline-flex items-center gap-1.5 text-indigo-600 text-xs font-bold uppercase tracking-wider hover:text-indigo-700 transition-colors">
              Visit Site <ExternalLink size={12} />
            </a>
          }
        />
        <StatCard
          icon={ShieldCheck}
          label="SSL Status"
          value={instance.sslActive ? 'Active' : 'Inactive'}
          iconBg="bg-emerald-600"
          action={<p className="text-[11px] font-semibold text-emerald-600 flex items-center gap-1"><span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"/> Protected by Let's Encrypt</p>}
        />
        <StatCard
          icon={Server}
          label="Server IP"
          value={instance.serverIp}
          iconBg="bg-indigo-600"
          action={
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                <span>Running Container</span>
              </div>
              <button 
                onClick={() => copyToClipboard(instance.serverIp, 'IP')} 
                className="p-1 text-slate-400 hover:text-slate-600 rounded hover:bg-slate-50 transition-colors"
                title="Copy Address"
              >
                <Copy size={13} />
              </button>
            </div>
          }
        />
      </div>

      {instance.siteType === 'mysql' && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl border border-slate-200/60 shadow-sm overflow-hidden"
        >
          <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-indigo-50 border border-indigo-100 rounded-xl flex items-center justify-center text-indigo-600">
                <Database size={18} />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider">Database Credentials</h3>
                <p className="text-xs text-slate-400 font-medium">MySQL connectivity protocols</p>
              </div>
            </div>
            <a href="https://phpmyadmin.cloudedata.com:22222/db/pma/" target="_blank" rel="noreferrer" 
              className="px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-xl shadow-sm hover:bg-slate-800 transition-all inline-flex items-center gap-1.5 self-start sm:self-auto">
              phpMyAdmin <ExternalLink size={12} />
            </a>
          </div>
          
          <div className="p-6">
            {isCredsLoading ? (
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 animate-pulse uppercase tracking-wider py-4">
                <Loader2 size={14} className="animate-spin text-indigo-600" /> Fetching secure metrics...
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-slate-50/70 border border-slate-100 rounded-xl relative group">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">DB Name</p>
                  <p className="font-mono text-xs font-bold text-slate-800 mt-1 truncate select-all pr-6">{credentials?.dbName || instance.dbName || 'N/A'}</p>
                  <button onClick={() => copyToClipboard(credentials?.dbName || instance.dbName, 'DB Name')} className="absolute right-3 bottom-4 opacity-0 group-hover:opacity-100 transition-opacity p-1 text-slate-400 hover:text-slate-600"><Copy size={12}/></button>
                </div>
                <div className="p-4 bg-slate-50/70 border border-slate-100 rounded-xl relative group">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">DB User</p>
                  <p className="font-mono text-xs font-bold text-slate-800 mt-1 truncate select-all pr-6">{credentials?.dbUser || instance.dbUser || 'N/A'}</p>
                  <button onClick={() => copyToClipboard(credentials?.dbUser || instance.dbUser, 'DB User')} className="absolute right-3 bottom-4 opacity-0 group-hover:opacity-100 transition-opacity p-1 text-slate-400 hover:text-slate-600"><Copy size={12}/></button>
                </div>
                <div className="p-4 bg-slate-50/70 border border-slate-100 rounded-xl flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">DB Password</p>
                    <p className="font-mono text-xs font-bold mt-1 text-slate-800 tracking-wide">{showPassword ? (credentials?.dbPassword || '********') : '••••••••'}</p>
                  </div>
                  <div className="flex gap-1 shrink-0">
                    <button onClick={() => setShowPassword(!showPassword)} className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200/50 rounded transition-colors">
                      {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                    </button>
                    {credentials?.dbPassword && (
                      <button onClick={() => copyToClipboard(credentials.dbPassword, 'Password')} className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200/50 rounded transition-colors">
                        <Copy size={14} />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}

      {/* Dangerous Management Actions */}
      <div className="rounded-2xl border border-red-100 bg-red-50/20 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-red-950">Critical Server Operations</h4>
          <p className="text-xs text-slate-500 mt-0.5">Suspending stops routing traffic, deleting destroys data nodes irreversibly.</p>
        </div>
        <div className="flex items-center gap-2.5 shrink-0 self-start sm:self-auto">
          <button onClick={handleSuspend} className="px-3.5 py-2 text-xs font-bold text-slate-700 border border-slate-200 hover:bg-slate-50 bg-white rounded-xl transition-colors">
            Suspend Node
          </button>
          <button onClick={handleDelete} className="px-3.5 py-2 text-xs font-bold text-white bg-red-600 hover:bg-red-700 shadow-sm rounded-xl transition-all">
            Purge Cluster
          </button>
        </div>
      </div>
    </div>
  );
};

const FileManagerTab = ({ instance }) => {
  const instanceId = instance?.id || instance?._id;
  
  console.log('FileManagerTab - instance:', instance);
  console.log('FileManagerTab - instanceId:', instanceId);
  
  if (!instanceId) {
    return (
      <div className="bg-red-50 p-4 border border-red-100 rounded-xl text-xs font-bold uppercase tracking-wide text-red-700 flex items-center gap-2">
        <AlertCircle size={16} /> Error: Secure context token missing. Please refresh dashboard view.
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

  const { data: files, isLoading, refetch } = usePhpFileList(instanceId, currentPath);
  const { data: fileContentData, refetch: refetchContent } = usePhpFileContent(instanceId, editingFile);
  const { mutate: saveFileContent } = useSavePhpFileContent();
  const { mutate: deleteItem } = useDeletePhpItem();
  const { mutate: renameItem } = useRenamePhpItem();
  const { mutate: createFile } = useCreatePhpFile();
  const { mutate: createFolder } = useCreatePhpFolder();
  const { mutate: uploadFile } = useUploadPhpFile();
  const { mutate: downloadFile } = useDownloadPhpFile();

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
      deleteItem({ id: instanceId, path: itemPath }, {
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
        id: instanceId,
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
        id: instanceId,
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
          id: instanceId,
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
    downloadFile({ id: instanceId, path: file.path });
  };

  if (!instance) return null;

  return (
    <>
      <motion.div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm overflow-hidden">
        
        {/* Workspace Toolbar Controls */}
        <div className="p-5 border-b border-slate-100 bg-slate-50/50">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0">
              {currentPath && (
                <button onClick={handleBack} className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-900 shadow-sm cursor-pointer transition-colors">
                  <ArrowLeft size={14} />
                </button>
              )}
              <div className="min-w-0">
                <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider">Storage Node Files</h3>
                <p className="text-[11px] font-mono text-slate-400 truncate mt-0.5">/var/www/{instance.domain}{currentPath || '/'}</p>
              </div>
            </div>
            
            {/* Context Actions */}
            <div className="flex flex-wrap gap-2 shrink-0">
              <input type="file" ref={setFileInputRef} onChange={handleFileUpload} className="hidden" />
              <button onClick={() => fileInputRef?.click()} className="px-3 py-1.5 bg-white border border-slate-200 text-slate-700 text-xs font-bold rounded-xl shadow-sm hover:bg-slate-50 cursor-pointer transition-all inline-flex items-center gap-1.5">
                <Upload size={13} /> Upload
              </button>
              <button onClick={() => { setModalType('file'); setNewItemName(''); setNewFileContent(''); setIsModalOpen(true); }} className="px-3 py-1.5 bg-slate-900 text-white text-xs font-bold rounded-xl shadow-sm hover:bg-slate-800 cursor-pointer transition-all inline-flex items-center gap-1.5">
                <Plus size={13} /> Add File
              </button>
              <button onClick={() => { setModalType('folder'); setNewItemName(''); setIsModalOpen(true); }} className="px-3 py-1.5 bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold rounded-xl shadow-sm hover:bg-indigo-100/60 cursor-pointer transition-all inline-flex items-center gap-1.5">
                <Plus size={13} /> New Directory
              </button>
            </div>
          </div>
        </div>

        {/* Workspace Explorer View */}
        <div className="p-2">
          {isLoading ? (
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 py-8 px-4 animate-pulse tracking-wider">
              <Loader2 size={14} className="animate-spin text-indigo-600" /> Mapping index block elements...
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100">
                    <th className="px-4 py-3">Object Descriptor</th>
                    <th className="px-4 py-3 hidden sm:table-cell">Allocation Size</th>
                    <th className="px-4 py-3 hidden md:table-cell">Modified Time</th>
                    <th className="px-4 py-3 text-right">Operations</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 text-xs font-medium">
                  {files?.map((file) => (
                    <tr key={file.path} className="hover:bg-slate-50/60 transition-colors group">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center border shrink-0 ${file.isDirectory ? 'bg-indigo-50 border-indigo-100/50 text-indigo-600' : 'bg-slate-50 border-slate-100 text-slate-500'}`}>
                            {file.isDirectory ? <Folder size={14} /> : <File size={14} />}
                          </div>
                          <span className={`font-semibold truncate max-w-[180px] sm:max-w-xs ${file.isDirectory ? 'text-indigo-600 cursor-pointer hover:underline' : 'text-slate-700'}`}
                            onClick={() => file.isDirectory && handleFolderClick(file.name)}>
                            {file.name}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-slate-400 font-mono hidden sm:table-cell">{file.isDirectory ? '—' : file.size}</td>
                      <td className="px-4 py-3 text-slate-400 hidden md:table-cell">{file.modified}</td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-1 opacity-80 md:opacity-0 group-hover:opacity-100 transition-opacity">
                          {!file.isDirectory && (
                            <>
                              <button onClick={() => handleFileEdit(file)} className="p-1.5 cursor-pointer text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors" title="Edit Structure">
                                <Edit3 size={14} />
                              </button>
                              <button onClick={() => handleDownload(file)} className="p-1.5 cursor-pointer text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors" title="Download Blob">
                                <Download size={14} />
                              </button>
                            </>
                          )}
                          <button onClick={() => { setRenamingItem(file); setRenameNewName(file.name); setIsModalOpen(true); setModalType('rename'); }} className="p-1.5 cursor-pointer text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors" title="Modify Label">
                            <LuFilePen size={14} />
                          </button>
                          <button onClick={() => handleDelete(file.path)} className="p-1.5 cursor-pointer text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors" title="Purge Record">
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {(!files || files.length === 0) && (
                    <tr>
                      <td colSpan={4} className="text-center py-8 text-slate-400 font-medium tracking-wide">
                        Empty scope matrix. No files resolved inside current route context.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </motion.div>

      {/* Dynamic Modal Interfaces */}
      <Modal isOpen={isModalOpen} onClose={() => { setIsModalOpen(false); setRenamingItem(null); setEditingFile(null); }} title={
        modalType === 'file' ? 'Provision Object Instance' :
        modalType === 'folder' ? 'Create Directory Cluster' :
        modalType === 'rename' ? 'Modify Entity Title' :
        'Buffer Code Editor'
      }>
        {modalType === 'file' && (
          <div className="space-y-4">
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Identifier Name</label>
              <input type="text" placeholder="e.g., config.php" value={newItemName} onChange={(e) => setNewItemName(e.target.value)} className="w-full p-3 border border-slate-200 rounded-xl text-sm outline-none focus:border-slate-900 transition-colors" />
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Initial Buffer Content</label>
              <textarea placeholder="Write code data structural block here..." value={newFileContent} onChange={(e) => setNewFileContent(e.target.value)} rows={6} className="w-full p-3 border border-slate-200 rounded-xl font-mono text-xs outline-none focus:border-slate-900 transition-colors bg-slate-50" />
            </div>
            <button onClick={handleCreate} className="w-full py-3 bg-slate-900 text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-slate-800 transition-all shadow-sm">Save & Mount</button>
          </div>
        )}
        {modalType === 'folder' && (
          <div className="space-y-4">
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Directory Name</label>
              <input type="text" placeholder="e.g., assets" value={newItemName} onChange={(e) => setNewItemName(e.target.value)} className="w-full p-3 border border-slate-200 rounded-xl text-sm outline-none focus:border-slate-900 transition-colors" />
            </div>
            <button onClick={handleCreate} className="w-full py-3 bg-slate-900 text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-slate-800 transition-all shadow-sm">Allocate Scope</button>
          </div>
        )}
        {modalType === 'rename' && renamingItem && (
          <div className="space-y-4">
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Update Descriptor Label</label>
              <input type="text" value={renameNewName} onChange={(e) => setRenameNewName(e.target.value)} className="w-full p-3 border border-slate-200 rounded-xl text-sm outline-none focus:border-slate-900 transition-colors" />
            </div>
            <button onClick={handleRename} className="w-full py-3 bg-slate-900 text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-slate-800 transition-all shadow-sm">Commit Translation</button>
          </div>
        )}
        {modalType === 'edit' && (
          <div className="space-y-4">
            <div className="border border-slate-200 rounded-xl overflow-hidden shadow-inner">
              <textarea value={editContent} onChange={(e) => setEditContent(e.target.value)} rows={12} className="w-full p-4 block font-mono text-xs text-slate-800 outline-none bg-slate-50/50 leading-relaxed resize-none" />
            </div>
            <button onClick={handleSaveEdit} className="w-full py-3 bg-indigo-600 text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-indigo-500 shadow-md shadow-indigo-600/10 transition-all inline-flex items-center justify-center gap-1.5">
              <Save size={14} /> Synchronize Matrix
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

  if (isLoading) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="w-10 h-10 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin" />
    </div>
  );
  
  if (!instance) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 text-xs font-bold uppercase tracking-wider text-slate-400">
      Node entity context resolved as empty.
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50/60 flex flex-col lg:flex-row font-sans selection:bg-indigo-100">
      
      {/* Structural Control Panel Base Navigation */}
      <div className="w-full lg:w-76 shrink-0 p-6 lg:p-8 lg:min-h-screen lg:sticky lg:top-0 bg-white border-b lg:border-b-0 lg:border-r border-slate-200/60 flex flex-col justify-between">
        <div>
          <Link to="/php-hosting/paid" className="inline-flex items-center gap-1.5 text-slate-400 hover:text-slate-800 text-xs font-bold uppercase tracking-wider mb-8 transition-colors group">
            <ArrowLeft size={13} className="group-hover:-translate-x-0.5 transition-transform" /> Cluster Nodes
          </Link>
          
          {/* Active Node Metadata Frame */}
          <div className="mb-8 p-1.5 rounded-2xl border border-slate-100 bg-slate-50/50">
            <div className="p-4 bg-white border border-slate-100 shadow-sm rounded-xl">
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-white shadow-md mb-3 ${
                instance.siteType === 'html' ? 'bg-slate-900' :
                instance.siteType === 'php' ? 'bg-indigo-600' :
                'bg-purple-600'
              }`}>
                {instance.siteType === 'html' ? <Code2 size={20} /> : instance.siteType === 'php' ? <Cpu size={20} /> : <Database size={20} />}
              </div>
              <h2 className="text-base font-bold text-slate-900 truncate tracking-tight">{instance.domain}</h2>
              <div className="flex gap-1.5 mt-2">
                <Badge className="bg-emerald-50 text-emerald-700 border border-emerald-200/50 text-[9px] px-2 py-0.5 rounded-md font-bold uppercase">Active</Badge>
                <Badge className="bg-slate-50 text-slate-600 border border-slate-200/50 text-[9px] px-2 py-0.5 rounded-md font-bold uppercase">{instance.siteType}</Badge>
              </div>
            </div>
          </div>

          <nav className="space-y-1">
            <SidebarItem icon={LayoutDashboard} label="Cluster Console" active={activeTab === 'overview'} onClick={() => setActiveTab('overview')} />
            <SidebarItem icon={FolderOpen} label="Scope Volumes" active={activeTab === 'files'} onClick={() => setActiveTab('files')} />
          </nav>
        </div>

        {/* Branding Footer Anchor */}
        <div className="mt-8 pt-4 border-t border-slate-100 hidden lg:block">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-normal">
            Platform Matrix<br/>
            <span className="text-slate-800">CloudData Core v2.4</span>
          </p>
        </div>
      </div>

      {/* Scope Workspace Viewport */}
      <main className="flex-1 p-5 sm:p-8 lg:p-10 max-w-7xl">
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-5 border-b border-slate-200/60">
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900">
              {activeTab === 'overview' ? 'Infrastructure Matrix' : 'File Systems Controller'}
            </h1>
            <p className="text-xs font-medium text-slate-400 mt-0.5">
              {activeTab === 'overview' ? 'Monitor routing definitions and node configurations' : 'Perform isolated block adjustments within filesystem parameters'}
            </p>
          </div>
          <button onClick={() => window.open(`http://${instance.domain}`, '_blank')} className="px-4 py-2 bg-white border border-slate-200 text-slate-700 text-xs font-bold rounded-xl shadow-sm hover:bg-slate-50 cursor-pointer transition-all inline-flex items-center gap-1.5 self-start sm:self-auto">
            Launch Endpoint <ExternalLink size={12} />
          </button>
        </header>

        <AnimatePresence mode="wait">
          <motion.div 
            key={activeTab} 
            initial={{ opacity: 0, y: 5 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.15 }}
          >
            {activeTab === 'overview' && <OverviewTab instance={instance} />}
            {activeTab === 'files' && <FileManagerTab instance={instance} />}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
import { useMemo, useState } from 'react';
import { useSearchParams, useParams, useNavigate } from 'react-router-dom';
import { Folder, FileText, FolderPlus, FilePlus, Trash2, X, ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';

import { useGetFiles, useCreateFolder, useCreateFile, useDeleteItem } from '../../../hooks/useWordPress';

export default function FilesPage() {
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [pathState, setPathState] = useState(searchParams.get('path') || '');
  const navigate = useNavigate();
  
  const [createFolderOpen, setCreateFolderOpen] = useState(false);
  const [createFileOpen, setCreateFileOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [inputName, setInputName] = useState('');

  const { data: files = [], isLoading } = useGetFiles(id, pathState);
  
  const createFolder = useCreateFolder(id);
  const createFile = useCreateFile(id);
  const deleteItem = useDeleteItem(id);

  const crumbs = useMemo(() => ['', ...pathState.split('/').filter(Boolean)], [pathState]);

  const goTo = (segments) => {
    const nextPath = segments.filter(Boolean).join('/');
    setPathState(nextPath);
    setSearchParams(nextPath ? { path: nextPath } : {});
  };

  const handleCreateFolder = () => {
    if (!inputName.trim()) return toast.error('Enter folder name');
    createFolder.mutate(
      { name: inputName.trim(), path: pathState },
      { onSuccess: () => { setCreateFolderOpen(false); setInputName(''); } }
    );
  };

  const handleCreateFile = () => {
    if (!inputName.trim()) return toast.error('Enter file name');
    createFile.mutate(
      { name: inputName.trim(), path: pathState },
      { onSuccess: () => { setCreateFileOpen(false); setInputName(''); } }
    );
  };

  const handleDelete = () => {
    if (!deleteTarget) return;
    deleteItem.mutate(
      { name: deleteTarget.name, path: pathState },
      { onSuccess: () => setDeleteTarget(null) }
    );
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-4">
           <button 
                      onClick={() => navigate(`/wordpress/websitedashboard/${id}`)} 
                      className="w-18 h-8 flex cursor-pointer border border-gray-200 items-center justify-center rounded-lg hover:bg-slate-100 text-slate-500 transition-colors" 
                    > 
                      <ArrowLeft size={18} className='mr-2'/>  Back
                    </button> 
          <h1 className="text-2xl font-bold text-slate-900">File Manager</h1>
          <div className="flex items-center gap-2">
            <button
              onClick={() => { setCreateFolderOpen(true); setInputName(''); }}
              className="flex items-center gap-1.5 px-3 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-all"
            >
              <FolderPlus size={15} />
              New Folder
            </button>
            <button
              onClick={() => { setCreateFileOpen(true); setInputName(''); }}
              className="flex items-center gap-1.5 px-3 py-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-lg text-sm font-medium transition-all"
            >
              <FilePlus size={15} />
              New File
            </button>
          </div>
        </div>
        <div className="mb-4 flex flex-wrap items-center gap-2 text-sm">
          {crumbs.map((crumb, idx) => (
            <button
              key={`${crumb}-${idx}`}
              onClick={() => goTo(crumbs.slice(1, idx + 1))}
              className="px-2 py-1 rounded bg-white border border-slate-200"
            >
              {crumb || 'root'}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="text-left px-4 py-3">Name</th>
                <th className="text-left px-4 py-3">Size</th>
                <th className="text-left px-4 py-3">Type</th>
                <th className="text-left px-4 py-3">Modified</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td className="px-4 py-6 text-center" colSpan={4}>
                    Loading files...
                  </td>
                </tr>
              ) : (
                files.map((item, index) => (
                  <tr key={`${item.name}-${index}`} className="group border-t border-slate-100 hover:bg-slate-50/50 transition-colors">
                    <td className="px-4 py-3">
                      <button
                        className="flex items-center gap-2 text-left"
                        onClick={() => {
                          if (item.type === 'folder') goTo([...pathState.split('/').filter(Boolean), item.name]);
                        }}
                      >
                        {item.type === 'folder' ? <Folder size={14} /> : <FileText size={14} />}
                        {item.name}
                      </button>
                    </td>
                    <td className="px-4 py-3">{item.size}</td>
                    <td className="px-4 py-3">{item.type}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-between gap-2">
                        <span>{item.modified}</span>
                        <button
                          onClick={(e) => { e.stopPropagation(); setDeleteTarget(item); }}
                          className="opacity-0 group-hover:opacity-100 p-1.5 hover:bg-red-50 hover:text-red-500 text-slate-400 rounded-lg transition-all"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {createFolderOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm mx-4 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-slate-800 flex items-center gap-2">
                <FolderPlus size={18} className="text-indigo-600" />
                Create New Folder
              </h3>
              <button onClick={() => setCreateFolderOpen(false)}>
                <X size={18} className="text-slate-400" />
              </button>
            </div>
            <input
              autoFocus
              type="text"
              value={inputName}
              onChange={(e) => setInputName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleCreateFolder()}
              placeholder="folder-name"
              className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 mb-4"
            />
            <div className="flex gap-2">
              <button
                onClick={() => setCreateFolderOpen(false)}
                className="flex-1 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateFolder}
                disabled={createFolder.isPending}
                className="flex-1 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-700 disabled:opacity-50"
              >
                {createFolder.isPending ? 'Creating...' : 'Create'}
              </button>
            </div>
          </div>
        </div>
      )}

      {createFileOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm mx-4 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-slate-800 flex items-center gap-2">
                <FilePlus size={18} className="text-indigo-600" />
                Create New File
              </h3>
              <button onClick={() => setCreateFileOpen(false)}>
                <X size={18} className="text-slate-400" />
              </button>
            </div>
            <input
              autoFocus
              type="text"
              value={inputName}
              onChange={(e) => setInputName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleCreateFile()}
              placeholder="filename.txt"
              className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 mb-4"
            />
            <div className="flex gap-2">
              <button
                onClick={() => setCreateFileOpen(false)}
                className="flex-1 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateFile}
                disabled={createFile.isPending}
                className="flex-1 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-700 disabled:opacity-50"
              >
                {createFile.isPending ? 'Creating...' : 'Create'}
              </button>
            </div>
          </div>
        </div>
      )}

      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm mx-4 p-6">
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Trash2 size={22} className="text-red-500" />
            </div>
            <h3 className="font-semibold text-slate-800 text-center mb-1">
              Delete {deleteTarget.type === 'folder' ? 'Folder' : 'File'}?
            </h3>
            <p className="text-slate-500 text-sm text-center mb-6">
              "{deleteTarget.name}" will be permanently deleted.
              This cannot be undone.
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setDeleteTarget(null)}
                className="flex-1 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={deleteItem.isPending}
                className="flex-1 py-2.5 bg-red-500 text-white rounded-xl text-sm font-medium hover:bg-red-600 disabled:opacity-50"
              >
                {deleteItem.isPending ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

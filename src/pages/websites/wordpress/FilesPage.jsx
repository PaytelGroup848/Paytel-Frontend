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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">

        {/* ── Header & Actions ── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(`/wordpress/websitedashboard/${id}`)}
              className="flex items-center justify-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm"
            >
              <ArrowLeft size={17} />
              <span className="text-sm font-medium hidden sm:inline">Back</span>
            </button>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-800 tracking-tight">File Manager</h1>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => { setCreateFolderOpen(true); setInputName(''); }}
              className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-semibold transition-all shadow-sm shadow-indigo-200"
            >
              <FolderPlus size={16} />
              <span className="hidden sm:inline">New Folder</span>
            </button>
            <button
              onClick={() => { setCreateFileOpen(true); setInputName(''); }}
              className="flex items-center gap-2 px-4 py-2.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-xl text-sm font-semibold transition-all shadow-sm"
            >
              <FilePlus size={16} />
              <span className="hidden sm:inline">New File</span>
            </button>
          </div>
        </div>

        {/* ── Breadcrumb ── */}
        <div className="mb-5 flex flex-wrap items-center gap-1.5 text-sm">
          {crumbs.map((crumb, idx) => (
            <button
              key={`${crumb}-${idx}`}
              onClick={() => goTo(crumbs.slice(1, idx + 1))}
              className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:bg-indigo-50 hover:border-indigo-200 text-slate-600 hover:text-indigo-700 transition-all text-xs sm:text-sm"
            >
              {crumb || 'root'}
            </button>
          ))}
        </div>

        {/* ── Desktop Table (md and above) ── */}
        <div className="hidden md:block bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-50/80">
              <tr>
                <th className="text-left px-5 py-3.5 font-semibold text-slate-600">Name</th>
                <th className="text-left px-5 py-3.5 font-semibold text-slate-600">Size</th>
                <th className="text-left px-5 py-3.5 font-semibold text-slate-600">Type</th>
                <th className="text-left px-5 py-3.5 font-semibold text-slate-600">Modified</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td className="px-5 py-8 text-center text-slate-400" colSpan={4}>
                    Loading files...
                  </td>
                </tr>
              ) : files.length === 0 ? (
                <tr>
                  <td className="px-5 py-8 text-center text-slate-400" colSpan={4}>
                    This folder is empty.
                  </td>
                </tr>
              ) : (
                files.map((item, index) => (
                  <tr key={`${item.name}-${index}`} className="group border-t border-slate-100 hover:bg-slate-50/60 transition-colors">
                    <td className="px-5 py-3">
                      <button
                        className="flex items-center gap-2.5 text-left w-full"
                        onClick={() => {
                          if (item.type === 'folder') goTo([...pathState.split('/').filter(Boolean), item.name]);
                        }}
                      >
                        {item.type === 'folder' ? (
                          <Folder size={16} className="text-amber-500" />
                        ) : (
                          <FileText size={16} className="text-blue-500" />
                        )}
                        <span className="text-slate-700 font-medium">{item.name}</span>
                      </button>
                    </td>
                    <td className="px-5 py-3 text-slate-500">{item.size || '—'}</td>
                    <td className="px-5 py-3">
                      <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-600 capitalize">
                        {item.type}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-slate-500 text-xs">{item.modified || '—'}</span>
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

        {/* ── Mobile Cards (below md) ── */}
        <div className="md:hidden space-y-3">
          {isLoading ? (
            <div className="text-center py-10 text-slate-400 bg-white rounded-2xl border border-slate-200">
              Loading files...
            </div>
          ) : files.length === 0 ? (
            <div className="text-center py-10 text-slate-400 bg-white rounded-2xl border border-slate-200">
              This folder is empty.
            </div>
          ) : (
            files.map((item, index) => (
              <div
                key={`${item.name}-${index}`}
                className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm flex items-center justify-between gap-3"
              >
                <button
                  className="flex items-center gap-3 min-w-0 flex-1"
                  onClick={() => {
                    if (item.type === 'folder') goTo([...pathState.split('/').filter(Boolean), item.name]);
                  }}
                >
                  {item.type === 'folder' ? (
                    <Folder size={20} className="text-amber-500 shrink-0" />
                  ) : (
                    <FileText size={20} className="text-blue-500 shrink-0" />
                  )}
                  <div className="truncate">
                    <p className="text-sm font-medium text-slate-800 truncate">{item.name}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{item.size || '—'} · {item.modified || '—'}</p>
                  </div>
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); setDeleteTarget(item); }}
                  className="p-2 hover:bg-red-50 text-slate-400 hover:text-red-500 rounded-xl transition-all shrink-0"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* ════ Modals (unchanged logic, just improved UI) ════ */}

      {/* Create Folder Modal */}
      {createFolderOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-semibold text-slate-800 flex items-center gap-2.5">
                <FolderPlus size={20} className="text-indigo-600" />
                New Folder
              </h3>
              <button onClick={() => setCreateFolderOpen(false)} className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-600 transition-colors">
                <X size={18} />
              </button>
            </div>
            <input
              autoFocus
              type="text"
              value={inputName}
              onChange={(e) => setInputName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleCreateFolder()}
              placeholder="e.g. backups"
              className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 mb-5 transition-all"
            />
            <div className="flex gap-3">
              <button
                onClick={() => setCreateFolderOpen(false)}
                className="flex-1 py-2.5 border border-slate-200 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateFolder}
                disabled={createFolder.isPending}
                className="flex-1 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-700 disabled:opacity-50 transition-colors shadow-sm"
              >
                {createFolder.isPending ? 'Creating...' : 'Create'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create File Modal */}
      {createFileOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-semibold text-slate-800 flex items-center gap-2.5">
                <FilePlus size={20} className="text-indigo-600" />
                New File
              </h3>
              <button onClick={() => setCreateFileOpen(false)} className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-600 transition-colors">
                <X size={18} />
              </button>
            </div>
            <input
              autoFocus
              type="text"
              value={inputName}
              onChange={(e) => setInputName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleCreateFile()}
              placeholder="e.g. notes.txt"
              className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 mb-5 transition-all"
            />
            <div className="flex gap-3">
              <button
                onClick={() => setCreateFileOpen(false)}
                className="flex-1 py-2.5 border border-slate-200 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateFile}
                disabled={createFile.isPending}
                className="flex-1 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-700 disabled:opacity-50 transition-colors shadow-sm"
              >
                {createFile.isPending ? 'Creating...' : 'Create'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6">
            <div className="w-14 h-14 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-5">
              <Trash2 size={24} className="text-red-500" />
            </div>
            <h3 className="font-semibold text-slate-800 text-center mb-1.5">
              Delete {deleteTarget.type === 'folder' ? 'Folder' : 'File'}
            </h3>
            <p className="text-slate-500 text-sm text-center mb-6">
              <span className="font-medium text-slate-700">"{deleteTarget.name}"</span> will be permanently deleted. This cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteTarget(null)}
                className="flex-1 py-2.5 border border-slate-200 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={deleteItem.isPending}
                className="flex-1 py-2.5 bg-red-500 text-white rounded-xl text-sm font-semibold hover:bg-red-600 disabled:opacity-50 transition-colors shadow-sm"
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
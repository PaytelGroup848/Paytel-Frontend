import { useMemo, useState } from 'react';
import { useSearchParams, useParams } from 'react-router-dom';
import { Folder, FileText } from 'lucide-react';

import { useGetFiles } from '../../../hooks/useWordPress';

export default function FilesPage() {
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [pathState, setPathState] = useState(searchParams.get('path') || '');

  const { data: files = [], isLoading } = useGetFiles(id, pathState);

  const crumbs = useMemo(() => ['', ...pathState.split('/').filter(Boolean)], [pathState]);

  const goTo = (segments) => {
    const nextPath = segments.filter(Boolean).join('/');
    setPathState(nextPath);
    setSearchParams(nextPath ? { path: nextPath } : {});
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold text-slate-900 mb-4">File Manager</h1>
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
                  <tr key={`${item.name}-${index}`} className="border-t border-slate-100">
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
                    <td className="px-4 py-3">{item.modified}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

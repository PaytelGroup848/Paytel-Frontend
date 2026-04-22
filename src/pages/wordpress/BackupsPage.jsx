import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, HardDrive, Database, FolderOpen, RefreshCw, Download, DownloadIcon } from 'lucide-react';
import { useBackups, downloadBackupPdf } from '../../hooks/useWordPress';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function BackupsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, isError, refetch, isFetching } = useBackups(id);
  const [downloading, setDownloading] = useState(false);

  const handleDownloadPdf = async () => {
    if (!data) return;
    setDownloading(true);
    try {
      await downloadBackupPdf(id, data.domain);
      toast.success('PDF downloaded successfully!');
    } catch (err) {
      toast.error('Failed to download PDF');
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(`/wordpress/websitedashboard/${id}`)}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-500">
            <ArrowLeft size={18} />
          </button>
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-0.5">
              <span className="cursor-pointer hover:text-indigo-600"
                onClick={() => navigate(`/wordpress/websitedashboard/${id}`)}>
                {data?.domain || 'Website'}
              </span>
              <span>›</span>
              <span className="text-slate-800 font-medium">Backups</span>
            </div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                <HardDrive size={18} className="text-indigo-600" />
                Daily Backups
              </h1>
              <span className="text-xs bg-amber-50 text-amber-600 border border-amber-200 px-2 py-0.5 rounded-full">
                Last 7 days only
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleDownloadPdf}
            disabled={downloading || isLoading || !data}
            className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-medium transition-all disabled:opacity-50"
          >
            {downloading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Download size={14} />
                Download Report
              </>
            )}
          </button>
          <button onClick={() => refetch()} disabled={isFetching}
            className="flex items-center gap-1.5 px-3 py-2 border border-slate-200 rounded-xl text-sm text-slate-600 hover:bg-slate-50 disabled:opacity-50">
            <RefreshCw size={14} className={isFetching ? 'animate-spin' : ''} />
            Refresh
          </button>
        </div>
      </div>

      <div className="py-6 max-w-6xl mx-auto">
        {!isLoading && data && (
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-white rounded-xl border border-slate-200 px-5 py-4">
              <p className="text-xs text-slate-500 mb-1">Backups (Last 7 Days)</p>
              <p className="text-2xl font-bold text-slate-800">{data.totalBackups}</p>
            </div>
            <div className="bg-white rounded-xl border border-slate-200 px-5 py-4">
              <p className="text-xs text-slate-500 mb-1">Backup Server</p>
              <p className="text-sm font-medium text-slate-800 font-mono">{data.backupServerIp}</p>
            </div>
          </div>
        )}

        {isLoading && (
          <div className="grid grid-cols-2 gap-4 mb-6">
            {[1,2].map(i => <div key={i} className="h-20 bg-white rounded-xl border border-slate-200 animate-pulse" />)}
          </div>
        )}

        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100">
            <h3 className="text-sm font-semibold text-slate-800">Backup History</h3>
          </div>

          {isLoading && (
            <div className="divide-y divide-slate-100">
              {[1,2,3,4].map(i => (
                <div key={i} className="px-5 py-4 flex items-center gap-4">
                  <div className="h-9 w-9 bg-slate-100 rounded-lg animate-pulse" />
                  <div className="h-4 bg-slate-100 rounded animate-pulse flex-1" />
                  <div className="h-4 bg-slate-100 rounded animate-pulse w-16" />
                </div>
              ))}
            </div>
          )}

          {!isLoading && isError && (
            <div className="px-5 py-12 text-center">
              <HardDrive size={32} className="text-slate-300 mx-auto mb-3" />
              <p className="text-slate-500 text-sm">Failed to load backups.</p>
              <button onClick={() => refetch()} className="mt-3 text-indigo-600 text-sm hover:underline">Retry</button>
            </div>
          )}

          {!isLoading && !isError && data?.backups?.length === 0 && (
            <div className="px-5 py-12 text-center">
              <HardDrive size={32} className="text-slate-300 mx-auto mb-3" />
              <p className="text-slate-500 text-sm">No backups found in last 7 days.</p>
            </div>
          )}

          {!isLoading && data?.backups?.map(backup => (
            <div key={backup.id}
              className="px-5 py-4 flex items-center gap-4 border-b border-slate-50 hover:bg-slate-50 transition-colors">
              <div className="w-9 h-9 bg-indigo-50 rounded-lg flex items-center justify-center shrink-0">
                <HardDrive size={16} className="text-indigo-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-800 font-mono">{backup.name}</p>
                <div className="flex items-center gap-3 mt-1">
                  {backup.hasFiles && (
                    <span className="flex items-center gap-1 text-xs text-slate-500">
                      <FolderOpen size={11} /> Files
                    </span>
                  )}
                  {backup.hasDatabase && (
                    <span className="flex items-center gap-1 text-xs text-slate-500">
                      <Database size={11} /> Database
                    </span>
                  )}
                </div>
              </div>
              <div className="text-right shrink-0">
                <p className="text-sm font-medium text-slate-700">{backup.size}</p>
                <p className="text-xs text-slate-400 mt-0.5">Size</p>
              </div>
                <div className="text-right shrink-0">
                <p className="text-sm text-center font-medium text-green-700"><DownloadIcon size={18}/></p>
                <p className="text-xs text-green-400 mt-0.5">Download Zip</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
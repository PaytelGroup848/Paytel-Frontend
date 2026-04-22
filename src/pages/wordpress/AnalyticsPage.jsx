import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ArrowLeft, Download, BarChart2, Globe, Activity, RefreshCw } from 'lucide-react';
import { useAnalytics } from '../../hooks/useWordPress';
import jsPDF from 'jspdf';
import autoTable  from 'jspdf-autotable';

export default function AnalyticsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [logsPage, setLogsPage] = useState(1);

  const { data, isLoading, isError, refetch, isFetching } = useAnalytics(id, logsPage);

  const downloadPDF = () => {
    if (!data) return;
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text(`Traffic Analytics — ${data.domain}`, 14, 20);
    doc.setFontSize(11);
    doc.text(`Generated: ${new Date().toLocaleString()} | Last 7 days`, 14, 28);

   doc.autoTable({
      startY: 36,
      head: [['Metric', 'Value']],
      body: [
        ['Requests Today', String(data.todayRequests)],
        ['Requests This Week', String(data.weekRequests)],
        ['Bandwidth Today', `${data.bandwidthTodayMb} MB`],
      ],
    });

    if (data.recentLogs?.length) {
      doc.addPage();
      doc.setFontSize(13);
      doc.text('Recent Traffic Logs (Last 7 Days)', 14, 20);
      doc.autoTable({
        startY: 26,
        head: [['IP', 'Time', 'Method', 'URL', 'Status', 'Bytes']],
        body: data.recentLogs.map(l => [l.ip, l.time, l.method, l.url, l.status, l.bytes]),
        styles: { fontSize: 7 },
      });
    }

    if (data.topIps?.length) {
      doc.addPage();
      doc.setFontSize(13);
      doc.text('Top IP Addresses (Last 7 Days)', 14, 20);
      doc.autoTable({
        startY: 26,
        head: [['IP Address', 'Requests']],
        body: data.topIps.map(i => [i.ip, i.count]),
      });
    }

    doc.save(`analytics-${data.domain}-${new Date().toISOString().slice(0,10)}.pdf`);
  };

  const statusColor = (code) => {
    if (code?.startsWith('2')) return 'text-green-600 bg-green-50';
    if (code?.startsWith('3')) return 'text-blue-600 bg-blue-50';
    if (code?.startsWith('4')) return 'text-amber-600 bg-amber-50';
    if (code?.startsWith('5')) return 'text-red-600 bg-red-50';
    return 'text-slate-600 bg-slate-50';
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
              <span className="text-slate-800 font-medium">Analytics</span>
            </div>
            <h1 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
              <BarChart2 size={18} className="text-indigo-600" />
              Traffic Logs
              <span className="text-xs bg-amber-50 text-amber-600 border border-amber-200 px-2 py-0.5 rounded-full font-normal">
                Last 7 days
              </span>
            </h1>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => refetch()} disabled={isFetching}
            className="flex items-center gap-1.5 px-3 py-2 border border-slate-200 rounded-xl text-sm text-slate-600 hover:bg-slate-50 disabled:opacity-50">
            <RefreshCw size={14} className={isFetching ? 'animate-spin' : ''} />
            Refresh
          </button>
          <button onClick={downloadPDF} disabled={!data || isLoading}
            className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-medium disabled:opacity-50">
            <Download size={14} />
            Download PDF
          </button>
        </div>
      </div>

      <div className="px-6 py-6 max-w-7xl mx-auto space-y-6">
        {isLoading && (
          <div className="grid grid-cols-3 gap-4">
            {[1,2,3].map(i => (
              <div key={i} className="h-24 bg-white rounded-xl border border-slate-200 animate-pulse" />
            ))}
          </div>
        )}

        {!isLoading && isError && (
          <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
            <BarChart2 size={32} className="text-slate-300 mx-auto mb-3" />
            <p className="text-slate-500 text-sm">Failed to load analytics.</p>
            <button onClick={() => refetch()} className="mt-3 text-indigo-600 text-sm hover:underline">
              Retry
            </button>
          </div>
        )}

        {!isLoading && data && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white rounded-xl border border-slate-200 px-5 py-4">
                <p className="text-xs text-slate-500 mb-1">Requests Today</p>
                <p className="text-2xl font-bold text-slate-800">{data.todayRequests.toLocaleString()}</p>
              </div>
              <div className="bg-white rounded-xl border border-slate-200 px-5 py-4">
                <p className="text-xs text-slate-500 mb-1">Requests This Week</p>
                <p className="text-2xl font-bold text-slate-800">{data.weekRequests.toLocaleString()}</p>
              </div>
              <div className="bg-white rounded-xl border border-slate-200 px-5 py-4">
                <p className="text-xs text-slate-500 mb-1">Bandwidth Today</p>
                <p className="text-2xl font-bold text-slate-800">{data.bandwidthTodayMb} MB</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white rounded-xl border border-slate-200 p-5">
                <h3 className="text-sm font-semibold text-slate-800 mb-3 flex items-center gap-2">
                  <Activity size={15} className="text-indigo-600" />
                  Response Status Codes
                </h3>
                <div className="space-y-2">
                  {data.statusCodes?.map(item => (
                    <div key={item.code} className="flex items-center gap-3">
                      <span className={`text-xs font-mono px-2 py-0.5 rounded font-medium w-12 text-center ${statusColor(item.code)}`}>
                        {item.code}
                      </span>
                      <div className="flex-1 bg-slate-100 rounded-full h-1.5">
                        <div className="bg-indigo-500 h-1.5 rounded-full"
                          style={{ width: `${Math.min((item.count / (data.statusCodes[0]?.count || 1)) * 100, 100)}%` }} />
                      </div>
                      <span className="text-xs text-slate-600 font-medium w-12 text-right">
                        {item.count.toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl border border-slate-200 p-5">
                <h3 className="text-sm font-semibold text-slate-800 mb-3 flex items-center gap-2">
                  <Globe size={15} className="text-indigo-600" />
                  Top IP Addresses
                </h3>
                <div className="space-y-2">
                  {data.topIps?.map(item => (
                    <div key={item.ip} className="flex items-center gap-3">
                      <span className="text-xs font-mono text-slate-700 w-36 truncate">{item.ip}</span>
                      <div className="flex-1 bg-slate-100 rounded-full h-1.5">
                        <div className="bg-indigo-500 h-1.5 rounded-full"
                          style={{ width: `${Math.min((item.count / (data.topIps[0]?.count || 1)) * 100, 100)}%` }} />
                      </div>
                      <span className="text-xs text-slate-600 font-medium w-12 text-right">{item.count}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
              <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
                <h3 className="text-sm font-semibold text-slate-800">Recent Traffic Logs</h3>
                <span className="text-xs bg-amber-50 text-amber-600 border border-amber-200 px-2 py-0.5 rounded-full font-normal">
                Last 7 days
              </span>
                {/* <span className="text-xs text-slate-500">
                  Last {data.recentLogs?.length || 0} requests (7 days)
                </span> */}
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead className="bg-slate-50 border-b border-slate-100">
                    <tr>
                      {['IP', 'Time', 'Method', 'URL', 'Status', 'Size'].map(h => (
                        <th key={h} className="px-4 py-2 text-left text-slate-500 font-medium">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {data.recentLogs?.map((log, i) => (
                      <tr key={i} className="hover:bg-slate-50">
                        <td className="px-4 py-2 font-mono text-slate-700">{log.ip}</td>
                        <td className="px-4 py-2 text-slate-500 whitespace-nowrap">{log.time}</td>
                        <td className="px-4 py-2">
                          <span className={`px-1.5 py-0.5 rounded text-xs font-medium ${
                            log.method === 'GET' ? 'bg-blue-50 text-blue-600' :
                            log.method === 'POST' ? 'bg-green-50 text-green-600' :
                            'bg-slate-100 text-slate-600'
                          }`}>{log.method}</span>
                        </td>
                        <td className="px-4 py-2 font-mono text-slate-600 max-w-xs truncate">{log.url}</td>
                        <td className="px-4 py-2">
                          <span className={`px-1.5 py-0.5 rounded text-xs font-medium ${statusColor(log.status)}`}>
                            {log.status}
                          </span>
                        </td>
                        <td className="px-4 py-2 text-slate-500">{(log.bytes / 1024).toFixed(1)}KB</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {data?.pagination && data.pagination.totalPages > 1 && (
  <div className="px-5 py-3 border-t border-slate-100 flex items-center justify-between">
    <span className="text-xs text-slate-500">
      Showing {((data.pagination.page - 1) * data.pagination.limit) + 1}–
      {Math.min(data.pagination.page * data.pagination.limit, data.pagination.total)} of {data.pagination.total}
    </span>
    <div className="flex items-center gap-1">
      <button
        onClick={() => setLogsPage(p => Math.max(1, p - 1))}
        disabled={logsPage === 1 || isFetching}
        className="px-3 py-1.5 text-xs border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 disabled:opacity-40"
      >
        ← Prev
      </button>
      {Array.from({ length: data.pagination.totalPages }, (_, i) => i + 1)
        .filter(p => p === 1 || p === data.pagination.totalPages || Math.abs(p - logsPage) <= 1)
        .reduce((acc, p, idx, arr) => {
          if (idx > 0 && p - arr[idx - 1] > 1) acc.push('...');
          acc.push(p);
          return acc;
        }, [])
        .map((p, i) =>
          p === '...' ? (
            <span key={`dots-${i}`} className="px-2 text-xs text-slate-400">…</span>
          ) : (
            <button
              key={p}
              onClick={() => setLogsPage(p)}
              disabled={isFetching}
              className={`px-3 py-1.5 text-xs rounded-lg border ${
                logsPage === p
                  ? 'bg-indigo-600 text-white border-indigo-600'
                  : 'border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {p}
            </button>
          )
        )}
      <button
        onClick={() => setLogsPage(p => Math.min(data.pagination.totalPages, p + 1))}
        disabled={logsPage === data.pagination.totalPages || isFetching}
        className="px-3 py-1.5 text-xs border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 disabled:opacity-40"
      >
        Next →
      </button>
    </div>
  </div>
)}
      </div>
    </div>
  );
}
import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import {
  ArrowLeft,
  Download,
  BarChart2,
  Globe,
  Activity,
  RefreshCw,
  Loader2,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { useAnalytics } from '../../hooks/useWordPress';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const statusColor = (code) => {
  const value = String(code ?? '');

  if (value.startsWith('2')) return { bg: 'bg-emerald-50', text: 'text-emerald-700', stroke: '#10b981' };
  if (value.startsWith('3')) return { bg: 'bg-blue-50', text: 'text-blue-700', stroke: '#3b82f6' };
  if (value.startsWith('4')) return { bg: 'bg-amber-50', text: 'text-amber-700', stroke: '#f59e0b' };
  if (value.startsWith('5')) return { bg: 'bg-red-50', text: 'text-red-700', stroke: '#ef4444' };

  return { bg: 'bg-slate-50', text: 'text-slate-600', stroke: '#94a3b8' };
};

const methodColor = (method) => {
  const value = String(method ?? '').toUpperCase();

  if (value === 'GET') return 'bg-blue-50 text-blue-700';
  if (value === 'POST') return 'bg-green-50 text-green-700';
  if (value === 'PUT' || value === 'PATCH') return 'bg-violet-50 text-violet-700';
  if (value === 'DELETE') return 'bg-red-50 text-red-700';

  return 'bg-slate-100 text-slate-600';
};

const formatKb = (bytes) => {
  const value = Number(bytes) || 0;
  return `${(value / 1024).toFixed(1)} KB`;
};

function MetricCard({ label, value, unit, helper, icon: Icon, iconBg, iconText }) {
  return (
    <div className="flex min-w-0 items-center gap-3 rounded-lg border border-slate-200 bg-white p-3 shadow-sm transition-shadow hover:shadow-md sm:block sm:p-5">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg sm:mb-3 sm:h-8 sm:w-8">
        <span className={`flex h-9 w-9 items-center justify-center rounded-lg sm:h-8 sm:w-8 ${iconBg}`}>
          <Icon size={15} className={iconText} />
        </span>
      </div>
      <div className="min-w-0 flex-1">
        <span className="block text-[11px] font-semibold uppercase text-slate-500 sm:text-xs">
          {label}
        </span>
        <p className="mt-0.5 flex min-w-0 flex-wrap items-baseline gap-x-1 text-xl font-extrabold text-slate-800 sm:text-3xl">
          <span className="min-w-0 break-words">{value}</span>
          {unit && <span className="text-sm font-semibold text-slate-400 sm:text-xl">{unit}</span>}
        </p>
        <p className="mt-0.5 text-[11px] text-slate-400 sm:mt-1 sm:text-xs">{helper}</p>
      </div>
    </div>
  );
}

export default function AnalyticsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [logsPage, setLogsPage] = useState(1);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  const { data, isLoading, isError, refetch, isFetching } = useAnalytics(id, logsPage);

  const downloadPDF = async () => {
    if (!data) return;

    setIsGeneratingPDF(true);

    try {
      const doc = new jsPDF();
      doc.setFontSize(20);
      doc.text(`Traffic Analytics - ${data.domain}`, 14, 22);
      doc.setFontSize(11);
      doc.text(`Generated: ${new Date().toLocaleString()} | Last 7 days`, 14, 30);

      autoTable(doc, {
        startY: 40,
        head: [['Metric', 'Value']],
        body: [
          ['Requests Today', data.todayRequests.toLocaleString()],
          ['Requests This Week', data.weekRequests.toLocaleString()],
          ['Bandwidth Today', `${data.bandwidthTodayMb} MB`],
        ],
      });

      if (data.recentLogs?.length) {
        doc.addPage();
        doc.setFontSize(14);
        doc.text('Recent Traffic Logs (Last 7 Days)', 14, 20);
        autoTable(doc, {
          startY: 28,
          head: [['IP', 'Time', 'Method', 'URL', 'Status', 'Bytes']],
          body: data.recentLogs.map((log) => [
            log.ip,
            log.time,
            log.method,
            log.url,
            log.status,
            log.bytes,
          ]),
          styles: { fontSize: 7 },
        });
      }

      if (data.topIps?.length) {
        doc.addPage();
        doc.setFontSize(14);
        doc.text('Top IP Addresses (Last 7 Days)', 14, 20);
        autoTable(doc, {
          startY: 28,
          head: [['IP Address', 'Requests']],
          body: data.topIps.map((item) => [item.ip, item.count]),
        });
      }

      doc.save(`analytics-${data.domain}-${new Date().toISOString().slice(0, 10)}.pdf`);
    } catch (error) {
      console.error('PDF generation failed:', error);
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const totalStatusCount = data?.statusCodes?.reduce((sum, item) => sum + (Number(item.count) || 0), 0) || 0;
  const maxIpCount = Math.max(1, ...(data?.topIps?.map((item) => Number(item.count) || 0) ?? []));

  const pageItems = data?.pagination
    ? Array.from({ length: data.pagination.totalPages }, (_, index) => index + 1)
        .filter((page) => (
          page === 1
          || page === data.pagination.totalPages
          || Math.abs(page - logsPage) <= 1
        ))
        .reduce((items, page, index, pages) => {
          if (index > 0 && page - pages[index - 1] > 1) {
            items.push({ type: 'dots', key: `dots-${pages[index - 1]}-${page}` });
          }

          items.push({ type: 'page', key: `page-${page}`, value: page });
          return items;
        }, [])
    : [];

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden bg-[#F4F7FC]">
      <header className="sticky top-0 z-20 w-full border-b border-slate-200/70 bg-white/95 shadow-sm backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 px-3 py-3 sm:px-5 sm:py-4 md:flex-row md:items-center md:justify-between lg:px-6">
          <div className="flex min-w-0 items-start gap-2 sm:gap-3">
            <button
              type="button"
              onClick={() => navigate(`/wordpress/websitedashboard/${id}`)}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 shadow-sm transition-colors hover:bg-slate-50"
              aria-label="Back"
            >
              <ArrowLeft size={17} />
            </button>

            <div className="min-w-0 flex-1">
              <div className="mb-1 flex min-w-0 flex-wrap items-center gap-1 text-xs text-slate-500">
                <button
                  type="button"
                  className="min-w-0 max-w-[160px] truncate text-left font-medium transition-colors hover:text-indigo-600 sm:max-w-none"
                  onClick={() => navigate(`/wordpress/websitedashboard/${id}`)}
                >
                  {data?.domain || 'Website'}
                </button>
                <span className="shrink-0 text-slate-300">/</span>
                <span className="font-medium text-slate-800">Analytics</span>
              </div>

              <h1 className="flex min-w-0 flex-wrap items-center gap-2 text-base font-bold text-slate-800 sm:text-2xl">
                <BarChart2 size={19} className="shrink-0 text-indigo-600 sm:h-[22px] sm:w-[22px]" />
                <span className="min-w-0">Traffic Logs</span>
                <span className="rounded-full border border-amber-200 bg-amber-50 px-2 py-0.5 text-[11px] font-medium text-amber-700 sm:text-xs">
                  Last 7 days
                </span>
              </h1>
            </div>
          </div>

          <div className="grid w-full grid-cols-2 gap-2 sm:w-auto sm:flex sm:items-center">
            <button
              type="button"
              onClick={() => refetch()}
              disabled={isFetching}
              className="inline-flex min-h-9 items-center justify-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-600 shadow-sm transition-all hover:bg-slate-50 disabled:opacity-50"
            >
              <RefreshCw size={14} className={isFetching ? 'animate-spin' : ''} />
              <span>Refresh</span>
            </button>

            <button
              type="button"
              onClick={downloadPDF}
              disabled={!data || isLoading || isGeneratingPDF}
              className="inline-flex min-h-9 items-center justify-center gap-1.5 rounded-lg bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition-all hover:bg-indigo-700 disabled:opacity-50 sm:px-5"
            >
              {isGeneratingPDF ? (
                <Loader2 size={14} className="animate-spin" />
              ) : (
                <Download size={14} />
              )}
              <span>{isGeneratingPDF ? 'Exporting' : 'PDF'}</span>
              <span className="hidden sm:inline">Download</span>
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl space-y-4 px-3 py-4 sm:space-y-6 sm:px-5 sm:py-8 lg:px-6">
        {isLoading && (
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-3 sm:gap-4">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-20 rounded-lg border border-slate-200 bg-white shadow-sm sm:h-28"
              >
                <div className="h-full animate-pulse rounded-lg bg-slate-100/70" />
              </div>
            ))}
          </div>
        )}

        {!isLoading && isError && (
          <div className="rounded-lg border border-slate-200 bg-white p-6 text-center shadow-sm sm:p-12">
            <BarChart2 size={40} className="mx-auto mb-4 text-slate-300" />
            <p className="font-medium text-slate-500">Failed to load analytics data.</p>
            <button
              type="button"
              onClick={() => refetch()}
              className="mt-4 inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-700"
            >
              <RefreshCw size={14} />
              Retry
            </button>
          </div>
        )}

        {!isLoading && data && (
          <>
            <section className="grid grid-cols-1 gap-2 sm:grid-cols-3 sm:gap-4">
              <MetricCard
                label="Requests Today"
                value={data.todayRequests.toLocaleString()}
                helper="Last 24 hours"
                icon={Activity}
                iconBg="bg-indigo-50"
                iconText="text-indigo-600"
              />
              <MetricCard
                label="This Week"
                value={data.weekRequests.toLocaleString()}
                helper="Total requests"
                icon={BarChart2}
                iconBg="bg-emerald-50"
                iconText="text-emerald-600"
              />
              <MetricCard
                label="Bandwidth Today"
                value={data.bandwidthTodayMb}
                unit="MB"
                helper="Data transferred"
                icon={Globe}
                iconBg="bg-sky-50"
                iconText="text-sky-600"
              />
            </section>

            <section className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              <div className="min-w-0 rounded-lg border border-slate-200 bg-white p-3 shadow-sm sm:p-5">
                <h3 className="mb-3 flex min-w-0 flex-wrap items-center gap-2 text-sm font-semibold text-slate-800 sm:mb-4">
                  <Activity size={16} className="shrink-0 text-indigo-600" />
                  <span>Response Status Codes</span>
                  {totalStatusCount > 0 && (
                    <span className="rounded-full bg-slate-50 px-2 py-0.5 text-xs font-normal text-slate-400 sm:ml-auto">
                      Total: {totalStatusCount.toLocaleString()}
                    </span>
                  )}
                </h3>

                <div className="space-y-3">
                  {data.statusCodes?.map((item) => {
                    const { bg, text, stroke } = statusColor(item.code);
                    const count = Number(item.count) || 0;
                    const percentage = totalStatusCount > 0 ? (count / totalStatusCount) * 100 : 0;

                    return (
                      <div key={String(item.code)} className="min-w-0">
                        <div className="mb-1 flex min-w-0 items-center justify-between gap-3 text-xs">
                          <div className="flex min-w-0 items-center gap-2">
                            <span className={`rounded-md px-2 py-0.5 font-mono font-bold ${bg} ${text}`}>
                              {item.code}
                            </span>
                            <span className="text-[11px] font-medium text-slate-500">
                              {percentage.toFixed(1)}%
                            </span>
                          </div>
                          <span className="shrink-0 font-medium tabular-nums text-slate-600">
                            {count.toLocaleString()}
                          </span>
                        </div>
                        <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                          <div
                            className="h-full rounded-full transition-all duration-700"
                            style={{ width: `${percentage}%`, backgroundColor: stroke }}
                          />
                        </div>
                      </div>
                    );
                  })}

                  {(!data.statusCodes || data.statusCodes.length === 0) && (
                    <p className="py-4 text-center text-xs text-slate-400">
                      No status code data available
                    </p>
                  )}
                </div>
              </div>

              <div className="min-w-0 rounded-lg border border-slate-200 bg-white p-3 shadow-sm sm:p-5">
                <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-800 sm:mb-4">
                  <Globe size={16} className="shrink-0 text-indigo-600" />
                  Top IP Addresses
                </h3>

                <div className="space-y-3">
                  {data.topIps?.map((item) => {
                    const count = Number(item.count) || 0;
                    const percentage = (count / maxIpCount) * 100;

                    return (
                      <div key={item.ip} className="min-w-0">
                        <div className="mb-1 flex min-w-0 items-center justify-between gap-3 text-xs">
                          <span className="min-w-0 flex-1 truncate rounded-md border border-slate-100 bg-slate-50 px-2 py-1 font-mono text-slate-700">
                            {item.ip}
                          </span>
                          <span className="shrink-0 font-semibold tabular-nums text-slate-600">
                            {count.toLocaleString()}
                          </span>
                        </div>
                        <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-emerald-500 transition-all duration-700"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}

                  {(!data.topIps || data.topIps.length === 0) && (
                    <p className="py-4 text-center text-xs text-slate-400">
                      No IP data available
                    </p>
                  )}
                </div>
              </div>
            </section>

            <section className="min-w-0 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 px-3 py-3 sm:px-5 sm:py-4">
                <h3 className="text-sm font-semibold text-slate-800">Recent Traffic Logs</h3>
                <span className="rounded-full border border-amber-200 bg-amber-50 px-2.5 py-0.5 text-xs font-medium text-amber-700">
                  Last 7 days
                </span>
              </div>

              <div className="hidden md:block">
                <table className="w-full table-fixed text-xs">
                  <colgroup>
                    <col className="w-[17%]" />
                    <col className="w-[18%]" />
                    <col className="w-[11%]" />
                    <col className="w-[32%]" />
                    <col className="w-[11%]" />
                    <col className="w-[11%]" />
                  </colgroup>
                  <thead className="border-b border-slate-100 bg-slate-50/80">
                    <tr>
                      {['IP', 'Time', 'Method', 'URL', 'Status', 'Size'].map((heading) => (
                        <th
                          key={heading}
                          className="px-4 py-3 text-left text-[11px] font-semibold uppercase text-slate-500"
                        >
                          {heading}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {data.recentLogs?.map((log, index) => {
                      const { bg, text } = statusColor(log.status);

                      return (
                        <tr key={`${log.ip}-${log.time}-${index}`} className="transition-colors hover:bg-slate-50/70">
                          <td className="truncate px-4 py-3 font-mono text-slate-700">{log.ip}</td>
                          <td className="truncate px-4 py-3 text-slate-500">{log.time}</td>
                          <td className="px-4 py-3">
                            <span className={`rounded-md px-2 py-0.5 text-[10px] font-bold uppercase ${methodColor(log.method)}`}>
                              {log.method}
                            </span>
                          </td>
                          <td className="truncate px-4 py-3 font-mono text-slate-600">{log.url}</td>
                          <td className="px-4 py-3">
                            <span className={`rounded-md px-2 py-0.5 text-[10px] font-bold ${bg} ${text}`}>
                              {log.status}
                            </span>
                          </td>
                          <td className="truncate px-4 py-3 text-slate-500">{formatKb(log.bytes)}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <div className="divide-y divide-slate-100 md:hidden">
                {data.recentLogs?.map((log, index) => {
                  const { bg, text } = statusColor(log.status);

                  return (
                    <article key={`${log.ip}-${log.time}-${index}`} className="min-w-0 p-3">
                      <div className="flex min-w-0 items-start justify-between gap-3">
                        <div className="min-w-0 flex-1">
                          <p className="break-all font-mono text-[11px] font-semibold text-slate-700">
                            {log.ip}
                          </p>
                          <p className="mt-0.5 text-[11px] text-slate-500">{log.time}</p>
                        </div>
                        <span className={`shrink-0 rounded-md px-2 py-0.5 text-[10px] font-bold ${bg} ${text}`}>
                          {log.status}
                        </span>
                      </div>

                      <div className="mt-2 flex min-w-0 flex-wrap items-center gap-2">
                        <span className={`rounded-md px-2 py-0.5 text-[10px] font-bold uppercase ${methodColor(log.method)}`}>
                          {log.method}
                        </span>
                        <span className="rounded-md bg-slate-50 px-2 py-0.5 text-[11px] font-medium text-slate-500">
                          {formatKb(log.bytes)}
                        </span>
                      </div>

                      <p className="mt-2 min-w-0 break-all rounded-md bg-slate-50 p-2 font-mono text-[11px] leading-5 text-slate-600">
                        {log.url}
                      </p>
                    </article>
                  );
                })}
              </div>

              {(!data.recentLogs || data.recentLogs.length === 0) && (
                <p className="px-3 py-6 text-center text-xs text-slate-400">
                  No recent logs available
                </p>
              )}
            </section>

            {data?.pagination && data.pagination.totalPages > 1 && (
              <section className="rounded-lg border border-slate-200 bg-white px-3 py-3 shadow-sm sm:px-5 sm:py-4">
                <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
                  <span className="text-center text-xs text-slate-500 sm:text-left">
                    Showing {((data.pagination.page - 1) * data.pagination.limit) + 1}-
                    {Math.min(data.pagination.page * data.pagination.limit, data.pagination.total)} of {data.pagination.total} entries
                  </span>

                  <div className="flex w-full items-center justify-between gap-2 sm:hidden">
                    <button
                      type="button"
                      onClick={() => setLogsPage((page) => Math.max(1, page - 1))}
                      disabled={logsPage === 1 || isFetching}
                      className="inline-flex min-h-9 items-center gap-1 rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-600 transition hover:bg-slate-50 disabled:opacity-40"
                    >
                      <ChevronLeft size={14} />
                      Prev
                    </button>
                    <span className="text-xs font-semibold text-slate-600">
                      {logsPage} / {data.pagination.totalPages}
                    </span>
                    <button
                      type="button"
                      onClick={() => setLogsPage((page) => Math.min(data.pagination.totalPages, page + 1))}
                      disabled={logsPage === data.pagination.totalPages || isFetching}
                      className="inline-flex min-h-9 items-center gap-1 rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-600 transition hover:bg-slate-50 disabled:opacity-40"
                    >
                      Next
                      <ChevronRight size={14} />
                    </button>
                  </div>

                  <div className="hidden items-center justify-center gap-1 sm:flex">
                    <button
                      type="button"
                      onClick={() => setLogsPage((page) => Math.max(1, page - 1))}
                      disabled={logsPage === 1 || isFetching}
                      className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 transition hover:bg-slate-50 disabled:opacity-40"
                    >
                      <ChevronLeft size={14} />
                      Prev
                    </button>

                    {pageItems.map((item) => (
                      item.type === 'dots' ? (
                        <span key={item.key} className="px-1 text-xs text-slate-400">...</span>
                      ) : (
                        <button
                          key={item.key}
                          type="button"
                          onClick={() => setLogsPage(item.value)}
                          disabled={isFetching}
                          className={`min-w-[34px] rounded-lg border px-3 py-1.5 text-xs font-medium transition-all ${
                            logsPage === item.value
                              ? 'border-indigo-600 bg-indigo-600 text-white shadow-md shadow-indigo-100'
                              : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                          }`}
                        >
                          {item.value}
                        </button>
                      )
                    ))}

                    <button
                      type="button"
                      onClick={() => setLogsPage((page) => Math.min(data.pagination.totalPages, page + 1))}
                      disabled={logsPage === data.pagination.totalPages || isFetching}
                      className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 transition hover:bg-slate-50 disabled:opacity-40"
                    >
                      Next
                      <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              </section>
            )}
          </>
        )}
      </main>
    </div>
  );
}
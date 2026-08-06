import React, { useState } from 'react';
import { X, Check, Copy, RefreshCw, Loader2, AlertCircle, CheckCircle, XCircle, Clock } from 'lucide-react';
import { useDnsRecords, useDnsStatus } from '../../hooks/useEmailHosting';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function DkimVerificationModal({ emailOrderId, isOpen, onClose, onVerified }) {
  const { data: dnsRecords, isLoading: isDnsLoading } = useDnsRecords(emailOrderId);
  const { data: dnsStatus, isLoading: isStatusLoading, refetch: refetchStatus } = useDnsStatus(emailOrderId);
  const [expandedDkim, setExpandedDkim] = useState(false);
  const navigate= useNavigate()

  if (!isOpen) return null;

  const copyToClipboard = (text, label) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied!`);
  };

  const handleCheckDns = async () => {
    const result = await refetchStatus();
    if (result.data?.allVerified) {
      toast.success('All DNS records verified! Email hosting activated.');
      onVerified();
    } else {
      toast.error('Some DNS records are not yet propagated. Please wait and try again.');
    }
  };

  const getStatusIcon = (verified) => {
    if (verified === true) return <CheckCircle size={16} className="text-green-500" />;
    if (verified === false) return <XCircle size={16} className="text-red-500" />;
    return <Clock size={16} className="text-amber-500" />;
  };

  const getStatusBadge = (verified) => {
    if (verified === true) return { text: 'Verified', color: '#10B981', bg: '#D1FAE5' };
    if (verified === false) return { text: 'Not Verified', color: '#EF4444', bg: '#FEE2E2' };
    return { text: 'Checking...', color: '#F59E0B', bg: '#FEF3C7' };
  };

  const allVerified = dnsStatus?.allVerified === true;

  // DNS Records array
  const dnsRecordsList = [
    { 
      name: dnsRecords?.mx?.name,
      type: 'MX',
      correctData: `${dnsRecords?.mx?.priority} ${dnsRecords?.mx?.correctData}`,
      statusKey: 'mx'
    },
    { 
      name: dnsRecords?.autodiscoverCname?.name,
      type: 'CNAME',
      correctData: dnsRecords?.autodiscoverCname?.correctData,
      statusKey: 'autodiscoverCname'
    },
    { 
      name: dnsRecords?.autodiscoverSrv?.name,
      type: 'SRV',
      correctData: dnsRecords?.autodiscoverSrv?.correctData,
      statusKey: 'autodiscoverSrv'
    },
    { 
      name: dnsRecords?.autoconfigCname?.name,
      type: 'CNAME',
      correctData: dnsRecords?.autoconfigCname?.correctData,
      statusKey: 'autoconfigCname'
    },
    { 
      name: dnsRecords?.spf?.name,
      type: 'TXT',
      correctData: dnsRecords?.spf?.correctData,
      statusKey: 'spf'
    },
    { 
      name: dnsRecords?.dmarc?.name,
      type: 'TXT',
      correctData: dnsRecords?.dmarc?.correctData,
      statusKey: 'dmarc'
    },
    { 
      name: dnsRecords?.dkim?.name,
      type: 'TXT',
      correctData: dnsRecords?.dkim?.correctData,
      statusKey: 'dkim'
    }
  ];

  const getCurrentData = (record) => {
    if (!dnsStatus) return '—';
    switch (record.statusKey) {
      case 'mx': return dnsStatus.mx?.current?.join(', ') || '—';
      case 'spf': return dnsStatus.spf?.current || '—';
      case 'dkim': return dnsStatus.dkim?.current || '—';
      case 'autodiscoverCname': return dnsStatus.autodiscoverCname?.current || '—';
      case 'autodiscoverSrv': return dnsStatus.autodiscoverSrv?.current || '—';
      case 'autoconfigCname': return dnsStatus.autoconfigCname?.current || '—';
      case 'dmarc': return dnsStatus.dmarc?.current || '—';
      default: return '—';
    }
  };

  const isRecordVerified = (record) => {
    if (!dnsStatus) return null;
    switch (record.statusKey) {
      case 'mx': return dnsStatus.mx?.verified;
      case 'spf': return dnsStatus.spf?.verified;
      case 'dkim': return dnsStatus.dkim?.verified;
      case 'autodiscoverCname': return dnsStatus.autodiscoverCname?.verified;
      case 'autodiscoverSrv': return dnsStatus.autodiscoverSrv?.verified;
      case 'autoconfigCname': return dnsStatus.autoconfigCname?.verified;
      case 'dmarc': return dnsStatus.dmarc?.verified;
      default: return null;
    }
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 5000,
      background: 'rgba(15, 23, 42, 0.7)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px 16px',
      overflowY: 'auto',
    }}>
      <div style={{
        background: '#FFFFFF',
        borderRadius: '16px',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        width: '100%',
        maxWidth: '700px',
        display: 'flex',
        flexDirection: 'column',
        maxHeight: '90vh',
        overflow: 'hidden',
        position: 'relative',
        zIndex: 5001,
      }}>
        {/* Header */}
        <div style={{
          padding: '24px 20px',
          borderBottom: '1px solid #E2E8F0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          gap: '16px',
        }}>
          <div>
            <h2 style={{
              fontSize: '22px',
              fontWeight: '600',
              color: '#0F172A',
              margin: '0 0 8px 0',
            }}>DNS Records Verification</h2>
            <p style={{
              fontSize: '13px',
              color: '#64748B',
              margin: 0,
              lineHeight: '1.5',
            }}>
              DNS changes can take upto 48hrs to propagate. This page auto-refreshes every 2 minutes.
            </p>
          </div>
          <button 
            onClick={onClose} 
            style={{
              background: 'transparent',
              border: 'none',
              padding: '8px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#64748B',
              flexShrink: 0,
            }}
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div style={{
          padding: '24px 20px',
          overflowY: 'auto',
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
        }}>
          {isDnsLoading || isStatusLoading ? (
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '60px 20px',
              color: '#4F46E5',
            }}>
              <Loader2 size={32} style={{ animation: 'spin 1s linear infinite' }} />
            </div>
          ) : (
            <>
              {/* Desktop Table View */}
              <div style={{ display: 'none' }} className="hidden md:block">
                <div style={{
                  overflowX: 'auto',
                  borderRadius: '12px',
                  border: '1px solid #E2E8F0',
                }}>
                  <table style={{
                    width: '100%',
                    borderCollapse: 'collapse',
                    fontSize: '13px',
                  }}>
                    <thead>
                      <tr style={{ background: '#F8FAFC' }}>
                        <th style={{
                          textAlign: 'left',
                          padding: '12px',
                          borderBottom: '1px solid #E2E8F0',
                          fontWeight: '600',
                          color: '#475569',
                          fontSize: '12px',
                        }}>Name</th>
                        <th style={{
                          textAlign: 'left',
                          padding: '12px',
                          borderBottom: '1px solid #E2E8F0',
                          fontWeight: '600',
                          color: '#475569',
                          fontSize: '12px',
                        }}>Type</th>
                        <th style={{
                          textAlign: 'left',
                          padding: '12px',
                          borderBottom: '1px solid #E2E8F0',
                          fontWeight: '600',
                          color: '#475569',
                          fontSize: '12px',
                        }}>Correct Data</th>
                        <th style={{
                          textAlign: 'left',
                          padding: '12px',
                          borderBottom: '1px solid #E2E8F0',
                          fontWeight: '600',
                          color: '#475569',
                          fontSize: '12px',
                        }}>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dnsRecordsList.map((record, index) => (
                        <tr key={index} style={{ borderBottom: '1px solid #F1F5F9' }}>
                          <td style={{ padding: '12px', color: '#0F172A' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <code style={{
                                fontSize: '12px',
                                background: '#F8FAFC',
                                padding: '4px 8px',
                                borderRadius: '4px',
                                color: '#4F46E5',
                                wordBreak: 'break-all',
                              }}>{record.name}</code>
                              <button
                                onClick={() => copyToClipboard(record.name, 'Name')}
                                style={{
                                  background: 'none',
                                  border: 'none',
                                  cursor: 'pointer',
                                  color: '#94A3B8',
                                  padding: '4px',
                                  display: 'flex',
                                  alignItems: 'center',
                                }}
                                title="Copy name"
                              >
                                <Copy size={14} />
                              </button>
                            </div>
                          </td>
                          <td style={{ padding: '12px' }}>
                            <span style={{
                              display: 'inline-block',
                              padding: '4px 10px',
                              borderRadius: '6px',
                              fontSize: '11px',
                              fontWeight: '600',
                              backgroundColor: record.type === 'MX' ? '#E0E7FF' : record.type === 'TXT' ? '#FEF3C7' : '#D1FAE5',
                              color: record.type === 'MX' ? '#4338CA' : record.type === 'TXT' ? '#92400E' : '#065F46',
                            }}>{record.type}</span>
                          </td>
                          <td style={{ padding: '12px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <code style={{
                                fontSize: '11px',
                                background: '#F8FAFC',
                                padding: '6px 8px',
                                borderRadius: '4px',
                                color: '#0F172A',
                                wordBreak: 'break-all',
                                maxWidth: '200px',
                              }}>{record.correctData}</code>
                              <button
                                onClick={() => copyToClipboard(record.correctData, 'Data')}
                                style={{
                                  background: 'none',
                                  border: 'none',
                                  cursor: 'pointer',
                                  color: '#94A3B8',
                                  padding: '4px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  flexShrink: 0,
                                }}
                                title="Copy data"
                              >
                                <Copy size={14} />
                              </button>
                            </div>
                          </td>
                          <td style={{ padding: '12px' }}>
                            <div style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '6px',
                              padding: '4px 10px',
                              borderRadius: '20px',
                              fontSize: '11px',
                              fontWeight: '600',
                              backgroundColor: getStatusBadge(isRecordVerified(record)).bg,
                              color: getStatusBadge(isRecordVerified(record)).color,
                            }}>
                              {getStatusIcon(isRecordVerified(record))}
                              <span>{getStatusBadge(isRecordVerified(record)).text}</span>
                            </div>
                            {getCurrentData(record) !== '—' && (
                              <div style={{
                                fontSize: '11px',
                                color: '#94A3B8',
                                marginTop: '4px',
                                wordBreak: 'break-word',
                              }}>
                                Current: {getCurrentData(record)}
                              </div>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Mobile Card View */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }} className="md:hidden">
                {dnsRecordsList.map((record, index) => (
                  <div
                    key={index}
                    style={{
                      background: '#F8FAFC',
                      border: '1px solid #E2E8F0',
                      borderRadius: '12px',
                      padding: '16px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '12px',
                    }}
                  >
                    {/* Type Badge */}
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      gap: '12px',
                    }}>
                      <span style={{
                        display: 'inline-block',
                        padding: '4px 10px',
                        borderRadius: '6px',
                        fontSize: '11px',
                        fontWeight: '600',
                        backgroundColor: record.type === 'MX' ? '#E0E7FF' : record.type === 'TXT' ? '#FEF3C7' : '#D1FAE5',
                        color: record.type === 'MX' ? '#4338CA' : record.type === 'TXT' ? '#92400E' : '#065F46',
                      }}>{record.type}</span>
                      <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '4px 10px',
                        borderRadius: '20px',
                        fontSize: '11px',
                        fontWeight: '600',
                        backgroundColor: getStatusBadge(isRecordVerified(record)).bg,
                        color: getStatusBadge(isRecordVerified(record)).color,
                      }}>
                        {getStatusIcon(isRecordVerified(record))}
                        <span>{getStatusBadge(isRecordVerified(record)).text}</span>
                      </div>
                    </div>

                    {/* Name */}
                    <div>
                      <p style={{
                        fontSize: '11px',
                        color: '#64748B',
                        margin: '0 0 6px 0',
                        fontWeight: '500',
                      }}>Name</p>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                      }}>
                        <code style={{
                          fontSize: '12px',
                          background: '#E2E8F0',
                          padding: '8px 10px',
                          borderRadius: '6px',
                          color: '#4F46E5',
                          wordBreak: 'break-all',
                          flex: 1,
                          fontFamily: 'monospace',
                        }}>{record.name}</code>
                        <button
                          onClick={() => copyToClipboard(record.name, 'Name')}
                          style={{
                            background: 'white',
                            border: '1px solid #E2E8F0',
                            cursor: 'pointer',
                            color: '#4F46E5',
                            padding: '8px',
                            borderRadius: '6px',
                            display: 'flex',
                            alignItems: 'center',
                            flexShrink: 0,
                          }}
                          title="Copy name"
                        >
                          <Copy size={14} />
                        </button>
                      </div>
                    </div>

                    {/* Data */}
                    <div>
                      <p style={{
                        fontSize: '11px',
                        color: '#64748B',
                        margin: '0 0 6px 0',
                        fontWeight: '500',
                      }}>Value</p>
                      <div style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '8px',
                      }}>
                        <code style={{
                          fontSize: '11px',
                          background: '#E2E8F0',
                          padding: '8px 10px',
                          borderRadius: '6px',
                          color: '#0F172A',
                          wordBreak: 'break-word',
                          flex: 1,
                          fontFamily: 'monospace',
                        }}>{record.correctData}</code>
                        <button
                          onClick={() => copyToClipboard(record.correctData, 'Value')}
                          style={{
                            background: 'white',
                            border: '1px solid #E2E8F0',
                            cursor: 'pointer',
                            color: '#4F46E5',
                            padding: '8px',
                            borderRadius: '6px',
                            display: 'flex',
                            alignItems: 'center',
                            flexShrink: 0,
                          }}
                          title="Copy value"
                        >
                          <Copy size={14} />
                        </button>
                      </div>
                    </div>

                    {/* Current State */}
                    {getCurrentData(record) !== '—' && (
                      <div style={{
                        background: '#FFFFFF',
                        border: '1px solid #E2E8F0',
                        borderRadius: '6px',
                        padding: '8px 10px',
                      }}>
                        <p style={{
                          fontSize: '10px',
                          color: '#64748B',
                          margin: '0 0 4px 0',
                          fontWeight: '500',
                        }}>Current Value</p>
                        <code style={{
                          fontSize: '11px',
                          color: '#0F172A',
                          wordBreak: 'break-word',
                          fontFamily: 'monospace',
                        }}>{getCurrentData(record)}</code>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Info Alert */}
          <div style={{
            background: '#FFFBEB',
            border: '1px solid #FCD34D',
            borderRadius: '12px',
            padding: '12px 16px',
            display: 'flex',
            gap: '12px',
            alignItems: 'flex-start',
          }}>
            <AlertCircle size={18} color="#D97706" style={{ flexShrink: 0, marginTop: '2px' }} />
            <p style={{
              fontSize: '13px',
              color: '#92400E',
              lineHeight: '1.5',
              margin: 0,
            }}>
              <strong>Note:</strong> DNS propagation typically takes upto 48hrs. Your records status will auto-refresh every 2 minutes.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div style={{
          padding: '16px 20px',
          borderTop: '1px solid #E2E8F0',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          background: '#F8FAFC',
        }}>
          {allVerified ? (
            <button
                onClick={() => {
    onVerified();
    navigate("/emails");
  }}
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: '10px',
                border: 'none',
                background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                color: 'white',
                fontWeight: '600',
                fontSize: '14px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
              }}
            >
              <CheckCircle size={16} /> All DNS Records Verified
            </button>
          ) : (
            <>
              <button
                onClick={handleCheckDns}
                disabled={isStatusLoading}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: '10px',
                  border: 'none',
                  background: isStatusLoading ? '#D1D5DB' : 'linear-gradient(135deg, #4F46E5 0%, #3e38ad 100%)',
                  color: 'white',
                  fontWeight: '600',
                  fontSize: '14px',
                  cursor: isStatusLoading ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  opacity: isStatusLoading ? 0.7 : 1,
                }}
              >
                {isStatusLoading ? (
                  <>
                    <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} />
                    Checking Records...
                  </>
                ) : (
                  <>
                    <RefreshCw size={16} /> Check DNS Records
                  </>
                )}
              </button>
              <button
                onClick={() => {
    onClose;
    navigate("/emails");
  }}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: '10px',
                  border: '1px solid #E2E8F0',
                  background: 'white',
                  color: '#64748B',
                  fontWeight: '500',
                  fontSize: '13px',
                  cursor: 'pointer',
                }}
              >
                I'll do this later
              </button>
            </>
          )}
        </div>
      </div>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @media (max-width: 768px) {
          .hidden { display: none !important; }
          .md\\:block { display: block !important; }
          .md\\:hidden { display: none !important; }
        }
      `}</style>
    </div>
  );
}
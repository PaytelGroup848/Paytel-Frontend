import React, { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Terminal, Power, RefreshCw, ArrowUpCircle, Clock, Shield, 
  Key, Camera, Cpu, MemoryStick, HardDrive, Download, 
  Upload, Activity, Globe, User, Copy, Check, ExternalLink 
} from 'lucide-react';
import { 
  LineChart, Line, ResponsiveContainer, YAxis, Tooltip 
} from 'recharts';
import { 
  useVpsInstance, useVpsStats, useStartVps, 
  useStopVps, useRebootVps 
} from '../../hooks/useVps';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import toast from 'react-hot-toast';

const StatChart = ({ data, color, dataKey = "value" }) => (
  <div className="h-16 w-full">
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <Line 
          type="monotone" 
          dataKey={dataKey} 
          stroke={color} 
          strokeWidth={2} 
          dot={false} 
          isAnimationActive={false}
        />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

const DetailRow = ({ label, value, copyable = false }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    toast.success(`${label} copied!`);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex items-center justify-between py-3 border-b border-border last:border-0">
      <span className="text-textMuted text-sm">{label}</span>
      <div className="flex items-center gap-2">
        <span className="font-semibold text-sm">{value}</span>
        {copyable && (
          <button onClick={handleCopy} className="text-textMuted hover:text-primary transition-colors">
            {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
          </button>
        )}
      </div>
    </div>
  );
};

export default function VpsOverview() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const { data: instance, isLoading: isInstanceLoading } = useVpsInstance(id);
  const { data: statsData, isLoading: isStatsLoading } = useVpsStats(id);
  
  const startVps = useStartVps();
  const stopVps = useStopVps();
  const rebootVps = useRebootVps();

  // Generate some dummy sparkline data based on current stats if available
  const generateChartData = (currentValue) => {
    return Array.from({ length: 10 }).map((_, i) => ({
      value: (currentValue || 0) * (0.8 + Math.random() * 0.4)
    }));
  };

  if (isInstanceLoading) {
    return <div className="p-8 text-center">Loading instance details...</div>;
  }

  if (!instance) {
    return <div className="p-8 text-center text-red-500">Instance not found.</div>;
  }

  const stats = statsData?.stats || {};

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12">
      {/* Breadcrumbs & Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-bold text-textMuted uppercase tracking-widest">
            <span className="hover:text-primary cursor-pointer" onClick={() => navigate('/vps/paid')}>VPS</span>
            <span>/</span>
            <span className="text-primary">Overview</span>
          </div>
          <h1 className="text-3xl font-bold">VPS management · real-time metrics</h1>
        </div>
        <div className="flex items-center gap-3">
          <Button 
            variant="primary" 
            onClick={() => rebootVps.mutate(id)}
            loading={rebootVps.isPending}
            className="flex items-center gap-2"
          >
            <RefreshCw size={18} /> Reboot VPS
          </Button>
        </div>
      </div>

      {/* Main Status Card */}
      <Card className="bg-bgLighter border-primary/20">
        <div className="flex flex-col lg:flex-row justify-between gap-8">
          <div className="space-y-6 flex-1">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                <Globe size={24} />
              </div>
              <div>
                <h2 className="text-xl font-bold">{instance.os}</h2>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="success" className="flex items-center gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    KVM | Running
                  </Badge>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-bgLight p-4 rounded-xl border border-border">
                <div className="text-[10px] text-textMuted font-bold uppercase tracking-wider mb-2">Root Access</div>
                <div className="flex items-center justify-between">
                  <code className="text-sm font-mono text-primary">ssh root@{instance.ip}</code>
                  <button 
                    onClick={() => {
                      navigator.clipboard.writeText(`ssh root@${instance.ip}`);
                      toast.success('SSH command copied!');
                    }}
                    className="p-1.5 hover:bg-primary/10 rounded-lg transition-all"
                  >
                    <Copy size={14} />
                  </button>
                </div>
              </div>
              <div className="bg-bgLight p-4 rounded-xl border border-border">
                <div className="text-[10px] text-textMuted font-bold uppercase tracking-wider mb-2">Root Password</div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold">••••••••••••</span>
                  <button className="text-xs text-primary font-bold hover:underline">Change</button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap lg:flex-col justify-center gap-3">
            <Button 
              variant="danger" 
              className="px-8" 
              onClick={() => stopVps.mutate(id)}
              loading={stopVps.isPending}
            >
              <Power size={18} className="mr-2" /> Stop VPS
            </Button>
            <Button variant="success" className="px-8" onClick={() => navigate('/billing')}>
              <RefreshCw size={18} className="mr-2" /> Renew
            </Button>
            <Button variant="primary" className="px-8" onClick={() => navigate('/vps')}>
              <ArrowUpCircle size={18} className="mr-2" /> Upgrade
            </Button>
            <div className="flex items-center justify-center gap-2 px-6 py-2 rounded-xl bg-bgLight border border-border">
              <Clock size={16} className="text-textMuted" />
              <span className="text-sm font-bold">{instance.uptime || '24 hours'}</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Quick Action Badges Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="flex items-center justify-between p-4 bg-bgLighter">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-500/10 text-blue-500"><Key size={20} /></div>
            <div>
              <div className="text-xs text-textMuted font-bold">SSH KEY</div>
              <div className="text-sm font-bold">Manage</div>
            </div>
          </div>
          <Badge variant="primary">Active</Badge>
        </Card>
        <Card className="flex items-center justify-between p-4 bg-bgLighter">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-purple-500/10 text-purple-500"><Shield size={20} /></div>
            <div>
              <div className="text-xs text-textMuted font-bold">FIREWALL RULES</div>
              <div className="text-sm font-bold">8 Rules</div>
            </div>
          </div>
          <Badge variant="primary">Active</Badge>
        </Card>
        <Card className="flex items-center justify-between p-4 bg-bgLighter">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-green-500/10 text-green-500"><Camera size={20} /></div>
            <div>
              <div className="text-xs text-textMuted font-bold">SNAPSHOT & BACKUPS</div>
              <div className="text-sm font-bold">2 Backups</div>
            </div>
          </div>
          <Badge variant="primary">Active</Badge>
        </Card>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="bg-bgLighter">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Cpu size={18} className="text-primary" />
              <span className="font-bold text-sm">CPU USAGE</span>
            </div>
            <span className="text-xl font-bold">{instance.cpuLoad || 0}%</span>
          </div>
          <StatChart data={generateChartData(instance.cpuLoad)} color="#6C63FF" />
        </Card>

        <Card className="bg-bgLighter">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <MemoryStick size={18} className="text-green-500" />
              <span className="font-bold text-sm">RAM USED</span>
            </div>
            <span className="text-xl font-bold">{(instance.ramUsed / 1024).toFixed(1)} GB</span>
          </div>
          <StatChart data={generateChartData(instance.ramUsed)} color="#22C55E" />
        </Card>

        <Card className="bg-bgLighter">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <HardDrive size={18} className="text-orange-500" />
              <span className="font-bold text-sm">DISK USED</span>
            </div>
            <span className="text-xl font-bold">{instance.diskUsed || 0} GB</span>
          </div>
          <StatChart data={generateChartData(instance.diskUsed)} color="#F97316" />
        </Card>

        <Card className="bg-bgLighter">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Download size={18} className="text-blue-500" />
              <span className="font-bold text-sm">INCOMING TRAFFIC</span>
            </div>
            <span className="text-xl font-bold">{instance.incomingTraffic || 0} MB</span>
          </div>
          <StatChart data={generateChartData(instance.incomingTraffic)} color="#3B82F6" />
        </Card>

        <Card className="bg-bgLighter">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Upload size={18} className="text-pink-500" />
              <span className="font-bold text-sm">OUTGOING TRAFFIC</span>
            </div>
            <span className="text-xl font-bold">{instance.outgoingTraffic || 0} MB</span>
          </div>
          <StatChart data={generateChartData(instance.outgoingTraffic)} color="#EC4899" />
        </Card>

        <Card className="bg-bgLighter">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Activity size={18} className="text-cyan-500" />
              <span className="font-bold text-sm">BANDWIDTH</span>
            </div>
            <span className="text-xl font-bold">{instance.bandwidth || 0} TB</span>
          </div>
          <StatChart data={generateChartData(instance.bandwidth)} color="#06B6D4" />
        </Card>
      </div>

      {/* Details Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card title="VPS Details" className="bg-bgLighter">
          <div className="space-y-1">
            <DetailRow label="Server Location" value={instance.location} />
            <DetailRow label="Operating System" value={instance.os} />
            <DetailRow label="Hostname" value={instance.hostname} copyable />
            <DetailRow label="VPS Uptime" value={instance.uptime || '24 hours'} />
            <DetailRow label="SSH Username" value={instance.sshUsername || 'root'} copyable />
            <DetailRow label="IPv4 Address" value={instance.ip} copyable />
          </div>
        </Card>

        <Card title="Plan Details" className="bg-bgLighter">
          <div className="space-y-1">
            <DetailRow label="Current Plan" value={instance.planId?.name || 'Standard'} />
            <DetailRow label="Expiration Date" value={instance.expiresAt ? new Date(instance.expiresAt).toLocaleDateString() : 'N/A'} />
            <div className="flex items-center justify-between py-3 border-b border-border">
              <span className="text-textMuted text-sm">Auto-renewal</span>
              <div className="w-10 h-5 bg-primary/20 rounded-full relative cursor-pointer">
                <div className="absolute right-1 top-1 w-3 h-3 bg-primary rounded-full" />
              </div>
            </div>
            <DetailRow label="CPU Cores" value={`${instance.planId?.vcpu || 2} Cores`} />
            <DetailRow label="Memory" value={instance.planId?.ram || '4 GB'} />
            <DetailRow label="Disk Space" value={instance.planId?.storage || '80 GB'} />
            <div className="pt-4 flex gap-3">
              <Button variant="outline" size="sm" fullWidth onClick={() => navigate('/vps')}>Upgrade Plan</Button>
              <Button variant="outline" size="sm" fullWidth onClick={() => navigate('/billing')}>Renew Now</Button>
            </div>
          </div>
        </Card>
      </div>

      {/* Footer Actions */}
      <div className="flex justify-between items-center pt-8 border-t border-border">
        <Button 
          variant="ghost" 
          className="text-textMuted hover:text-primary font-bold flex items-center gap-2"
          onClick={() => window.open(`http://${instance.ip}:4200`, '_blank')}
        >
          <Terminal size={20} /> Open Terminal <ExternalLink size={14} />
        </Button>
        <p className="text-[10px] text-textMuted font-bold uppercase tracking-widest">
          Last Updated: {new Date().toLocaleTimeString()}
        </p>
      </div>
    </div>
  );
}

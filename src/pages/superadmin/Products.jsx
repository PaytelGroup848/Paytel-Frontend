import React, { useState } from 'react';
import { useVpsPlans, useUpdateVpsPlan } from '../../hooks/useVps';
import { usePhpPlans, useUpdatePhpPlan } from '../../hooks/usePhpHosting';
import { useEmailPlans, useUpdateEmailPlan } from '../../hooks/useEmailHosting';
import { useUpdateWpPlan } from '../../hooks/useWordPress';
import { api } from '../../services/api';
import { useQuery } from '@tanstack/react-query';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Modal from '../../components/ui/Modal';
import Card from '../../components/ui/Card';
import Spinner from '../../components/ui/Spinner';
import Badge from '../../components/ui/Badge';
import { Edit2, Cloud, Globe, Mail, Code, Save, X } from 'lucide-react';

export default function Products() {
  const [activeTab, setActiveTab] = useState('vps');
  const [editingPlan, setEditingPlan] = useState(null);

  const tabs = [
    { id: 'vps', label: 'VPS Plans', icon: Cloud },
    { id: 'wordpress', label: 'WordPress Plans', icon: Globe },
    { id: 'php', label: 'PHP/HTML Plans', icon: Code },
    { id: 'email', label: 'Email Plans', icon: Mail },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-textPrimary">Product Management</h1>
          <p className="text-textMuted text-sm">Configure pricing and specifications for all services</p>
        </div>
      </div>

      <div className="flex gap-2 bg-black/20 p-1 rounded-xl self-start w-fit">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-medium transition-all ${
              activeTab === tab.id
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20'
                : 'text-textMuted hover:text-textPrimary hover:bg-white/5'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      <Card className="bg-white/5 border-white/10 p-0 overflow-hidden">
        {activeTab === 'vps' && <VpsPlansTable onEdit={setEditingPlan} />}
        {activeTab === 'wordpress' && <WordPressPlansTable onEdit={setEditingPlan} />}
        {activeTab === 'php' && <PhpPlansTable onEdit={setEditingPlan} />}
        {activeTab === 'email' && <EmailPlansTable onEdit={setEditingPlan} />}
      </Card>

      {editingPlan && (
        <EditPlanModal
          plan={editingPlan}
          type={activeTab}
          isOpen={!!editingPlan}
          onClose={() => setEditingPlan(null)}
        />
      )}
    </div>
  );
}

function VpsPlansTable({ onEdit }) {
  const { data: linuxPlans, isLoading: loadingLinux } = useVpsPlans('linux');
  const { data: windowsPlans, isLoading: loadingWindows } = useVpsPlans('windows');

  if (loadingLinux || loadingWindows) return <TableSkeleton />;

  const allPlans = [...(linuxPlans || []), ...(windowsPlans || [])];

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead className="border-b border-white/10 text-textMuted text-sm">
          <tr>
            <th className="py-4 px-6 font-medium">Plan Name</th>
            <th className="py-4 px-6 font-medium">Type</th>
            <th className="py-4 px-6 font-medium">Price/mo</th>
            <th className="py-4 px-6 font-medium">Specifications</th>
            <th className="py-4 px-6 font-medium text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {allPlans.map((plan) => (
            <tr key={plan.id} className="text-sm hover:bg-white/5 transition-colors">
              <td className="py-4 px-6 font-medium text-textPrimary">{plan.name}</td>
              <td className="py-4 px-6">
                <Badge variant={plan.type === 'linux' ? 'info' : 'warning'}>
                  {plan.type.toUpperCase()}
                </Badge>
              </td>
              <td className="py-4 px-6 text-textPrimary font-mono">
                ₹{(plan.priceMonthly / 100).toFixed(2)}
              </td>
              <td className="py-4 px-6 text-textMuted">
                {plan.vcpu} vCPU / {plan.ram} RAM / {plan.storage} NVMe
              </td>
              <td className="py-4 px-6 text-right">
                <button
                  onClick={() => onEdit({ ...plan, category: 'vps' })}
                  className="p-2 text-indigo-400 hover:bg-indigo-400/10 rounded-lg transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function WordPressPlansTable({ onEdit }) {
  // WordPress doesn't have a specific plans hook yet, fetching from /api/wordpress/plans
  const { data: plans, isLoading } = useQuery({
    queryKey: ['wordpress', 'plans'],
    queryFn: () => api.get('/wordpress/plans').then(r => r.data?.data || [])
  });

  if (isLoading) return <TableSkeleton />;

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead className="border-b border-white/10 text-textMuted text-sm">
          <tr>
            <th className="py-4 px-6 font-medium">Plan Name</th>
            <th className="py-4 px-6 font-medium">Price/mo</th>
            <th className="py-4 px-6 font-medium">Features</th>
            <th className="py-4 px-6 font-medium text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {plans?.map((plan) => (
            <tr key={plan.id} className="text-sm hover:bg-white/5 transition-colors">
              <td className="py-4 px-6 font-medium text-textPrimary">{plan.name}</td>
              <td className="py-4 px-6 text-textPrimary font-mono">
                ₹{(plan.price / 100).toFixed(2)}
              </td>
              <td className="py-4 px-6 text-textMuted">
                {plan.features?.slice(0, 3).join(', ')}...
              </td>
              <td className="py-4 px-6 text-right">
                <button
                  onClick={() => onEdit({ ...plan, category: 'wordpress' })}
                  className="p-2 text-indigo-400 hover:bg-indigo-400/10 rounded-lg transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function PhpPlansTable({ onEdit }) {
  const { data: plans, isLoading } = usePhpPlans();

  if (isLoading) return <TableSkeleton />;

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead className="border-b border-white/10 text-textMuted text-sm">
          <tr>
            <th className="py-4 px-6 font-medium">Plan Name</th>
            <th className="py-4 px-6 font-medium">Type</th>
            <th className="py-4 px-6 font-medium">Price/mo</th>
            <th className="py-4 px-6 font-medium">Storage</th>
            <th className="py-4 px-6 font-medium text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {plans?.map((plan) => (
            <tr key={plan.id} className="text-sm hover:bg-white/5 transition-colors">
              <td className="py-4 px-6 font-medium text-textPrimary">{plan.name}</td>
              <td className="py-4 px-6">
                <Badge variant="info">{plan.type?.toUpperCase()}</Badge>
              </td>
              <td className="py-4 px-6 text-textPrimary font-mono">
                ₹{(plan.price / 100).toFixed(2)}
              </td>
              <td className="py-4 px-6 text-textMuted">{plan.storage}</td>
              <td className="py-4 px-6 text-right">
                <button
                  onClick={() => onEdit({ ...plan, category: 'php' })}
                  className="p-2 text-indigo-400 hover:bg-indigo-400/10 rounded-lg transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function EmailPlansTable({ onEdit }) {
  const { data: plans, isLoading } = useEmailPlans();

  if (isLoading) return <TableSkeleton />;

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead className="border-b border-white/10 text-textMuted text-sm">
          <tr>
            <th className="py-4 px-6 font-medium">Plan Name</th>
            <th className="py-4 px-6 font-medium">Price/mo</th>
            <th className="py-4 px-6 font-medium">Mailboxes</th>
            <th className="py-4 px-6 font-medium">Storage</th>
            <th className="py-4 px-6 font-medium text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {plans?.map((plan) => (
            <tr key={plan.id} className="text-sm hover:bg-white/5 transition-colors">
              <td className="py-4 px-6 font-medium text-textPrimary">{plan.name}</td>
              <td className="py-4 px-6 text-textPrimary font-mono">
                ₹{(plan.price / 100).toFixed(2)}
              </td>
              <td className="py-4 px-6 text-textMuted">{plan.maxMailboxes || 'Unlimited'}</td>
              <td className="py-4 px-6 text-textMuted">{plan.storagePerMailbox} GB / user</td>
              <td className="py-4 px-6 text-right">
                <button
                  onClick={() => onEdit({ ...plan, category: 'email' })}
                  className="p-2 text-indigo-400 hover:bg-indigo-400/10 rounded-lg transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function EditPlanModal({ plan, type, isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: plan.name,
    price: plan.priceMonthly || plan.price,
    storage: plan.storage,
    ram: plan.ram,
    vcpu: plan.vcpu,
    features: plan.features?.join('\n') || '',
  });

  const updateVps = useUpdateVpsPlan();
  const updateWp = useUpdateWpPlan();
  const updatePhp = useUpdatePhpPlan();
  const updateEmail = useUpdateEmailPlan();

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      name: formData.name,
      priceMonthly: formData.price,
      price: formData.price,
      storage: formData.storage,
      ram: formData.ram,
      vcpu: formData.vcpu,
      features: formData.features.split('\n').filter(f => f.trim()),
    };

    const mutation = 
      type === 'vps' ? updateVps :
      type === 'wordpress' ? updateWp :
      type === 'php' ? updatePhp :
      updateEmail;

    mutation.mutate({ id: plan.id, data: payload }, {
      onSuccess: onClose
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Edit ${plan.name}`}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <label className="block text-sm font-medium text-textMuted mb-1">Plan Name</label>
            <Input
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-textMuted mb-1">Price (₹ in Paise)</label>
            <Input
              type="number"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: parseInt(e.target.value) })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-textMuted mb-1">Storage</label>
            <Input
              value={formData.storage}
              onChange={(e) => setFormData({ ...formData, storage: e.target.value })}
            />
          </div>
          {type === 'vps' && (
            <>
              <div>
                <label className="block text-sm font-medium text-textMuted mb-1">RAM</label>
                <Input
                  value={formData.ram}
                  onChange={(e) => setFormData({ ...formData, ram: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-textMuted mb-1">vCPU</label>
                <Input
                  type="number"
                  value={formData.vcpu}
                  onChange={(e) => setFormData({ ...formData, vcpu: parseInt(e.target.value) })}
                />
              </div>
            </>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-textMuted mb-1">Features (One per line)</label>
          <textarea
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-textPrimary focus:outline-none focus:ring-2 focus:ring-indigo-500/50 min-h-[120px]"
            value={formData.features}
            onChange={(e) => setFormData({ ...formData, features: e.target.value })}
          />
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <Button variant="outline" onClick={onClose} type="button">Cancel</Button>
          <Button 
            type="submit" 
            className="bg-indigo-600 hover:bg-indigo-700 text-white"
            isLoading={updateVps.isPending || updateWp.isPending || updatePhp.isPending || updateEmail.isPending}
          >
            Save Changes
          </Button>
        </div>
      </form>
    </Modal>
  );
}

function TableSkeleton() {
  return (
    <div className="p-8 space-y-4">
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="h-12 bg-white/5 animate-pulse rounded-lg" />
      ))}
    </div>
  );
}

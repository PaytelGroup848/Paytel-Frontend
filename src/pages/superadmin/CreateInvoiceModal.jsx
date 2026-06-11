import React, { useState, useEffect } from 'react';
import Modal from '../../components/ui/Modal';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { useAdminUsers } from '../../hooks/useAdminUsers';
import { useVpsPlans } from '../../hooks/useVps';
import { usePhpPlans } from '../../hooks/usePhpHosting';
import { useEmailPlans } from '../../hooks/useEmailHosting';
import { useCreateInvoice } from '../../hooks/useInvoices';
import { api } from '../../services/api';
import { useQuery } from '@tanstack/react-query';
import { 
  User, 
  Package, 
  CheckCircle, 
  Search, 
  ChevronRight, 
  ChevronLeft,
  Server,
  Globe,
  Code,
  Mail,
  AlertCircle
} from 'lucide-react';

export default function CreateInvoiceModal({ isOpen, onClose }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    userId: '',
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    paymentMethod: 'razorpay',
    service: 'vps',
    planId: '',
    packageName: '',
    packageType: 'monthly',
    specifications: {},
    subtotal: 0,
    notes: ''
  });

  const [userSearch, setUserSearch] = useState('');
  const { data: usersData } = useAdminUsers({ search: userSearch, limit: 5 });
  const createMutation = useCreateInvoice();

  // Plans data
  const { data: vpsPlans } = useVpsPlans('linux');
  const { data: wpPlans } = useQuery({
    queryKey: ['wordpress', 'plans'],
    queryFn: () => api.get('/wordpress/plans').then(r => r.data?.data || [])
  });
  const { data: phpPlans } = usePhpPlans();
  const { data: emailPlans } = useEmailPlans();

  const handleUserSelect = (user) => {
    setFormData(prev => ({
      ...prev,
      userId: user.id,
      clientName: user.name,
      clientEmail: user.email,
      clientPhone: user.phone || 'N/A'
    }));
    setUserSearch('');
  };

  const handlePlanSelect = (plan) => {
    setFormData(prev => ({
      ...prev,
      planId: plan.id,
      packageName: plan.name,
      subtotal: plan.priceMonthly || plan.price,
      specifications: {
        ...(plan.vcpu && { vcpu: plan.vcpu }),
        ...(plan.ram && { ram: plan.ram }),
        ...(plan.storage && { storage: plan.storage }),
        ...(plan.maxMailboxes && { mailboxes: plan.maxMailboxes })
      }
    }));
  };

  const handleSubmit = () => {
    createMutation.mutate(formData, {
      onSuccess: () => {
        onClose();
        setStep(1);
        setFormData({
          userId: '',
          clientName: '',
          clientEmail: '',
          clientPhone: '',
          paymentMethod: 'razorpay',
          service: 'vps',
          planId: '',
          packageName: '',
          packageType: 'monthly',
          specifications: {},
          subtotal: 0,
          notes: ''
        });
      }
    });
  };

  const gst = Math.round(formData.subtotal * 0.18);
  const total = formData.subtotal + gst;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create Manual Invoice">
      <div className="space-y-8">
        {/* Stepper */}
        <div className="flex items-center justify-between px-4 relative">
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-white/5 -translate-y-1/2 z-0" />
          {[1, 2, 3].map((s) => (
            <div 
              key={s} 
              className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                step >= s ? 'bg-indigo-600 text-white' : 'bg-[#222] text-textMuted border border-white/10'
              }`}
            >
              {step > s ? <CheckCircle className="w-5 h-5" /> : s}
            </div>
          ))}
        </div>

        {/* Step 1: Client Details */}
        {step === 1 && (
          <div className="space-y-6">
            <div className="relative">
              <label className="block text-sm font-medium text-textMuted mb-2">Search Client</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-textMuted" />
                <Input
                  placeholder="Search by name or email..."
                  className="pl-10"
                  value={userSearch}
                  onChange={(e) => setUserSearch(e.target.value)}
                />
              </div>
              {userSearch && usersData?.items?.length > 0 && (
                <div className="absolute top-full left-0 w-full mt-1 bg-[#1a1a1a] border border-white/10 rounded-xl overflow-hidden z-50 shadow-2xl">
                  {usersData.items.map(user => (
                    <button
                      key={user.id}
                      onClick={() => handleUserSelect(user)}
                      className="w-full px-4 py-3 text-left hover:bg-white/5 flex items-center justify-between group"
                    >
                      <div>
                        <div className="text-sm font-medium text-textPrimary">{user.name}</div>
                        <div className="text-xs text-textMuted">{user.email}</div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-textMuted opacity-0 group-hover:opacity-100" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {formData.userId && (
              <div className="bg-indigo-600/10 border border-indigo-600/20 rounded-xl p-4 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold">
                  {formData.clientName.charAt(0)}
                </div>
                <div>
                  <div className="text-sm font-medium text-textPrimary">{formData.clientName}</div>
                  <div className="text-xs text-textMuted">{formData.clientEmail} • {formData.clientPhone}</div>
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-textMuted mb-2">Payment Method</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {['razorpay', 'cash', 'upi', 'bank_transfer', 'other'].map(m => (
                  <button
                    key={m}
                    onClick={() => setFormData({ ...formData, paymentMethod: m })}
                    className={`px-4 py-2.5 rounded-xl border text-sm font-medium capitalize transition-all ${
                      formData.paymentMethod === m 
                        ? 'bg-indigo-600 border-indigo-600 text-white' 
                        : 'bg-white/5 border-white/10 text-textMuted hover:border-white/20'
                    }`}
                  >
                    {m.replace('_', ' ')}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Product Selection */}
        {step === 2 && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-textMuted mb-2">Select Service</label>
              <div className="grid grid-cols-4 gap-3">
                {[
                  { id: 'vps', icon: Server, label: 'VPS' },
                  { id: 'wordpress', icon: Globe, label: 'WP' },
                  { id: 'php', icon: Code, label: 'PHP' },
                  { id: 'email', icon: Mail, label: 'Email' }
                ].map(s => (
                  <button
                    key={s.id}
                    onClick={() => setFormData({ ...formData, service: s.id, planId: '', packageName: '' })}
                    className={`flex flex-col items-center gap-2 p-3 rounded-xl border transition-all ${
                      formData.service === s.id 
                        ? 'bg-indigo-600 border-indigo-600 text-white' 
                        : 'bg-white/5 border-white/10 text-textMuted hover:border-white/20'
                    }`}
                  >
                    <s.icon className="w-5 h-5" />
                    <span className="text-[10px] font-bold uppercase">{s.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-textMuted mb-2">Select Plan</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[240px] overflow-y-auto pr-2 custom-scrollbar">
                {(formData.service === 'vps' ? vpsPlans : 
                  formData.service === 'wordpress' ? wpPlans : 
                  formData.service === 'php' ? phpPlans : 
                  emailPlans)?.map(plan => (
                  <button
                    key={plan.id}
                    onClick={() => handlePlanSelect(plan)}
                    className={`p-4 rounded-xl border text-left transition-all ${
                      formData.planId === plan.id 
                        ? 'bg-indigo-600/10 border-indigo-600' 
                        : 'bg-white/5 border-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <span className="text-sm font-bold text-textPrimary">{plan.name}</span>
                      <span className="text-xs font-mono text-indigo-400">₹{((plan.priceMonthly || plan.price) / 100).toFixed(0)}</span>
                    </div>
                    <div className="text-[10px] text-textMuted line-clamp-1">
                      {plan.ram || plan.storage} • {plan.vcpu || plan.maxMailboxes || plan.bandwidth}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-textMuted mb-2">Billing Cycle</label>
                <select
                  value={formData.packageType}
                  onChange={(e) => setFormData({ ...formData, packageType: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-textPrimary focus:outline-none focus:ring-2 focus:ring-indigo-500/50 appearance-none"
                >
                  <option value="monthly" className="bg-[#1a1a1a]">Monthly</option>
                  <option value="yearly-1" className="bg-[#1a1a1a]">1 Year</option>
                  <option value="yearly-2" className="bg-[#1a1a1a]">2 Years</option>
                  <option value="yearly-3" className="bg-[#1a1a1a]">3 Years</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-textMuted mb-2">Custom Subtotal (Paise)</label>
                <Input
                  type="number"
                  value={formData.subtotal}
                  onChange={(e) => setFormData({ ...formData, subtotal: parseInt(e.target.value) })}
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Summary */}
        {step === 3 && (
          <div className="space-y-6">
            <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-textMuted">Client</span>
                <span className="text-textPrimary font-medium">{formData.clientName}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-textMuted">Service</span>
                <span className="text-textPrimary font-medium capitalize">{formData.service}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-textMuted">Package</span>
                <span className="text-textPrimary font-medium">{formData.packageName}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-textMuted">Billing</span>
                <span className="text-textPrimary font-medium capitalize">{formData.packageType}</span>
              </div>
              <hr className="border-white/5" />
              <div className="flex justify-between text-sm">
                <span className="text-textMuted">Subtotal</span>
                <span className="text-textPrimary font-mono">₹{(formData.subtotal / 100).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-textMuted">GST (18%)</span>
                <span className="text-textPrimary font-mono">₹{(gst / 100).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-lg font-bold">
                <span className="text-textPrimary">Total Due</span>
                <span className="text-indigo-500 font-mono">₹{(total / 100).toFixed(2)}</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-textMuted mb-2">Notes (Internal)</label>
              <textarea
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-textPrimary focus:outline-none focus:ring-2 focus:ring-indigo-500/50 min-h-[80px]"
                placeholder="Any special instructions..."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              />
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-4 border-t border-white/5">
          <Button 
            variant="outline" 
            onClick={() => step === 1 ? onClose() : setStep(s => s - 1)}
          >
            {step === 1 ? 'Cancel' : 'Back'}
          </Button>
          <Button 
            className="bg-indigo-600 hover:bg-indigo-700 text-white min-w-[120px]"
            onClick={() => step === 3 ? handleSubmit() : setStep(s => s + 1)}
            disabled={
              (step === 1 && !formData.userId) ||
              (step === 2 && !formData.planId) ||
              createMutation.isPending
            }
            isLoading={createMutation.isPending}
          >
            {step === 3 ? 'Generate Invoice' : 'Continue'}
          </Button>
        </div>
      </div>
    </Modal>
  );
}

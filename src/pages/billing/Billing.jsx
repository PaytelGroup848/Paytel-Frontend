import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import Modal from '../../components/ui/Modal';
import SkeletonCard from '../../components/ui/skeletons/SkeletonCard';

import { useBillingPlans, useCancelSubscription, useSubscription } from '../../hooks/useBilling';

const formatINR = (paise) => `₹${(Number(paise || 0) / 100).toFixed(0)}`;

export default function Billing() {
  const navigate = useNavigate();
  const subscription = useSubscription();
  const plans = useBillingPlans();
  const cancel = useCancelSubscription();

  const [confirmOpen, setConfirmOpen] = useState(false);

  const isLoading = subscription.isLoading || plans.isLoading;
  if (isLoading) return <SkeletonCard height={180} />;

  const sub = subscription.data;
  const activePlan = Array.isArray(plans.data)
    ? plans.data.find((p) => p.id === sub?.planId) || null
    : null;

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <div className="text-2xl font-bold">Billing</div>
        <div className="text-sm text-textMuted mt-1">Subscriptions and billing overview.</div>
      </div>

      <Card>
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div>
            <div className="text-sm text-textMuted">Current plan</div>
            <div className="mt-2 text-xl font-bold">{activePlan?.name || '—'}</div>
            <div className="mt-2 text-sm text-textMuted">
              Price: <span className="text-textPrimary font-semibold">{activePlan ? formatINR(activePlan.price) : '—'}</span>
            </div>
            <div className="mt-2 text-sm text-textMuted">
              Renewal: <span className="text-textPrimary font-semibold">{sub?.endDate ? new Date(sub.endDate).toLocaleDateString() : '—'}</span>
            </div>
          </div>
          <div className="flex flex-col items-start sm:items-end gap-3">
            <Badge variant={sub?.status === 'active' ? 'success' : 'danger'}>{sub?.status || 'none'}</Badge>
            <div className="flex items-center gap-2">
              <Button variant="secondary" onClick={() => navigate('/hosting/plans')}>
                Upgrade Plan
              </Button>
              <Button variant="danger" onClick={() => setConfirmOpen(true)} disabled={!sub || sub.status !== 'active'}>
                Cancel Subscription
              </Button>
            </div>
          </div>
        </div>
      </Card>

      <Card>
        <div className="text-lg font-semibold">Payments</div>
        <div className="text-sm text-textMuted mt-1">Payments are processed securely via Razorpay.</div>
      </Card>

      <Modal isOpen={confirmOpen} onClose={() => setConfirmOpen(false)} title="Cancel subscription?">
        <div className="text-sm text-textMuted">Your subscription will be marked as cancelled.</div>
        <div className="mt-5 flex justify-end gap-2">
          <Button variant="ghost" onClick={() => setConfirmOpen(false)}>
            Keep
          </Button>
          <Button
            variant="danger"
            loading={cancel.isPending}
            onClick={async () => {
              try {
                await cancel.mutateAsync();
              } catch (_) {
                // toast in hook
              } finally {
                setConfirmOpen(false);
              }
            }}
          >
            Cancel
          </Button>
        </div>
      </Modal>
    </div>
  );
}


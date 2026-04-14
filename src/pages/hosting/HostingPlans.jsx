import { Check } from 'lucide-react';
import toast from 'react-hot-toast';

import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import SkeletonCard from '../../components/ui/skeletons/SkeletonCard';
import { usePlans } from '../../hooks/useHosting';
import { useCreateOrder, useVerifyPayment } from '../../hooks/useBilling';

const formatINR = (paise) => `₹${(Number(paise || 0) / 100).toFixed(0)}`;

export default function HostingPlans() {
  const plans = usePlans();
  const createOrder = useCreateOrder();
  const verifyPayment = useVerifyPayment();

  const onGetStarted = async (plan) => {
    try {
      if (!window.Razorpay) {
        toast.error('Razorpay is not loaded. Please refresh.');
        return;
      }

      const data = await createOrder.mutateAsync({ planId: plan.id });

      const options = {
        key: data.keyId,
        amount: data.amount,
        currency: 'INR',
        order_id: data.orderId,
        handler: async (response) => {
          try {
            await verifyPayment.mutateAsync(response);
          } catch (_) {
            // toast handled in hook
          }
        },
        theme: { color: '#6C63FF' },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (_) {
      // toast handled in hook
    }
  };

  if (plans.isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <SkeletonCard height={220} />
        <SkeletonCard height={220} />
        <SkeletonCard height={220} />
      </div>
    );
  }

  const list = Array.isArray(plans.data) ? plans.data : [];
  const bySlug = Object.fromEntries(list.map((p) => [p.slug, p]));

  const starter = bySlug.starter || list[0];
  const business = bySlug.business || list[1] || starter;
  const enterprise = bySlug.enterprise || list[2] || business;

  const cards = [
    { label: 'Starter', plan: starter, popular: false },
    { label: 'Business', plan: business, popular: true },
    { label: 'Enterprise', plan: enterprise, popular: false },
  ].filter((c) => c.plan);

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <div className="text-2xl font-bold">Hosting Plans</div>
        <div className="text-sm text-textMuted mt-1">Choose a plan that fits your needs.</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {cards.map(({ label, plan, popular }) => (
          <Card
            key={label}
            className={[
              'relative',
              popular ? 'border-primary/40 bg-primary/5' : '',
            ].join(' ')}
          >
            {popular ? (
              <div className="absolute -top-3 right-4 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">
                Most popular
              </div>
            ) : null}

            <div className="flex items-start justify-between">
              <div>
                <div className="text-lg font-semibold">{plan.name || label}</div>
                <div className="text-sm text-textMuted mt-1">{plan.interval ? plan.interval : 'monthly'}</div>
              </div>
              <div className="text-2xl font-bold">{formatINR(plan.price)}</div>
            </div>

            <div className="mt-4 space-y-2">
              {(plan.features || []).slice(0, 6).map((f) => (
                <div key={f} className="flex items-center gap-2 text-sm text-textPrimary/90">
                  <Check size={16} className="text-success" />
                  <span className="truncate">{f}</span>
                </div>
              ))}
            </div>

            <Button
              className="w-full mt-5"
              loading={createOrder.isPending || verifyPayment.isPending}
              onClick={() => onGetStarted(plan)}
            >
              Get Started
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}


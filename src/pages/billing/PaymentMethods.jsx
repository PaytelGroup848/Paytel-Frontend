import Card from '../../components/ui/Card';
import SkeletonCard from '../../components/ui/skeletons/SkeletonCard';

import { useQuery } from '@tanstack/react-query';
import { api } from '../../services/api';

export default function PaymentMethods() {
  const methods = useQuery({
    queryKey: ['billing', 'payment-methods'],
    queryFn: async () => {
      const res = await api.get('/billing/payment-methods');
      return res.data?.data;
    },
    staleTime: 0,
  });

  if (methods.isLoading) return <SkeletonCard height={140} />;

  const list = Array.isArray(methods.data) ? methods.data : [];
  const last = list[0] || null;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <div className="text-2xl font-bold">Payment Methods</div>
        <div className="text-sm text-textMuted mt-1">Payments processed securely via Razorpay.</div>
      </div>

      <Card>
        <div className="text-sm text-textMuted">Processor</div>
        <div className="mt-2 text-lg font-semibold">Razorpay</div>
      </Card>

      <Card>
        <div className="text-lg font-semibold">Last used method</div>
        <div className="text-sm text-textMuted mt-1">
          {last ? (
            <span className="text-textPrimary">
              {last.network || 'Card'} •••• {last.last4 || '—'}
            </span>
          ) : (
            'No payment method on file yet.'
          )}
        </div>
      </Card>
    </div>
  );
}


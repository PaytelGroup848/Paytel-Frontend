import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import SkeletonStat from '../../components/ui/skeletons/SkeletonStat';
import { pageTransition, staggerContainer, slideUp } from '../../animations/variants';

import { useInstances } from '../../hooks/useHosting';
import { useDomains } from '../../hooks/useDomains';
import { useSubscription, useInvoices } from '../../hooks/useBilling';

const formatINR = (paise) => {
  const n = Number(paise || 0) / 100;
  return `₹${n.toFixed(2)}`;
};

export default function Dashboard() {
  const navigate = useNavigate();

  const instances = useInstances();
  const domains = useDomains();
  const subscription = useSubscription();
  const invoices = useInvoices();

  const isLoading = instances.isLoading || domains.isLoading || subscription.isLoading || invoices.isLoading;

  const instancesData = Array.isArray(instances.data) ? instances.data : [];
  const domainsData = Array.isArray(domains.data) ? domains.data : [];
  const invoicesData = Array.isArray(invoices.data) ? invoices.data : [];

  const activeInstances = instancesData.filter((i) => i.status === 'active').length;
  const activeDomains = domainsData.filter((d) => d.status === 'active').length;
  const currentPlanName = subscription.data?.planName || subscription.data?.plan?.name || '—';

  const nextInvoice = invoicesData.find((i) => i.status === 'pending') || invoicesData[0] || null;
  const recentInvoices = invoicesData.slice(0, 3);

  return (
    <motion.div initial={pageTransition.initial} animate={pageTransition.animate} exit={pageTransition.exit}>
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-2xl font-bold">Dashboard</div>
            <div className="text-sm text-textMuted mt-1">Overview of your hosting, domains, and billing.</div>
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <Button variant="secondary" size="sm" onClick={() => navigate('/hosting/plans')}>
              Add Hosting
            </Button>
            <Button variant="ghost" size="sm" onClick={() => navigate('/domains/search')}>
              Register Domain
            </Button>
            <Button variant="ghost" size="sm" onClick={() => navigate('/billing/invoices')}>
              View Invoices
            </Button>
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <SkeletonStat />
            <SkeletonStat />
            <SkeletonStat />
            <SkeletonStat />
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={slideUp}>
              <Card>
                <div className="text-sm text-textMuted">Active hosting</div>
                <div className="mt-2 text-3xl font-bold">{activeInstances}</div>
              </Card>
            </motion.div>
            <motion.div variants={slideUp}>
              <Card>
                <div className="text-sm text-textMuted">Active domains</div>
                <div className="mt-2 text-3xl font-bold">{activeDomains}</div>
              </Card>
            </motion.div>
            <motion.div variants={slideUp}>
              <Card>
                <div className="text-sm text-textMuted">Current plan</div>
                <div className="mt-2 text-xl font-bold truncate">{currentPlanName}</div>
              </Card>
            </motion.div>
            <motion.div variants={slideUp}>
              <Card>
                <div className="text-sm text-textMuted">Next invoice</div>
                <div className="mt-2 text-xl font-bold">{nextInvoice ? formatINR(nextInvoice.amount) : '—'}</div>
                <div className="mt-2 text-xs text-textMuted">
                  {nextInvoice?.createdAt ? new Date(nextInvoice.createdAt).toLocaleDateString() : ''}
                </div>
              </Card>
            </motion.div>
          </motion.div>
        )}

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-lg font-semibold">Recent activity</div>
              <div className="text-sm text-textMuted mt-1">Latest invoices</div>
            </div>
            <Button variant="ghost" size="sm" onClick={() => navigate('/billing/invoices')}>
              All invoices
            </Button>
          </div>

          <div className="mt-4 space-y-3">
            {recentInvoices.length ? (
              recentInvoices.map((inv) => (
                <div
                  key={inv.id}
                  className="flex items-center justify-between gap-4 bg-white/5 border border-white/10 rounded-xl p-4"
                >
                  <div className="min-w-0">
                    <div className="text-sm font-semibold truncate">Order: {inv.razorpayOrderId || inv.id}</div>
                    <div className="text-xs text-textMuted mt-1">
                      {inv.createdAt ? new Date(inv.createdAt).toLocaleString() : ''}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-sm font-semibold">{formatINR(inv.amount)}</div>
                    <Badge
                      variant={
                        inv.status === 'paid' ? 'success' : inv.status === 'failed' ? 'danger' : 'warning'
                      }
                    >
                      {inv.status}
                    </Badge>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-sm text-textMuted">No invoices yet.</div>
            )}
          </div>
        </Card>
      </div>
    </motion.div>
  );
}


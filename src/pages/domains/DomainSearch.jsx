import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import toast from 'react-hot-toast';

import Card from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import { fadeIn, slideUp } from '../../animations/variants';

import { useCheckAvailability, useRegisterDomain } from '../../hooks/useDomains';

const splitDomain = (value) => {
  const v = String(value || '').trim().toLowerCase();
  const idx = v.lastIndexOf('.');
  if (idx <= 0) return { name: v, extension: '' };
  return { name: v.slice(0, idx), extension: v.slice(idx) };
};

export default function DomainSearch() {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState(null);

  const check = useCheckAvailability();
  const register = useRegisterDomain();

  const parsed = useMemo(() => splitDomain(query), [query]);

  const onCheck = async () => {
    if (!query) {
      toast.error('Enter a domain name');
      return;
    }
    try {
      const data = await check.mutateAsync(query);
      setResult(data);
    } catch (_) {
      // toast handled
    }
  };

  const onRegister = async () => {
    const { name, extension } = parsed;
    if (!name || !extension || !extension.startsWith('.')) {
      toast.error('Use a full domain like example.com');
      return;
    }
    try {
      await register.mutateAsync({ name, extension });
      toast.success('Domain registered');
      setResult(null);
      setQuery('');
    } catch (_) {
      // toast handled
    }
  };

  return (
    <motion.div variants={slideUp} initial="hidden" animate="visible" className="max-w-3xl mx-auto space-y-6">
      <div>
        <div className="text-2xl font-bold">Search Domain</div>
        <div className="text-sm text-textMuted mt-1">Check availability and register a domain.</div>
      </div>

      <Card>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <Input
              label="Domain"
              name="domain"
              placeholder="example.com"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setResult(null);
              }}
              icon={Search}
            />
          </div>
          <div className="pt-0 sm:pt-8">
            <Button onClick={onCheck} loading={check.isPending} className="w-full sm:w-auto">
              Check
            </Button>
          </div>
        </div>

        {result ? (
          <motion.div variants={fadeIn} initial="hidden" animate="visible" className="mt-5">
            <div className="flex items-center justify-between gap-3 bg-white/5 border border-white/10 rounded-xl p-4">
              <div className="min-w-0">
                <div className="text-sm font-semibold truncate">{result.name}</div>
                <div className="text-xs text-textMuted mt-1">Availability result</div>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant={result.available ? 'success' : 'danger'}>{result.available ? 'Available' : 'Taken'}</Badge>
                {result.available ? (
                  <Button size="sm" onClick={onRegister} loading={register.isPending}>
                    Register Now
                  </Button>
                ) : null}
              </div>
            </div>
          </motion.div>
        ) : null}
      </Card>
    </motion.div>
  );
}


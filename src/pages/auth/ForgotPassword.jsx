import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Mail } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { fadeIn, slideUp } from '../../animations/variants';
import { api } from '../../services/api';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const mutation = useMutation({
    mutationFn: async () => {
      const res = await api.post('/auth/forgot-password', { email });
      return res.data?.data;
    },
    onSuccess: () => {
      toast.success('If the email exists, a reset link has been sent.');
      setSubmitted(true);
    },
    onError: () => toast.error('Request failed'),
  });

  const onSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      toast.error('Email is required');
      return;
    }
    mutation.mutate();
  };

  return (
    <motion.div variants={slideUp} initial="hidden" animate="visible">
      {!submitted ? (
        <form onSubmit={onSubmit} className="space-y-4">
          <Input
            label="Email"
            name="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            icon={Mail}
            autoComplete="email"
          />

          <Button type="submit" loading={mutation.isPending} className="w-full">
            Send reset link
          </Button>

          <div className="text-sm text-center">
            <Link to="/login" className="text-primary hover:underline">
              Back to login
            </Link>
          </div>
        </form>
      ) : (
        <motion.div variants={fadeIn} initial="hidden" animate="visible" className="text-center space-y-3">
          <div className="text-lg font-semibold">Check your inbox</div>
          <div className="text-sm text-textMuted">
            If an account exists for <span className="text-textPrimary">{email}</span>, you’ll receive a reset link shortly.
          </div>
          <Link to="/login" className="inline-block text-primary hover:underline text-sm">
            Return to login
          </Link>
        </motion.div>
      )}
    </motion.div>
  );
}


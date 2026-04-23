import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Mail, KeyRound, ArrowLeft, CheckCircle, Shield, RefreshCw } from 'lucide-react';
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
    mutationFn: async (emailData) => {
      const res = await api.post('/auth/forgot-password', { email: emailData });
      return res.data;
    },
    onSuccess: () => {
      toast.success('Reset link sent successfully!');
      setSubmitted(true);
    },
    onError: (error) => {
      const message = error.response?.data?.message || 'Something went wrong';
      toast.error(message);
    },
  });

  const onSubmit = (e) => {
    e.preventDefault();
    if (!email) return toast.error('Please enter your email');
    
    // Simple Regex check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return toast.error('Invalid email format');

    mutation.mutate(email);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <motion.div 
        variants={slideUp} 
        initial="hidden" 
        animate="visible" 
        className="w-full max-w-md"
      >
        {/* Main Card Container */}
        <div className="bg-white/80 backdrop-blur-xl border border-slate-200 rounded-3xl shadow-2xl shadow-slate-200/50 p-8 md:p-10">
          
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.div
                key="forgot-form"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                {/* Header Section */}
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-indigo-600 text-white mb-4 shadow-lg shadow-indigo-200 ring-4 ring-indigo-50">
                    <KeyRound size={28} />
                  </div>
                  <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                    Reset Password
                  </h2>
                  <p className="text-sm text-slate-500 mt-2 leading-relaxed">
                    Enter the email associated with your account and we'll send a recovery link.
                  </p>
                </div>

                {/* Form */}
                <form onSubmit={onSubmit} className="space-y-6">
                  <div className="group transition-all duration-200">
                    <Input
                      label="Email Address"
                      name="email"
                      type="email"
                      placeholder="name@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      icon={Mail}
                      className="rounded-xl border-slate-200 focus:border-indigo-500 transition-all"
                      autoComplete="email"
                    />
                  </div>

                  <Button
                    type="submit"
                    loading={mutation.isPending}
                    className="w-full py-3.5 rounded-xl font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-200 transform active:scale-[0.98] transition-all"
                  >
                    Send Reset Link
                  </Button>

                  <div className="text-center">
                    <Link
                      to="/login"
                      className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-indigo-600 transition-all group"
                    >
                      <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                      Back to login
                    </Link>
                  </div>
                </form>

                {/* Security Footer */}
                <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-center gap-2 text-[12px] text-slate-400">
                  <Shield size={14} className="text-slate-300" />
                  <span className="font-medium">Secure SSL Encrypted Connection</span>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="success-state"
                variants={fadeIn}
                initial="hidden"
                animate="visible"
                className="text-center py-4"
              >
                <div className="relative inline-flex mb-6">
                  <div className="absolute inset-0 rounded-full bg-green-200 animate-ping opacity-25"></div>
                  <div className="relative inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500 text-white shadow-lg shadow-green-100">
                    <CheckCircle size={32} />
                  </div>
                </div>

                <h2 className="text-2xl font-bold text-slate-900">Check your email</h2>
                <p className="text-slate-500 mt-3 text-sm leading-relaxed">
                  We've sent a password reset link to: <br/>
                  <span className="font-bold text-slate-800 break-all">{email}</span>
                </p>

                <div className="mt-8 space-y-3">
                  <Button
                    variant="outline"
                    onClick={() => mutation.mutate(email)}
                    disabled={mutation.isPending}
                    className="w-full flex items-center justify-center gap-2 border-slate-200 text-slate-600 hover:bg-slate-50"
                  >
                    <RefreshCw size={16} className={mutation.isPending ? 'animate-spin' : ''} />
                    Resend Email
                  </Button>
                  
                  <Link
                    to="/login"
                    className="block text-sm font-bold text-indigo-600 hover:text-indigo-700 p-2"
                  >
                    Return to login
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Mail, Lock } from 'lucide-react';

import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { slideUp } from '../../animations/variants';
import { useLogin } from '../../hooks/useAuth';

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/dashboard';

  const login = useLogin();

  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});

  const onChange = (e) => {
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }));
    setErrors((s) => ({ ...s, [e.target.name]: '' }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const nextErrors = {};
    if (!form.email) nextErrors.email = 'Email is required';
    if (!form.password) nextErrors.password = 'Password is required';
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    try {
      await login.mutateAsync({ email: form.email, password: form.password });
      navigate(from);
    } catch (_) {
      // toast handled in hook
    }
  };

  return (
    <motion.div variants={slideUp} initial="hidden" animate="visible">
      <form onSubmit={onSubmit} className="space-y-4">
        <Input
          label="Email"
          name="email"
          type="email"
          placeholder="you@example.com"
          value={form.email}
          onChange={onChange}
          error={errors.email}
          icon={Mail}
          autoComplete="email"
        />
        <Input
          label="Password"
          name="password"
          type="password"
          placeholder="••••••••"
          value={form.password}
          onChange={onChange}
          error={errors.password}
          icon={Lock}
          autoComplete="current-password"
        />

        <Button type="submit" loading={login.isPending} className="w-full">
          Login
        </Button>

        <div className="flex items-center justify-between text-sm">
          <Link to="/register" className="text-primary hover:underline">
            Create account
          </Link>
          <Link to="/forgot-password" className="text-textMuted hover:text-textPrimary">
            Forgot password?
          </Link>
        </div>
      </form>
    </motion.div>
  );
}


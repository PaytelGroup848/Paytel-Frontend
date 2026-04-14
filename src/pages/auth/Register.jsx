import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User } from 'lucide-react';
import toast from 'react-hot-toast';

import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { slideUp } from '../../animations/variants';
import { useRegister } from '../../hooks/useAuth';

export default function Register() {
  const navigate = useNavigate();
  const register = useRegister();

  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [errors, setErrors] = useState({});

  const onChange = (e) => {
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }));
    setErrors((s) => ({ ...s, [e.target.name]: '' }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const nextErrors = {};
    if (!form.name) nextErrors.name = 'Name is required';
    if (!form.email) nextErrors.email = 'Email is required';
    if (!form.password) nextErrors.password = 'Password is required';
    if (form.password && form.password.length < 8) nextErrors.password = 'Password must be at least 8 characters';
    if (form.confirmPassword !== form.password) nextErrors.confirmPassword = 'Passwords must match';
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    try {
      await register.mutateAsync({ name: form.name, email: form.email, password: form.password });
      toast.success('Registration successful. Please login.');
      navigate('/login');
    } catch (_) {
      // toast handled in hook
    }
  };

  return (
    <motion.div variants={slideUp} initial="hidden" animate="visible">
      
      <form onSubmit={onSubmit} className="space-y-4">
        <Input
          label="Name"
          name="name"
          placeholder="Your name"
          value={form.name}
          onChange={onChange}
          error={errors.name}
          icon={User}
          autoComplete="name"
        />
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
          autoComplete="new-password"
        />
        <Input
          label="Confirm password"
          name="confirmPassword"
          type="password"
          placeholder="••••••••"
          value={form.confirmPassword}
          onChange={onChange}
          error={errors.confirmPassword}
          icon={Lock}
          autoComplete="new-password"
        />

        <Button type="submit" loading={register.isPending} className="w-full">
          Create account
        </Button>

        <div className="text-sm text-center">
          <Link to="/login" className="text-textMuted hover:text-textPrimary">
            Already have an account? <span className="text-primary">Login</span>
          </Link>
        </div>
      </form>
    </motion.div>
  );
}


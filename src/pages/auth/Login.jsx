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
  const from = location.state?.from || '/home';

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
  <motion.div
    variants={slideUp}
    initial="hidden"
    animate="visible"
    className="w-full"
  >
    {/* Header Section */}
    <div className="text-center mb-8">
      {/* <h2 className="text-3xl font-bold tracking-tight text-gray-800">
        Welcome back
      </h2> */}

      <p className="text-sm text-gray-500 mt-2">
        Login to your account and continue your journey.
      </p>
    </div>

    {/* Form */}
    <form
      onSubmit={onSubmit}
      className="space-y-5"
    >
      {/* Email */}
      <Input
        label="Email Address"
        name="email"
        type="email"
        placeholder="you@example.com"
        value={form.email}
        onChange={onChange}
        error={errors.email}
        icon={Mail}
        autoComplete="email"
      />

      {/* Password */}
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

      {/* Login Button */}
      <motion.div
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
      >
        <Button
          type="submit"
          loading={login.isPending}
          className="
            w-full
            py-3
            rounded-xl
            font-semibold
            text-white
            bg-gradient-to-r
            from-blue-600
            to-indigo-600
            hover:from-blue-700
            hover:to-indigo-700
            shadow-md
            transition
          "
        >
          Login
        </Button>
      </motion.div>

      {/* Divider */}
      <div className="flex items-center gap-3 my-2">
        <div className="flex-1 h-px bg-gray-200" />
        <span className="text-xs text-gray-400">
          OR
        </span>
        <div className="flex-1 h-px bg-gray-200" />
      </div>

      {/* Links Section */}
      <div className="flex items-center justify-between text-sm">

        <Link
          to="/register"
          className="
            font-medium
            text-blue-600
            hover:text-indigo-600
            transition
            hover:underline
          "
        >
          Create account
        </Link>

        <Link
          to="/forgot-password"
          className="
            text-gray-500
            hover:text-gray-700
            transition
          "
        >
          Forgot password?
        </Link>

      </div>

    </form>
  </motion.div>
);
}


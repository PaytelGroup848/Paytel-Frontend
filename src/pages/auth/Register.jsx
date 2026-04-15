import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, User, Phone  } from "lucide-react";
import toast from "react-hot-toast";

import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { slideUp } from "../../animations/variants";
import { useRegister } from "../../hooks/useAuth";

export default function Register() {
  const navigate = useNavigate();
  const register = useRegister();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const onChange = (e) => {
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }));
    setErrors((s) => ({ ...s, [e.target.name]: "" }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log("FORM DATA:", form);

    const nextErrors = {};

    if (!form.name) nextErrors.name = "Name is required";
    if (!form.email) nextErrors.email = "Email is required";
    if (!form.phone) nextErrors.phone = "Phone number is required";
    if (!form.password) nextErrors.password = "Password is required";


     if (form.phone && form.phone.length < 10)
      nextErrors.phone = "Phone number must be at least 10 digit";

    if (form.password && form.password.length < 8)
      nextErrors.password = "Password must be at least 8 characters";

    if (form.confirmPassword !== form.password)
      nextErrors.confirmPassword = "Passwords must match";

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length) return;

    try {
      await register.mutateAsync({
        name: form.name,
        email: form.email,
        phone: form.phone,
        password: form.password,
      });

      toast.success("Registration successful. Please login.");
      navigate("/login");
    } catch (_) {}
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
          Create your account
        </h2> */}

        <p className="text-sm text-gray-500 mt-2">
          Join CloudData and start managing your cloud effortlessly.
        </p>
      </div>

      {/* Form */}
      <form
        onSubmit={onSubmit}
        className="space-y-5"
      >
        {/* Name */}
        <Input
          label="Full Name"
          name="name"
          placeholder="John Doe"
          value={form.name}
          onChange={onChange}
          error={errors.name}
          icon={User}
          autoComplete="name"
        />

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

         <Input
          label="Phone Number"
          name="phone"
          type="tel"
          placeholder="9998887776"
          value={form.phone}
          onChange={onChange}
          error={errors.phone}
          icon={Phone}
          autoComplete="phone"
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
          autoComplete="new-password"
        />

        {/* Confirm Password */}
        <Input
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          placeholder="••••••••"
          value={form.confirmPassword}
          onChange={onChange}
          error={errors.confirmPassword}
          icon={Lock}
          autoComplete="new-password"
        />

        {/* Submit Button */}
        <motion.div
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button
            type="submit"
            loading={register.isPending}
            className="
              w-full
              py-3
              rounded-xl
              font-semibold
              bg-gradient-to-r
              from-blue-600
              to-indigo-600
              hover:from-blue-700
              hover:to-indigo-700
              text-white
              shadow-md
              transition
            "
          >
            Create Account
          </Button>
        </motion.div>

        {/* Divider */}
        <div className="flex items-center gap-3 my-2">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-xs text-gray-400">OR</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        {/* Login Link */}
        <div className="text-sm text-center text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="
              font-medium
              text-blue-600
              hover:text-indigo-600
              transition
              hover:underline
            "
          >
            Login
          </Link>
        </div>
      </form>
    </motion.div>
  );
}
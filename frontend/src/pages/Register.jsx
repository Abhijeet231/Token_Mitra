import React, { useState } from 'react';
import { registerUser } from '@/services/auth.service';
import { registerSchema } from '@/validations/register.schema';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useNavigate, Link } from 'react-router-dom';
import { zodResolver } from "@hookform/resolvers/zod";
import { User, Mail, Lock, UserPlus, Briefcase, Eye, EyeOff, Activity, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

// ── tiny helpers ────────────────────────────────────────────────────────────

const FadeUp = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 18 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
);

const roles = [
  {
    value: "patient",
    label: "Patient",
    icon: "🧑‍⚕️",
    desc: "Book appointments & track tokens",
  },
  {
    value: "doctor",
    label: "Doctor",
    icon: "👨‍⚕️",
    desc: "Manage slots & your clinic queue",
  },
];

// ── component ───────────────────────────────────────────────────────────────

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState("patient");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: { role: "patient" },
  });

  const handleRoleSelect = (value) => {
    setSelectedRole(value);
    setValue("role", value, { shouldValidate: true });
  };

  const onSubmit = async (data) => {
    try {
      await registerUser(data);
      toast.success("Account created! Welcome to TokenMitra 🎉");
      navigate("/login");
    } catch (error) {
      toast.error("Registration failed. Please try again.");
      console.error("Registration error:", error);
    }
  };

  return (
    // pt-16 offsets the fixed navbar (h-16 = 64px)
    <div className="min-h-screen pt-16 bg-gradient-to-b from-amber-50/60 via-white to-white flex items-center justify-center px-4 py-12 relative overflow-hidden">

      {/* ambient glows */}
      <div className="pointer-events-none absolute -top-20 -left-40 w-[500px] h-[500px] rounded-full bg-amber-300/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-orange-300/10 blur-3xl" />

      {/* subtle grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(#94a3b8 1px,transparent 1px),linear-gradient(90deg,#94a3b8 1px,transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 w-full max-w-md">

        {/* ── Header ── */}
        <FadeUp delay={0}>
          <div className="text-center mb-8">
            {/* logo mark */}
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 shadow-lg shadow-amber-200 mb-5">
              <Activity className="w-6 h-6 text-white" strokeWidth={2.5} />
            </div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">
              Create your account
            </h1>
            <p className="mt-2 text-sm text-slate-500 font-medium">
              Join 1,000+ patients and doctors on TokenMitra
            </p>
          </div>
        </FadeUp>

        {/* ── Card ── */}
        <FadeUp delay={0.08}>
          <div className="bg-white border border-slate-200/80 rounded-3xl shadow-xl shadow-slate-100/60 p-8">
            <form className="space-y-5" onSubmit={handleSubmit(onSubmit)} noValidate>

              {/* Full Name */}
              <div className="space-y-1.5">
                <label htmlFor="fullName" className="flex items-center gap-2 text-xs font-bold text-slate-700 uppercase tracking-wide">
                  <User className="w-3.5 h-3.5 text-amber-500" />
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  placeholder="Rahul Sharma"
                  className={`w-full px-4 py-3 rounded-xl border text-sm font-medium text-slate-900 placeholder:text-slate-400 bg-slate-50 focus:bg-white focus:ring-2 outline-none transition-all duration-200 ${
                    errors.fullName
                      ? "border-red-300 focus:ring-red-200"
                      : "border-slate-200 focus:border-amber-400 focus:ring-amber-100"
                  }`}
                  {...register("fullName")}
                />
                {errors.fullName && (
                  <p className="text-red-500 text-xs font-medium mt-1 flex items-center gap-1">
                    <span className="w-1 h-1 rounded-full bg-red-400 inline-block" />
                    {errors.fullName.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label htmlFor="email" className="flex items-center gap-2 text-xs font-bold text-slate-700 uppercase tracking-wide">
                  <Mail className="w-3.5 h-3.5 text-amber-500" />
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="you@example.com"
                  className={`w-full px-4 py-3 rounded-xl border text-sm font-medium text-slate-900 placeholder:text-slate-400 bg-slate-50 focus:bg-white focus:ring-2 outline-none transition-all duration-200 ${
                    errors.email
                      ? "border-red-300 focus:ring-red-200"
                      : "border-slate-200 focus:border-amber-400 focus:ring-amber-100"
                  }`}
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs font-medium mt-1 flex items-center gap-1">
                    <span className="w-1 h-1 rounded-full bg-red-400 inline-block" />
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <label htmlFor="password" className="flex items-center gap-2 text-xs font-bold text-slate-700 uppercase tracking-wide">
                  <Lock className="w-3.5 h-3.5 text-amber-500" />
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    placeholder="Min. 8 characters"
                    className={`w-full px-4 py-3 pr-11 rounded-xl border text-sm font-medium text-slate-900 placeholder:text-slate-400 bg-slate-50 focus:bg-white focus:ring-2 outline-none transition-all duration-200 ${
                      errors.password
                        ? "border-red-300 focus:ring-red-200"
                        : "border-slate-200 focus:border-amber-400 focus:ring-amber-100"
                    }`}
                    {...register("password")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-amber-500 transition-colors p-1"
                    tabIndex={-1}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-xs font-medium mt-1 flex items-center gap-1">
                    <span className="w-1 h-1 rounded-full bg-red-400 inline-block" />
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Role — custom card selector instead of <select> */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-xs font-bold text-slate-700 uppercase tracking-wide">
                  <Briefcase className="w-3.5 h-3.5 text-amber-500" />
                  I am a…
                </label>

                {/* hidden real input so react-hook-form still works */}
                <input type="hidden" {...register("role")} value={selectedRole} />

                <div className="grid grid-cols-2 gap-3">
                  {roles.map((r) => (
                    <button
                      key={r.value}
                      type="button"
                      onClick={() => handleRoleSelect(r.value)}
                      className={`flex flex-col items-start gap-1 p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                        selectedRole === r.value
                          ? "border-amber-400 bg-amber-50 shadow-md shadow-amber-100"
                          : "border-slate-200 bg-slate-50 hover:border-amber-200 hover:bg-amber-50/40"
                      }`}
                    >
                      <span className="text-xl">{r.icon}</span>
                      <span className={`text-sm font-bold ${selectedRole === r.value ? "text-amber-700" : "text-slate-800"}`}>
                        {r.label}
                      </span>
                      <span className="text-[10px] text-slate-400 leading-tight font-medium">{r.desc}</span>
                    </button>
                  ))}
                </div>

                {errors.role && (
                  <p className="text-red-500 text-xs font-medium mt-1 flex items-center gap-1">
                    <span className="w-1 h-1 rounded-full bg-red-400 inline-block" />
                    {errors.role.message}
                  </p>
                )}
              </div>

              {/* Submit */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                className="w-full mt-2 flex items-center justify-center gap-2.5 py-3.5 bg-slate-900 text-white text-sm font-bold rounded-xl hover:bg-amber-500 transition-all duration-300 shadow-lg shadow-slate-900/20 hover:shadow-amber-400/30 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                    </svg>
                    Creating account…
                  </>
                ) : (
                  <>
                    <UserPlus className="w-4 h-4" />
                    Create Account
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </motion.button>
            </form>

            {/* Footer link */}
            <div className="mt-6 pt-5 border-t border-slate-100 text-center">
              <p className="text-sm text-slate-500">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-amber-600 font-bold hover:text-amber-700 transition-colors"
                >
                  Log in
                </Link>
              </p>
            </div>
          </div>
        </FadeUp>

        {/* trust note */}
        <FadeUp delay={0.18}>
          <p className="text-center text-xs text-slate-400 font-medium mt-5">
            Free for patients · No credit card required · Setup in 2 min
          </p>
        </FadeUp>
      </div>
    </div>
  );
};

export default Register;
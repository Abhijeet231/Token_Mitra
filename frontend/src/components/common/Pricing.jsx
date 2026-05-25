import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import {
  Check,
  Zap,
  Building2,
  Sparkles,
  ArrowRight,
  Users,
  CalendarCheck,
  BarChart3,
  HeartPulse,
  Shield,
  Headphones,
  Star,
} from "lucide-react";

// ─── Data ────────────────────────────────────────────────────────────────────

const plans = [
  {
    id: "starter",
    name: "Starter",
    badge: null,
    price: { inr: 0, usd: 0 },
    description: "Perfect for small independent clinics just getting started.",
    icon: HeartPulse,
    accent: "slate",
    features: [
      { icon: Users,         text: "Onboard up to 5 doctors" },
      { icon: CalendarCheck, text: "50 patient bookings / month" },
      { icon: Zap,           text: "Token-based queue system" },
      { icon: Check,         text: "Email notifications" },
      { icon: Check,         text: "Basic appointment management" },
      { icon: Check,         text: "Patient self-service booking" },
    ],
    cta: "Get Started Free",
    highlight: false,
  },
  {
    id: "growth",
    name: "Growth",
    badge: "Most Popular",
    price: { inr: 2500, usd: 30 },
    description: "For growing clinics that need more capacity and insights.",
    icon: Zap,
    accent: "amber",
    features: [
      { icon: Users,         text: "Up to 20 doctors" },
      { icon: CalendarCheck, text: "Unlimited patient bookings" },
      { icon: BarChart3,     text: "Analytics dashboard" },
      { icon: Check,         text: "Priority email & SMS alerts" },
      { icon: Check,         text: "Custom slot durations" },
      { icon: Check,         text: "Patient history tracking" },
      { icon: Check,         text: "Doctor profile customization" },
    ],
    cta: "Start Growth Plan",
    highlight: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    badge: "Full Power",
    price: { inr: 9999, usd: 120 },
    description: "For hospital chains and multi-branch clinic networks.",
    icon: Building2,
    accent: "slate",
    features: [
      { icon: Users,         text: "Unlimited doctors & branches" },
      { icon: CalendarCheck, text: "Unlimited everything" },
      { icon: BarChart3,     text: "Advanced analytics & reports" },
      { icon: Shield,        text: "Dedicated account manager" },
      { icon: Headphones,    text: "24/7 priority support" },
      { icon: Check,         text: "Custom integrations & API" },
      { icon: Check,         text: "White-label option" },
      { icon: Check,         text: "SLA guarantee" },
    ],
    cta: "Contact Sales",
    highlight: false,
  },
];

// ─── FadeUp helper ───────────────────────────────────────────────────────────

const FadeUp = ({ children, delay = 0, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y: 28 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

// ─── Toast handler ───────────────────────────────────────────────────────────

const handlePlanClick = (planId) => {
  if (planId === "starter") {
    toast.info("Redirecting to free signup…");
    return;
  }
  toast(
    <div className="flex flex-col gap-0.5">
      <span className="font-bold text-slate-900 text-sm">
        Subscriptions coming soon 🚀
      </span>
      <span className="text-xs text-slate-500 leading-snug">
        We're testing with early clinics and refining the experience. Drop your email and we'll notify you first.
      </span>
    </div>,
    {
      icon: <Sparkles className="w-5 h-5 text-amber-500 flex-shrink-0" />,
      style: {
        background: "#fff",
        border: "1px solid #fde68a",
        borderRadius: "16px",
        boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
      },
    }
  );
};

// ─── Currency toggle ─────────────────────────────────────────────────────────

const CurrencyToggle = ({ currency, onChange }) => (
  <div className="inline-flex items-center gap-1 p-1 bg-slate-100 border border-slate-200 rounded-xl">
    {["INR", "USD"].map((c) => (
      <button
        key={c}
        onClick={() => onChange(c)}
        className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all duration-200 ${
          currency === c
            ? "bg-white text-slate-900 shadow-sm border border-slate-200"
            : "text-slate-500 hover:text-slate-700"
        }`}
      >
        {c === "INR" ? "₹ INR" : "$ USD"}
      </button>
    ))}
  </div>
);

// ─── Plan card ───────────────────────────────────────────────────────────────

const PlanCard = ({ plan, currency, index }) => {
  const price = currency === "INR" ? plan.price.inr : plan.price.usd;
  const symbol = currency === "INR" ? "₹" : "$";
  const isFree = price === 0;
  const isHighlight = plan.highlight;

  return (
    <FadeUp delay={index * 0.1}>
      <motion.div
        whileHover={{ y: isHighlight ? -6 : -4 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className={`relative flex flex-col h-full rounded-3xl border transition-all duration-300 ${
          isHighlight
            ? "bg-slate-900 border-amber-400/30 shadow-2xl shadow-slate-900/30"
            : "bg-white border-slate-200 shadow-sm hover:border-amber-200 hover:shadow-lg hover:shadow-amber-50/60"
        }`}
      >
        {/* Popular badge */}
        {plan.badge && (
          <div className={`absolute -top-3.5 left-1/2 -translate-x-1/2 inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-[11px] font-black tracking-wide shadow-md whitespace-nowrap ${
            isHighlight
              ? "bg-amber-400 text-slate-900 shadow-amber-300/40"
              : "bg-slate-900 text-white shadow-slate-900/20"
          }`}>
            <Star className="w-3 h-3" />
            {plan.badge}
          </div>
        )}

        <div className="p-7 flex flex-col h-full">
          {/* Header */}
          <div className="mb-6">
            <div className={`inline-flex items-center justify-center w-10 h-10 rounded-2xl mb-4 ${
              isHighlight
                ? "bg-amber-400/20 text-amber-400"
                : "bg-amber-50 text-amber-500 border border-amber-100"
            }`}>
              <plan.icon className="w-5 h-5" />
            </div>

            <h3 className={`text-lg font-black tracking-tight mb-1 ${
              isHighlight ? "text-white" : "text-slate-900"
            }`}>
              {plan.name}
            </h3>

            <p className={`text-xs leading-relaxed ${
              isHighlight ? "text-slate-400" : "text-slate-500"
            }`}>
              {plan.description}
            </p>
          </div>

          {/* Price */}
          <div className="mb-6">
            <div className="flex items-end gap-1.5">
              {isFree ? (
                <span className={`text-4xl font-black tracking-tight ${
                  isHighlight ? "text-white" : "text-slate-900"
                }`}>
                  Free
                </span>
              ) : (
                <>
                  <span className={`text-sm font-bold self-start mt-2 ${
                    isHighlight ? "text-amber-400" : "text-amber-500"
                  }`}>
                    {symbol}
                  </span>
                  <span className={`text-4xl font-black tracking-tight leading-none ${
                    isHighlight ? "text-white" : "text-slate-900"
                  }`}>
                    {price.toLocaleString()}
                  </span>
                  <span className={`text-xs font-semibold mb-1 ${
                    isHighlight ? "text-slate-400" : "text-slate-400"
                  }`}>
                    / month
                  </span>
                </>
              )}
            </div>
            {isFree && (
              <p className={`text-xs font-medium mt-1 ${
                isHighlight ? "text-slate-400" : "text-slate-400"
              }`}>
                No credit card required
              </p>
            )}
          </div>

          {/* Divider */}
          <div className={`h-px mb-6 ${isHighlight ? "bg-white/10" : "bg-slate-100"}`} />

          {/* Features */}
          <ul className="space-y-2.5 mb-8 flex-1">
            {plan.features.map((f, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <div className={`flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center mt-0.5 ${
                  isHighlight ? "bg-amber-400/20" : "bg-amber-50 border border-amber-100"
                }`}>
                  <Check className={`w-2.5 h-2.5 ${isHighlight ? "text-amber-400" : "text-amber-500"}`} />
                </div>
                <span className={`text-xs font-medium leading-snug ${
                  isHighlight ? "text-slate-300" : "text-slate-600"
                }`}>
                  {f.text}
                </span>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <motion.button
            onClick={() => handlePlanClick(plan.id)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`w-full flex items-center justify-center gap-2 py-3.5 text-sm font-bold rounded-xl transition-all duration-300 group ${
              isHighlight
                ? "bg-amber-400 text-slate-900 hover:bg-amber-300 shadow-lg shadow-amber-400/25"
                : plan.id === "enterprise"
                ? "bg-slate-900 text-white hover:bg-amber-500 shadow-md shadow-slate-900/15 hover:shadow-amber-400/25"
                : "bg-slate-100 text-slate-900 hover:bg-amber-50 border border-slate-200 hover:border-amber-300"
            }`}
          >
            {plan.cta}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </motion.button>
        </div>
      </motion.div>
    </FadeUp>
  );
};

// ─── Main export ─────────────────────────────────────────────────────────────

const Pricing = () => {
  const [currency, setCurrency] = useState("INR");

  return (
    <section id="pricing" className="py-28 bg-gradient-to-b from-white to-amber-50/30 relative overflow-hidden">

      {/* ambient glows */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full bg-amber-200/10 blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* ── Section header ── */}
        <FadeUp>
          <div className="text-center mb-4 max-w-2xl mx-auto">
            <p className="text-xs font-bold text-amber-600 uppercase tracking-widest mb-4">Pricing</p>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              Simple, transparent<br />pricing
            </h2>
            <p className="mt-5 text-base text-slate-500 leading-relaxed">
              Start free, scale when you're ready. No hidden fees, no surprises.
            </p>
          </div>
        </FadeUp>

        {/* ── Currency toggle ── */}
        <FadeUp delay={0.1}>
          <div className="flex justify-center mt-8 mb-14">
            <CurrencyToggle currency={currency} onChange={setCurrency} />
          </div>
        </FadeUp>

        {/* ── Plan cards ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {plans.map((plan, i) => (
            <PlanCard key={plan.id} plan={plan} currency={currency} index={i} />
          ))}
        </div>

        {/* ── Bottom note ── */}
        <FadeUp delay={0.35}>
          <p className="text-center text-xs text-slate-400 font-medium mt-10">
            All plans include core queue management · Prices exclusive of applicable taxes ·{" "}
            <button
              onClick={() => handlePlanClick("growth")}
              className="text-amber-500 hover:text-amber-600 font-bold transition-colors"
            >
              Talk to us about custom plans →
            </button>
          </p>
        </FadeUp>
      </div>
    </section>
  );
};

export default Pricing;
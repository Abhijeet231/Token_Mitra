import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";
import {
  CalendarCheck,
  Clock,
  Bell,
  ShieldCheck,
  Stethoscope,
  ChevronRight,
  ArrowRight,
  Star,
  CheckCircle,
  Menu,
  X,
  Search,
  Plus,
  Minus,
  Zap,
  Users,
  BarChart3,
  Layers,
  Sparkles,
  Mail,
  Phone,
  MapPin,
  Twitter,
  Linkedin,
  Github,
  Activity,
  TrendingUp,
} from "lucide-react";

// ─────────────────────────────────────────────
//  Helpers & small primitives
// ─────────────────────────────────────────────

const FadeUp = ({ children, delay = 0, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y: 32 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

const Glow = ({ color = "amber", size = 400, className = "" }) => (
  <div
    className={`pointer-events-none absolute rounded-full blur-3xl opacity-20 ${className}`}
    style={{
      width: size,
      height: size,
      background:
        color === "amber"
          ? "radial-gradient(circle, #f59e0b 0%, transparent 70%)"
          : "radial-gradient(circle, #fb923c 0%, transparent 70%)",
    }}
  />
);

// ─────────────────────────────────────────────
//  Floating UI cards for Hero
// ─────────────────────────────────────────────

const DoctorCard = ({ delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9, y: 20 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    transition={{ delay, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    className="absolute bg-white/90 backdrop-blur-md border border-amber-100 rounded-2xl p-4 shadow-2xl shadow-amber-100/40 w-52"
    style={{ top: "6%", right: "-4%" }}
  >
    <div className="flex items-center gap-3 mb-3">
      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-300 to-orange-400 flex items-center justify-center text-white text-xs font-bold shadow">
        DR
      </div>
      <div>
        <p className="text-xs font-bold text-slate-900">Dr. Priya Nair</p>
        <p className="text-[10px] text-amber-600">Cardiologist</p>
      </div>
    </div>
    <div className="flex items-center gap-1 mb-2">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
      ))}
      <span className="text-[10px] text-slate-500 ml-1">4.9 (342)</span>
    </div>
    <div className="flex items-center gap-1.5 text-[10px] text-slate-500">
      <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
      Available today
    </div>
  </motion.div>
);

const BookingCard = ({ delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9, y: 20 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    transition={{ delay, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    className="absolute bg-white/90 backdrop-blur-md border border-amber-100 rounded-2xl p-4 shadow-2xl shadow-orange-100/40 w-48"
    style={{ bottom: "14%", left: "-2%" }}
  >
    <div className="flex items-center gap-2 mb-3">
      <div className="w-7 h-7 rounded-lg bg-amber-50 flex items-center justify-center">
        <CalendarCheck className="w-4 h-4 text-amber-500" />
      </div>
      <p className="text-xs font-bold text-slate-900">Appointment</p>
    </div>
    <p className="text-[10px] text-slate-500 mb-1">Token #07 confirmed</p>
    <p className="text-[10px] font-medium text-slate-700">Tomorrow, 10:30 AM</p>
    <div className="mt-2 px-2 py-1 bg-emerald-50 border border-emerald-100 rounded-lg text-[10px] text-emerald-600 font-semibold text-center">
      ✓ Confirmed
    </div>
  </motion.div>
);

const StatsCard = ({ delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9, x: 20 }}
    animate={{ opacity: 1, scale: 1, x: 0 }}
    transition={{ delay, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    className="absolute bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700/50 rounded-2xl p-4 shadow-2xl w-44"
    style={{ bottom: "20%", right: "-6%" }}
  >
    <div className="flex items-center gap-2 mb-2">
      <TrendingUp className="w-4 h-4 text-amber-400" />
      <p className="text-[10px] font-semibold text-slate-300">Wait Time</p>
    </div>
    <p className="text-2xl font-bold text-white">↓ 74%</p>
    <p className="text-[10px] text-slate-400 mt-0.5">vs traditional booking</p>
  </motion.div>
);

const SlotCard = ({ delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9, x: -20 }}
    animate={{ opacity: 1, scale: 1, x: 0 }}
    transition={{ delay, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    className="absolute bg-white/90 backdrop-blur-md border border-amber-100 rounded-2xl p-4 shadow-2xl shadow-amber-100/40 w-52"
    style={{ top: "30%", left: "-8%" }}
  >
    <p className="text-[10px] font-bold text-slate-900 mb-2.5">
      Available Slots
    </p>
    <div className="grid grid-cols-3 gap-1">
      {["9:00", "9:30", "10:00", "10:30", "11:00", "12:00"].map((t, i) => (
        <div
          key={t}
          className={`text-center text-[9px] font-medium py-1 rounded-md ${
            i === 2
              ? "bg-amber-500 text-white"
              : i === 4
                ? "bg-slate-100 text-slate-400 line-through"
                : "bg-amber-50 text-amber-700 border border-amber-100"
          }`}
        >
          {t}
        </div>
      ))}
    </div>
  </motion.div>
);

// ─────────────────────────────────────────────
//  Hero
// ─────────────────────────────────────────────

const Hero = ({ onNav }) => {
  const navigate = useNavigate();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-amber-50/60 via-white to-white pt-16"
    >
      {/* ambient glows */}
      <Glow color="amber" size={600} className="-top-20 -left-40" />
      <Glow color="orange" size={500} className="top-1/3 -right-40" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(251,191,36,0.08),transparent)]" />

      {/* subtle grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#94a3b8 1px,transparent 1px),linear-gradient(90deg,#94a3b8 1px,transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <motion.div
        style={{ y: heroY, opacity: heroOpacity }}
        className="relative z-10 w-full max-w-7xl mx-auto px-6"
      >
        <div className="text-center mb-16">
          {/* badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-50 border border-amber-200/60 rounded-full text-amber-700 text-xs font-semibold mb-8 shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Healthcare infrastructure for modern India
            <ChevronRight className="w-3.5 h-3.5" />
          </motion.div>

          {/* headline */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-[clamp(2.6rem,7vw,5.5rem)] font-black text-slate-900 leading-[1.05] tracking-tight max-w-5xl mx-auto"
          >
            The Operating System
            <br />
            <span className="relative">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600">
                for Doctor Appointments
              </span>
              <motion.span
                className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{
                  delay: 0.9,
                  duration: 0.6,
                  ease: [0.22, 1, 0.36, 1],
                }}
              />
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 text-lg text-slate-500 max-w-xl mx-auto leading-relaxed font-medium"
          >
            TokenMitra eliminates waiting room chaos. Patients book in seconds.
            Doctors run on autopilot. Everyone wins.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.55,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button
              onClick={() => navigate("/register")}
              className="group inline-flex items-center gap-2.5 px-8 py-4 bg-slate-900 text-white font-bold text-sm rounded-2xl hover:bg-amber-500 transition-all duration-300 shadow-xl shadow-slate-900/25 hover:shadow-amber-400/35 hover:scale-[1.02] active:scale-[0.98]"
            >
              Start for Free
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => navigate("/login")}
              className="inline-flex items-center gap-2.5 px-8 py-4 bg-white border border-slate-200 text-slate-700 font-bold text-sm rounded-2xl hover:border-amber-300 hover:text-amber-600 transition-all duration-300 shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-[0.98]"
            >
              <CalendarCheck className="w-4 h-4" />
              Log in
            </button>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-5 text-xs text-slate-400 font-medium"
          >
            Free for patients · No credit card · Setup in 2 minutes
          </motion.p>
        </div>

        {/* Hero visual — dashboard mockup with floating cards */}
        <div className="relative max-w-3xl mx-auto h-80 md:h-96">
          {/* Main dashboard shell */}
          <motion.div
            initial={{ opacity: 0, y: 48, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 mx-auto w-full max-w-xl rounded-3xl bg-white border border-slate-200/80 shadow-2xl shadow-slate-200/60 overflow-hidden"
          >
            {/* chrome bar */}
            <div className="bg-slate-50 border-b border-slate-100 px-5 py-3 flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-amber-400" />
              <div className="w-3 h-3 rounded-full bg-emerald-400" />
              <div className="flex-1 mx-4 bg-white border border-slate-200 rounded-md px-3 py-1 text-[10px] text-slate-400 font-mono">
                tokenmitra.app/dashboard
              </div>
            </div>
            {/* content */}
            <div className="p-5">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-xs font-bold text-slate-900">
                    Good morning, Rahul 👋
                  </p>
                  <p className="text-[10px] text-slate-400">Thursday, May 21</p>
                </div>
                <div className="px-2.5 py-1 bg-amber-50 border border-amber-100 rounded-lg text-[10px] font-semibold text-amber-600">
                  3 upcoming
                </div>
              </div>
              {/* mini stat row */}
              <div className="grid grid-cols-3 gap-2 mb-4">
                {[
                  { label: "Avg Wait", value: "4 min", icon: Clock, up: false },
                  {
                    label: "Doctors",
                    value: "124",
                    icon: Stethoscope,
                    up: true,
                  },
                  {
                    label: "Booked",
                    value: "Today",
                    icon: CalendarCheck,
                    up: true,
                  },
                ].map(({ label, value, icon: Icon, up }) => (
                  <div
                    key={label}
                    className="bg-slate-50 border border-slate-100 rounded-xl p-2.5 text-center"
                  >
                    <Icon className="w-3.5 h-3.5 text-amber-500 mx-auto mb-1" />
                    <p className="text-sm font-black text-slate-900">{value}</p>
                    <p className="text-[9px] text-slate-400">{label}</p>
                  </div>
                ))}
              </div>
              {/* appointment row */}
              {[
                {
                  name: "Dr. Arjun Mehra",
                  spec: "Neurologist",
                  time: "11:00 AM",
                  token: "T-03",
                },
                {
                  name: "Dr. Sunita Rao",
                  spec: "Dermatologist",
                  time: "2:30 PM",
                  token: "T-11",
                },
              ].map((appt) => (
                <div
                  key={appt.name}
                  className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-amber-50/50 transition-colors mb-1.5"
                >
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-amber-300 to-orange-400 flex items-center justify-center text-white text-[9px] font-bold flex-shrink-0">
                    {appt.name
                      .split(" ")
                      .slice(1)
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] font-bold text-slate-900 truncate">
                      {appt.name}
                    </p>
                    <p className="text-[9px] text-slate-400">{appt.spec}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[9px] font-bold text-slate-700">
                      {appt.time}
                    </p>
                    <p className="text-[9px] text-amber-500 font-semibold">
                      {appt.token}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Floating cards */}
          <DoctorCard delay={0.9} />
          <BookingCard delay={1.1} />
          <StatsCard delay={1.3} />
          <SlotCard delay={1.0} />
        </div>
      </motion.div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-white to-transparent pointer-events-none" />
    </section>
  );
};

// ─────────────────────────────────────────────
//  Stats Bar
// ─────────────────────────────────────────────

const stats = [
  { value: "100+", label: "Verified Doctors", icon: Stethoscope },
  { value: "1,000+", label: "Happy Patients", icon: Users },
  { value: "< 4 min", label: "Average Wait Time", icon: Clock },
  { value: "99.9%", label: "Uptime SLA", icon: ShieldCheck },
];

const StatsBar = () => (
  <section className="py-16 border-y border-slate-100 bg-white">
    <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
      {stats.map((s, i) => (
        <FadeUp key={s.label} delay={i * 0.08}>
          <div className="text-center group">
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-amber-50 border border-amber-100 mb-3 group-hover:border-amber-300 transition-colors">
              <s.icon className="w-5 h-5 text-amber-500" />
            </div>
            <h3 className="text-3xl font-black text-slate-900 tracking-tight">
              {s.value}
            </h3>
            <p className="text-sm text-slate-500 font-medium mt-1">{s.label}</p>
          </div>
        </FadeUp>
      ))}
    </div>
  </section>
);

// ─────────────────────────────────────────────
//  Feature Showcase — staggered bento layout
// ─────────────────────────────────────────────

const featureCards = [
  {
    icon: Zap,
    title: "Token-Based Queue",
    desc: "Revolutionary token system that kills the waiting room. Patients arrive exactly when it's their turn.",
    size: "large",
    accent: "amber",
  },
  {
    icon: Bell,
    title: "Email Notifications",
    desc: "Automated alerts when your turn is approaching. No more guessing.",
    size: "small",
    accent: "orange",
  },
  {
    icon: CalendarCheck,
    title: "Smart Scheduling",
    desc: "Doctors define availability slots. The system handles the rest — no double-bookings, ever.",
    size: "small",
    accent: "amber",
  },
  {
    icon: BarChart3,
    title: "Real-Time Analytics",
    desc: "Doctors see live queue status, appointment flow, and capacity metrics at a glance.",
    size: "medium",
    accent: "orange",
  },
  {
    icon: ShieldCheck,
    title: "Secure & Compliant",
    desc: "Bank-grade encryption on all health data. Privacy-first architecture.",
    size: "medium",
    accent: "amber",
  },
  {
    icon: Search,
    title: "Intelligent Search",
    desc: "Find the right specialist in seconds — filtered by specialty, location, and availability.",
    size: "small",
    accent: "orange",
  },
];

const FeatureCard = ({ icon: Icon, title, desc, size, accent, delay }) => {
  const colorMap = {
    amber:
      "bg-amber-50 border-amber-100 text-amber-500 group-hover:border-amber-300",
    orange:
      "bg-orange-50 border-orange-100 text-orange-500 group-hover:border-orange-300",
  };

  return (
    <FadeUp delay={delay}>
      <div className="group h-full bg-white border border-slate-200 rounded-3xl p-7 hover:border-amber-200 hover:shadow-xl hover:shadow-amber-50/60 transition-all duration-400 cursor-default hover:-translate-y-1">
        <div
          className={`inline-flex items-center justify-center w-11 h-11 rounded-2xl border mb-5 transition-all duration-300 ${colorMap[accent]}`}
        >
          <Icon className="w-5 h-5" />
        </div>
        <h3 className="text-base font-bold text-slate-900 mb-2">{title}</h3>
        <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
      </div>
    </FadeUp>
  );
};

const FeatureShowcase = () => (
  <section
    id="features"
    className="py-28 bg-gradient-to-b from-white to-amber-50/30"
  >
    <div className="max-w-7xl mx-auto px-6">
      <FadeUp>
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <p className="text-xs font-bold text-amber-600 uppercase tracking-widest mb-4">
            Platform Features
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Built for every step
            <br />
            of the healthcare journey
          </h2>
          <p className="mt-5 text-base text-slate-500 leading-relaxed">
            From first search to final confirmation — TokenMitra has every
            touchpoint covered.
          </p>
        </div>
      </FadeUp>

      {/* Staggered grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {featureCards.map((f, i) => (
          <FeatureCard key={f.title} {...f} delay={i * 0.07} />
        ))}
      </div>
    </div>
  </section>
);

// ─────────────────────────────────────────────
//  Interactive Product Demo
// ─────────────────────────────────────────────

const ProductDemo = () => {
  const [active, setActive] = useState(0);
  const tabs = [
    {
      label: "Search & Discover",
      icon: Search,
      preview: (
        <div className="space-y-3">
          <div className="flex items-center gap-3 bg-white border border-slate-200 rounded-xl px-4 py-3 shadow-sm">
            <Search className="w-4 h-4 text-slate-400" />
            <span className="text-sm text-slate-400">
              Search doctors, speciality...
            </span>
          </div>
          {[
            {
              name: "Dr. Priya Nair",
              spec: "Cardiologist",
              rating: 4.9,
              avail: "Today",
            },
            {
              name: "Dr. Arjun Mehra",
              spec: "Neurologist",
              rating: 4.8,
              avail: "Tomorrow",
            },
            {
              name: "Dr. Sunita Rao",
              spec: "Dermatologist",
              rating: 4.7,
              avail: "Today",
            },
          ].map((d) => (
            <div
              key={d.name}
              className="flex items-center gap-3 bg-white border border-slate-100 rounded-xl p-3 hover:border-amber-200 transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-300 to-orange-400 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                {d.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .slice(0, 2)}
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-slate-900">{d.name}</p>
                <p className="text-xs text-slate-400">{d.spec}</p>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-1 justify-end">
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  <span className="text-xs font-semibold text-slate-700">
                    {d.rating}
                  </span>
                </div>
                <span className="text-[10px] text-emerald-500 font-semibold">
                  {d.avail}
                </span>
              </div>
            </div>
          ))}
        </div>
      ),
    },
    {
      label: "Book a Slot",
      icon: CalendarCheck,
      preview: (
        <div className="space-y-4">
          <p className="text-xs font-bold text-slate-900">
            Dr. Priya Nair — Thursday, May 22
          </p>
          <div className="grid grid-cols-4 gap-2">
            {[
              "9:00",
              "9:30",
              "10:00",
              "10:30",
              "11:00",
              "11:30",
              "2:00",
              "2:30",
              "3:00",
              "3:30",
              "4:00",
              "4:30",
            ].map((t, i) => (
              <motion.button
                key={t}
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.97 }}
                className={`text-[11px] py-2 rounded-lg font-semibold transition-all ${
                  i === 3
                    ? "bg-amber-500 text-white shadow-md shadow-amber-200"
                    : i === 5 || i === 9
                      ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                      : "bg-amber-50 text-amber-700 border border-amber-100 hover:bg-amber-100"
                }`}
              >
                {t}
              </motion.button>
            ))}
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-3 bg-slate-900 text-white text-sm font-bold rounded-xl hover:bg-amber-500 transition-colors shadow-lg"
          >
            Confirm — Token #07
          </motion.button>
        </div>
      ),
    },
    {
      label: "Track Your Token",
      icon: Activity,
      preview: (
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-amber-50 border border-amber-100 rounded-2xl">
            <div>
              <p className="text-xs text-amber-600 font-semibold mb-1">
                Your Token
              </p>
              <p className="text-4xl font-black text-slate-900">#07</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-slate-500 mb-1">Currently serving</p>
              <p className="text-4xl font-black text-amber-500">#04</p>
            </div>
          </div>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
              <div
                key={n}
                className={`flex-1 h-2 rounded-full ${
                  n <= 4
                    ? "bg-amber-400"
                    : n === 5 || n === 6 || n === 7
                      ? "bg-amber-100"
                      : "bg-slate-100"
                }`}
              />
            ))}
          </div>
          <p className="text-xs text-slate-500 text-center">
            Est. wait: <strong className="text-slate-900">~12 minutes</strong>
          </p>
          <div className="flex items-center gap-2 p-3 bg-emerald-50 border border-emerald-100 rounded-xl text-xs text-emerald-700 font-medium">
            <Bell className="w-4 h-4" />
            You'll get an email when token #06 is called
          </div>
        </div>
      ),
    },
  ];

  return (
    <section className="py-28 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <FadeUp>
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <p className="text-xs font-bold text-amber-600 uppercase tracking-widest mb-4">
              Live Preview
            </p>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
              See it in action
            </h2>
            <p className="mt-5 text-base text-slate-500">
              The full patient experience, from search to waiting room.
            </p>
          </div>
        </FadeUp>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Tabs */}
          <FadeUp delay={0.1}>
            <div className="space-y-3">
              {tabs.map((t, i) => (
                <button
                  key={t.label}
                  onClick={() => setActive(i)}
                  className={`w-full flex items-center gap-4 p-5 rounded-2xl border text-left transition-all duration-300 ${
                    active === i
                      ? "bg-amber-50 border-amber-200 shadow-md shadow-amber-50"
                      : "bg-white border-slate-200 hover:border-amber-200 hover:bg-amber-50/40"
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${
                      active === i
                        ? "bg-amber-500 text-white"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    <t.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p
                      className={`text-sm font-bold ${active === i ? "text-amber-700" : "text-slate-900"}`}
                    >
                      {t.label}
                    </p>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {i === 0 && "Discover verified specialists near you"}
                      {i === 1 && "Pick a slot and get an instant token"}
                      {i === 2 && "Live queue position with smart alerts"}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </FadeUp>

          {/* Preview panel */}
          <FadeUp delay={0.2}>
            <div className="bg-white border border-slate-200 rounded-3xl shadow-2xl shadow-slate-100 overflow-hidden">
              <div className="bg-slate-50 border-b border-slate-100 px-5 py-3 flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                <p className="ml-3 text-[10px] text-slate-400 font-mono">
                  tokenmitra.app
                </p>
              </div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -12 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="p-6"
                >
                  {tabs[active].preview}
                </motion.div>
              </AnimatePresence>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
};

// ─────────────────────────────────────────────
//  How It Works
// ─────────────────────────────────────────────

const HowItWorks = () => {
  const steps = [
    {
      n: "01",
      title: "Create your account",
      desc: "Sign up as a patient or doctor in under 2 minutes. No paperwork, no friction.",
      icon: Users,
    },
    {
      n: "02",
      title: "Search & discover",
      desc: "Patients search verified doctors by specialty, availability, and location.",
      icon: Search,
    },
    {
      n: "03",
      title: "Get your token",
      desc: "Book a slot and receive a unique queue token — no more guessing your wait.",
      icon: CalendarCheck,
    },
    {
      n: "04",
      title: "Show up on time",
      desc: "Get notified when your turn is near. Arrive exactly when you're needed.",
      icon: Bell,
    },
  ];

  return (
    <section
      id="how-it-works"
      className="py-28 bg-gradient-to-b from-amber-50/30 to-white"
    >
      <div className="max-w-7xl mx-auto px-6">
        <FadeUp>
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <p className="text-xs font-bold text-amber-600 uppercase tracking-widest mb-4">
              Process
            </p>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
              Zero friction.
              <br />
              Start to finish.
            </h2>
          </div>
        </FadeUp>

        <div className="relative">
          {/* connector line */}
          <div className="hidden md:block absolute top-[2.6rem] left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-amber-200 to-transparent" />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {steps.map((s, i) => (
              <FadeUp key={s.n} delay={i * 0.1}>
                <div className="relative text-center">
                  <div className="relative z-10 inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white border-2 border-amber-200 shadow-lg shadow-amber-100/50 mb-5 mx-auto">
                    <s.icon className="w-6 h-6 text-amber-500" />
                    <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-amber-500 text-white text-[9px] font-black flex items-center justify-center">
                      {i + 1}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-2">
                    {s.title}
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// ─────────────────────────────────────────────
//  Workflow Showcase — Doctor + Patient
// ─────────────────────────────────────────────

const WorkflowShowcase = () => {
  const panels = [
    {
      role: "For Patients",
      headline: "Healthcare that\nrespects your time",
      color: "amber",
      features: [
        "Search verified doctors by specialty",
        "View real-time slot availability",
        "Instant token-based booking",
        "Email reminders before your visit",
        "Easy cancellation, anytime",
      ],
      cta: "Book an appointment →",
    },
    {
      role: "For Doctors",
      headline: "Run your clinic\non autopilot",
      color: "slate",
      features: [
        "Custom availability slot builder",
        "Automated queue management",
        "Zero double-booking guarantee",
        "Patient history at a glance",
        "Smart schedule analytics",
      ],
      cta: "Set up your profile →",
    },
  ];

  return (
    <section className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <FadeUp>
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <p className="text-xs font-bold text-amber-600 uppercase tracking-widest mb-4">
              Who it's for
            </p>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
              Two sides of the
              <br />
              same revolution
            </h2>
          </div>
        </FadeUp>

        <div className="grid md:grid-cols-2 gap-8">
          {panels.map((p, i) => (
            <FadeUp key={p.role} delay={i * 0.12}>
              <div
                className={`relative rounded-3xl p-10 overflow-hidden ${
                  p.color === "amber"
                    ? "bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-100"
                    : "bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700/30"
                }`}
              >
                {p.color === "slate" && (
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_80%_20%,rgba(251,191,36,0.12),transparent)] pointer-events-none" />
                )}
                <span
                  className={`inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-6 ${
                    p.color === "amber"
                      ? "bg-amber-100 text-amber-700"
                      : "bg-amber-500/20 text-amber-400"
                  }`}
                >
                  {p.role}
                </span>
                <h3
                  className={`text-3xl font-black leading-tight mb-8 whitespace-pre-line ${
                    p.color === "amber" ? "text-slate-900" : "text-white"
                  }`}
                >
                  {p.headline}
                </h3>
                <ul className="space-y-3 mb-8">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-center gap-3">
                      <CheckCircle
                        className={`w-4 h-4 flex-shrink-0 ${
                          p.color === "amber"
                            ? "text-amber-500"
                            : "text-amber-400"
                        }`}
                      />
                      <span
                        className={`text-sm font-medium ${
                          p.color === "amber"
                            ? "text-slate-700"
                            : "text-slate-300"
                        }`}
                      >
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>
                <button
                  className={`text-sm font-bold flex items-center gap-1.5 group transition-colors ${
                    p.color === "amber"
                      ? "text-amber-600 hover:text-amber-700"
                      : "text-amber-400 hover:text-amber-300"
                  }`}
                >
                  {p.cta}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─────────────────────────────────────────────
//  Testimonials
// ─────────────────────────────────────────────

const testimonials = [
  {
    name: "Sneha Patel",
    role: "Patient · Mumbai",
    text: "I used to spend 2 hours waiting at the clinic. With TokenMitra I arrive at the exact right time. This is how healthcare should always have worked.",
    stars: 5,
    initials: "SP",
  },
  {
    name: "Dr. Rajesh Kumar",
    role: "Cardiologist · Delhi",
    text: "My clinic runs like clockwork now. Patients arrive prepared, no-shows are down 60%, and I can focus entirely on medicine instead of logistics.",
    stars: 5,
    initials: "RK",
  },
  {
    name: "Anita Sharma",
    role: "Patient · Bengaluru",
    text: "The email notification system is brilliant. I got a ping exactly 15 minutes before my token was due. Zero waiting, zero stress.",
    stars: 5,
    initials: "AS",
  },
  {
    name: "Dr. Meera Iyer",
    role: "Dermatologist · Chennai",
    text: "Setting up availability slots takes 5 minutes. The platform literally manages my entire schedule. I wish I'd found this years ago.",
    stars: 5,
    initials: "MI",
  },
];

const Testimonials = () => (
  <section
    id="testimonials"
    className="py-28 bg-gradient-to-b from-white to-amber-50/30"
  >
    <div className="max-w-7xl mx-auto px-6">
      <FadeUp>
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <p className="text-xs font-bold text-amber-600 uppercase tracking-widest mb-4">
            Testimonials
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
            Real people.
            <br />
            Real results.
          </h2>
        </div>
      </FadeUp>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {testimonials.map((t, i) => (
          <FadeUp key={t.name} delay={i * 0.1}>
            <div className="bg-white border border-slate-200 rounded-3xl p-8 hover:border-amber-200 hover:shadow-lg hover:shadow-amber-50 transition-all duration-300">
              <div className="flex gap-1 mb-5">
                {Array.from({ length: t.stars }).map((_, j) => (
                  <Star
                    key={j}
                    className="w-4 h-4 fill-amber-400 text-amber-400"
                  />
                ))}
              </div>
              <p className="text-slate-700 text-base leading-relaxed font-medium mb-6">
                "{t.text}"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-300 to-orange-400 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                  {t.initials}
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">{t.name}</p>
                  <p className="text-xs text-slate-400">{t.role}</p>
                </div>
              </div>
            </div>
          </FadeUp>
        ))}
      </div>
    </div>
  </section>
);

// ─────────────────────────────────────────────
//  FAQ
// ─────────────────────────────────────────────

const faqs = [
  {
    q: "Is TokenMitra really free for patients?",
    a: "Yes, completely. Patients create accounts, search doctors, and book appointments at zero cost. We make our money from premium tools for doctors.",
  },
  {
    q: "How does the token system work?",
    a: "When you book an appointment, you receive a sequential token number. The system tracks the queue in real-time and sends you notifications as your turn approaches, so you only need to arrive a few minutes before you're called.",
  },
  {
    q: "Can doctors integrate their existing schedule?",
    a: "Doctors define their own availability windows in TokenMitra. The platform automatically manages slots, prevents double-booking, and provides a real-time queue dashboard.",
  },
  {
    q: "What happens if I need to cancel?",
    a: "Patients can cancel appointments at any time before the appointment. The slot is automatically released back to availability and the next patient in line is notified.",
  },
  {
    q: "Is my health data secure?",
    a: "All data is encrypted in transit and at rest. We follow industry-standard security practices and never sell personal health information to third parties.",
  },
];

const FAQ = () => {
  const [open, setOpen] = useState(null);

  return (
    <section id="faq" className="py-28 bg-white">
      <div className="max-w-3xl mx-auto px-6">
        <FadeUp>
          <div className="text-center mb-16">
            <p className="text-xs font-bold text-amber-600 uppercase tracking-widest mb-4">
              FAQ
            </p>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
              Questions answered
            </h2>
          </div>
        </FadeUp>

        <div className="space-y-3">
          {faqs.map((f, i) => (
            <FadeUp key={i} delay={i * 0.06}>
              <div
                className={`border rounded-2xl overflow-hidden transition-all duration-300 ${
                  open === i
                    ? "border-amber-200 shadow-md shadow-amber-50"
                    : "border-slate-200 hover:border-amber-200"
                }`}
              >
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className="text-sm font-bold text-slate-900 pr-4">
                    {f.q}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
                      open === i
                        ? "bg-amber-500 text-white"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {open === i ? (
                      <Minus className="w-3.5 h-3.5" />
                    ) : (
                      <Plus className="w-3.5 h-3.5" />
                    )}
                  </div>
                </button>
                <AnimatePresence initial={false}>
                  {open === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <div className="px-6 pb-6 text-sm text-slate-500 leading-relaxed">
                        {f.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─────────────────────────────────────────────
//  Final CTA
// ─────────────────────────────────────────────

const FinalCTA = ({ onNav }) => (
  <section className="py-28 bg-gradient-to-b from-amber-50/30 to-white">
    <div className="max-w-5xl mx-auto px-6">
      <FadeUp>
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 border border-slate-700/30 p-16 text-center shadow-2xl">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_-10%,rgba(251,191,36,0.18),transparent)] pointer-events-none" />
          <Glow
            color="amber"
            size={300}
            className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-15"
          />

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-500/10 border border-amber-500/20 rounded-full text-amber-400 text-xs font-semibold mb-8">
              <Sparkles className="w-3.5 h-3.5" />
              No waiting rooms. No missed appointments.
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-[1.05] mb-6">
              The future of
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">
                healthcare is here.
              </span>
            </h2>
            <p className="text-slate-400 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
              Join thousands of patients and doctors already on TokenMitra. Get
              started in under 2 minutes.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => onNav("/register")}
                className="group inline-flex items-center gap-2.5 px-9 py-4 bg-amber-500 text-slate-900 font-bold text-sm rounded-2xl hover:bg-amber-400 transition-all duration-300 shadow-xl shadow-amber-500/30 hover:scale-[1.02]"
              >
                Create Free Account
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => onNav("/login")}
                className="inline-flex items-center gap-2.5 px-9 py-4 border border-slate-600 text-slate-300 font-semibold text-sm rounded-2xl hover:border-amber-500/40 hover:text-white transition-all duration-300 hover:scale-[1.02]"
              >
                Already have an account? Log in
              </button>
            </div>
            <p className="mt-6 text-xs text-slate-600 font-medium">
              Free for patients · No credit card required
            </p>
          </div>
        </div>
      </FadeUp>
    </div>
  </section>
);

// ─────────────────────────────────────────────
//  Footer
// ─────────────────────────────────────────────

const Footer = () => (
  <footer className="bg-slate-950 text-slate-400 py-16">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
        {/* Brand */}
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-900/30">
              <Activity className="w-4 h-4 text-white" strokeWidth={2.5} />
            </div>
            <span className="font-bold text-white text-lg tracking-tight">
              Token<span className="text-amber-400">Mitra</span>
            </span>
          </div>
          <p className="text-sm leading-relaxed text-slate-500 max-w-xs mb-5">
            The modern queue management and appointment automation platform for
            Indian healthcare.
          </p>
          <div className="flex items-center gap-3">
            {[Twitter, Linkedin, Github].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700/50 flex items-center justify-center hover:border-amber-500/40 hover:text-amber-400 transition-colors"
              >
                <Icon className="w-3.5 h-3.5" />
              </a>
            ))}
          </div>
        </div>

        {/* Links */}
        <div>
          <p className="text-xs font-bold text-slate-300 uppercase tracking-widest mb-4">
            Product
          </p>
          <ul className="space-y-2.5">
            {["Features", "How It Works", "Pricing", "Changelog"].map((l) => (
              <li key={l}>
                <a
                  href="#"
                  className="text-sm hover:text-amber-400 transition-colors"
                >
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-bold text-slate-300 uppercase tracking-widest mb-4">
            Company
          </p>
          <ul className="space-y-2.5">
            {["About", "Blog", "Privacy Policy", "Terms of Service"].map(
              (l) => (
                <li key={l}>
                  <a
                    href="#"
                    className="text-sm hover:text-amber-400 transition-colors"
                  >
                    {l}
                  </a>
                </li>
              ),
            )}
          </ul>
        </div>
      </div>

      <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-600">
        <p>© {new Date().getFullYear()} TokenMitra. All rights reserved.</p>
        <p className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-pulse" />
          All systems operational
        </p>
      </div>
    </div>
  </footer>
);

// ─────────────────────────────────────────────
//  Lenis smooth scroll initializer
// ─────────────────────────────────────────────

const useLenis = () => {
  useEffect(() => {
    let lenis;
    (async () => {
      try {
        const { default: Lenis } = await import("lenis");
        lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
        const raf = (time) => {
          lenis.raf(time);
          requestAnimationFrame(raf);
        };
        requestAnimationFrame(raf);
      } catch {
        // Lenis not installed — silently skip smooth scrolling
      }
    })();
    return () => lenis?.destroy();
  }, []);
};

// ─────────────────────────────────────────────
//  Main export
// ─────────────────────────────────────────────

/**
 * Usage (replace the real navigate / toast logic from your AuthContext):
 *
 *   import LandingPage from "@/pages/LandingPage";
 *
 * The component expects onNav to receive a path string (e.g. "/register").
 * If you drop it into your existing app you can swap `onNav` for the real
 * handleBtnClick from your AuthContext as shown below.
 */
const LandingPage = () => {
  useLenis();

  const navigate = useNavigate();

  const handleNav = (path) => {
    navigate(path);
  };

  return (
    <div className="w-full overflow-x-hidden font-sans antialiased">
      <Hero onNav={handleNav} />
      <StatsBar />
      <FeatureShowcase />
      <ProductDemo />
      <HowItWorks />
      <WorkflowShowcase />
      <Testimonials />
      <FAQ />
      <FinalCTA onNav={handleNav} />
      <Footer />
    </div>
  );
};
export default LandingPage;

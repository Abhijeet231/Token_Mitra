import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, LogOut, UserCircle, Activity } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { toast } from "react-toastify";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const { status, logout, user } = useAuth();
  const navigate = useNavigate();

  // ── Scroll detection ──────────────────────────────────────────────────────
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ── Role-based profile navigation ────────────────────────────────────────
  const handleProfileVisit = () => {
    if (status !== "authenticated") {
      toast.info("Please login to view your profile");
      navigate("/login");
      return;
    }
    if (user?.role === "patient") {
      navigate("/patient/profile");
    } else if (user?.role === "doctor") {
      navigate("/doctors/profile");
    } else {
      toast.error("Unable to determine user role");
    }
    setMobileOpen(false);
  };

  // ── Role-based home link ──────────────────────────────────────────────────
  const homeItem =
    user?.role === "patient"
      ? { label: "Home", path: "/patient" }
      : user?.role === "doctor"
      ? { label: "Dashboard", path: "/doctors/profile" }
      : { label: "Home", path: "/" };

  // ── Nav links (landing-page anchors + role home) ──────────────────────────
  // On the landing page these scroll; on inner pages they navigate normally.
  const anchorLinks = [
    { label: "Features", href: "#features" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "FAQ", href: "#faq" },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-white/85 backdrop-blur-xl border-b border-amber-100/70 shadow-sm shadow-amber-100/20"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

          {/* ── Logo ── */}
          <Link to={"/"} className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-200 group-hover:shadow-amber-300 transition-shadow">
              <Activity className="w-4 h-4 text-white" strokeWidth={2.5} />
            </div>
            <span className="font-bold text-slate-900 text-lg tracking-tight">
              Token<span className="text-amber-500">Mitra</span>
            </span>
          </Link>

          {/* ── Desktop centre links ── */}
          <div className="hidden md:flex items-center gap-1">
            {/* Role-based home/dashboard link */}
            <Link
              to={homeItem.path}
              className="px-4 py-2 text-sm text-slate-600 hover:text-amber-600 rounded-lg hover:bg-amber-50 transition-all duration-200 font-medium"
            >
              {homeItem.label}
            </Link>

            {/* Landing anchors — only shown when unauthenticated (on landing page) */}
            {status !== "authenticated" &&
              anchorLinks.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  className="px-4 py-2 text-sm text-slate-600 hover:text-amber-600 rounded-lg hover:bg-amber-50 transition-all duration-200 font-medium"
                >
                  {l.label}
                </a>
              ))}

        
          </div>

          {/* ── Desktop right CTAs ── */}
          <div className="hidden md:flex items-center gap-3">
            {status === "authenticated" ? (
              <>
                {/* Profile button */}
                <button
                  onClick={handleProfileVisit}
                  className="flex items-center gap-2 px-4 py-2.5 bg-amber-500 text-white text-sm font-semibold rounded-xl hover:bg-amber-600 transition-all duration-300 shadow-md shadow-amber-200 hover:shadow-amber-300 hover:scale-[1.02] active:scale-[0.98]"
                >
                  <UserCircle className="w-4 h-4" />
                  My Profile
                </button>

                {/* Logout */}
                <button
                  onClick={logout}
                  className="flex items-center gap-2 px-4 py-2.5 border border-red-200 bg-red-50 text-red-600 text-sm font-semibold rounded-xl hover:bg-red-100 hover:border-red-300 transition-all duration-200"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-semibold text-slate-700 hover:text-amber-600 transition-colors"
                >
                  Log in
                </Link>
                <Link
                  to="/register"
                  className="px-5 py-2.5 bg-slate-900 text-white text-sm font-semibold rounded-xl hover:bg-amber-600 transition-all duration-300 shadow-lg shadow-slate-900/20 hover:shadow-amber-500/30 hover:scale-[1.02] active:scale-[0.98]"
                >
                  Get Started Free
                </Link>
              </>
            )}
          </div>

          {/* ── Mobile hamburger ── */}
          <button
            aria-label="Toggle menu"
            className="md:hidden p-2 rounded-lg hover:bg-amber-50 transition-colors"
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? (
              <X className="w-5 h-5 text-slate-700" />
            ) : (
              <Menu className="w-5 h-5 text-slate-700" />
            )}
          </button>
        </div>
      </motion.nav>

      {/* ── Mobile drawer ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-16 inset-x-0 z-40 bg-white/96 backdrop-blur-xl border-b border-amber-100/60 px-6 py-6 flex flex-col gap-1 shadow-xl md:hidden"
          >
            {/* Role home */}
            <Link
              to={homeItem.path}
              onClick={() => setMobileOpen(false)}
              className="px-3 py-2.5 text-sm font-medium text-slate-700 hover:text-amber-600 hover:bg-amber-50 rounded-xl transition-colors"
            >
              {homeItem.label}
            </Link>

            {/* Landing anchors — only for unauthenticated */}
            {status !== "authenticated" &&
              anchorLinks.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-3 py-2.5 text-sm font-medium text-slate-700 hover:text-amber-600 hover:bg-amber-50 rounded-xl transition-colors"
                >
                  {l.label}
                </a>
              ))}


            {/* Auth section */}
            <div className="pt-4 mt-3 border-t border-slate-100 flex flex-col gap-2.5">
              {status === "authenticated" ? (
                <>
                  <button
                    onClick={handleProfileVisit}
                    className="flex items-center justify-center gap-2 w-full py-3 bg-amber-500 text-white text-sm font-bold rounded-xl hover:bg-amber-600 transition-colors shadow-md shadow-amber-200"
                  >
                    <UserCircle className="w-4 h-4" />
                    My Profile
                  </button>
                  <button
                    onClick={() => { logout(); setMobileOpen(false); }}
                    className="flex items-center justify-center gap-2 w-full py-3 bg-red-50 border border-red-200 text-red-600 text-sm font-semibold rounded-xl hover:bg-red-100 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-center w-full py-3 border border-slate-200 text-slate-700 text-sm font-semibold rounded-xl hover:border-amber-400 hover:text-amber-600 transition-colors"
                  >
                    Log in
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-center w-full py-3 bg-slate-900 text-white text-sm font-bold rounded-xl hover:bg-amber-600 transition-colors shadow-lg"
                  >
                    Get Started Free
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
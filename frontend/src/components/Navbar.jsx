import React, { useState, useEffect } from "react";
import { Menu, X, User, LogOut, UserCircle, Stethoscope } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { UserCircleIcon } from "lucide-react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { status, logout, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

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
  };

  // ✅ Single source of truth for navItem — used in BOTH desktop & mobile
  let navItem = null;
  if (user?.role === "patient") {
    navItem = { label: "Home", path: "/patient" };
  } else if (user?.role === "doctor") {
    navItem = { label: "Dashboard", path: "/doctors/profile" };
  } else {
    navItem = { label: "Home", path: "/" };
  }

  const isActive = (path) => location.pathname === path;

  const linkClass = (path) =>
    `relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 
    ${isActive(path)
      ? "text-amber-600 bg-amber-50"
      : "text-stone-500 hover:text-amber-600 hover:bg-amber-50/70"
    }`;

  const mobileLinkClass = (path) =>
    `flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200
    ${isActive(path)
      ? "text-amber-600 bg-amber-50 border border-amber-100"
      : "text-stone-600 hover:text-amber-600 hover:bg-amber-50/60"
    }`;

  return (
    <>
      <nav
        className={`w-full sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-[0_1px_20px_rgba(0,0,0,0.08)] border-b border-amber-100/60"
            : "bg-white border-b border-gray-100"
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <div className="flex justify-between items-center h-16">

            {/* ── Brand ── */}
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 bg-linear-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center shadow-sm group-hover:shadow-amber-200 group-hover:scale-105 transition-all duration-200">
                <Stethoscope className="w-4.5 h-4.5 text-white " />
              </div>
              <span className="text-lg font-bold tracking-tight text-stone-800">
                Token<span className="text-amber-500">Mitra</span>
              </span>
            </Link>

            {/* ── Desktop Nav Links ── */}
            <div className="hidden md:flex items-center gap-1">
              {navItem && (
                <Link to={navItem.path} className={linkClass(navItem.path)}>
                  {navItem.label}
                </Link>
              )}
              <Link to="/about" className={linkClass("/about")}>About</Link>
              <Link to="/contact" className={linkClass("/contact")}>Contact</Link>
            </div>

            {/* ── Desktop Auth ── */}
            <div className="hidden md:flex items-center gap-3">
              {status === "authenticated" ? (
                <>
                  <button
                    onClick={handleProfileVisit}
                    className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-amber-600 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-xl transition-all duration-200"
                  >
                    <UserCircleIcon className="w-4 h-4" />
                    My Profile
                  </button>
                  <button
                    onClick={logout}
                    className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-red-500 bg-red-50 hover:bg-red-100 border border-red-100 rounded-xl transition-all duration-200"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-stone-600 hover:text-amber-600 hover:bg-amber-50 rounded-xl transition-all duration-200"
                  >
                    <User className="w-4 h-4" />
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="px-5 py-2 text-sm font-semibold text-white  from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 rounded-xl shadow-sm hover:shadow-amber-200 hover:shadow-md transition-all duration-200"
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>

            {/* ── Mobile Hamburger ── */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden w-9 h-9 flex items-center justify-center rounded-xl text-stone-500 hover:text-amber-600 hover:bg-amber-50 transition-all duration-200"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* ── Mobile Menu ── */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMenuOpen ? "max-h-125 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="bg-white border-t border-gray-100 px-5 py-4 space-y-1">

            {/* ✅ FIXED: uses navItem.path instead of hardcoded "/" */}
            {navItem && (
              <Link
                to={navItem.path}
                className={mobileLinkClass(navItem.path)}
                onClick={() => setIsMenuOpen(false)}
              >
                {navItem.label}
              </Link>
            )}
            <Link
              to="/about"
              className={mobileLinkClass("/about")}
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              to="/contact"
              className={mobileLinkClass("/contact")}
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>

            {/* Divider */}
            <div className="pt-2 mt-2 border-t border-gray-100 space-y-2">
              {status === "authenticated" ? (
                <>
                  <button
                    onClick={() => { handleProfileVisit(); setIsMenuOpen(false); }}
                    className="flex items-center justify-center gap-2 w-full px-4 py-3 text-sm font-semibold text-white  from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 rounded-xl shadow-sm transition-all duration-200"
                  >
                    <UserCircleIcon className="w-4 h-4" />
                    My Profile
                  </button>
                  <button
                    onClick={() => { logout(); setIsMenuOpen(false); }}
                    className="flex items-center justify-center gap-2 w-full px-4 py-3 text-sm font-medium text-red-500 bg-red-50 hover:bg-red-100 border border-red-100 rounded-xl transition-all duration-200"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="flex items-center justify-center gap-2 w-full px-4 py-3 text-sm font-medium text-stone-600 hover:text-amber-600 hover:bg-amber-50 rounded-xl border border-gray-100 transition-all duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <User className="w-4 h-4" />
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="flex items-center justify-center w-full px-4 py-3 text-sm font-semibold text-white  from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 rounded-xl shadow-sm transition-all duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
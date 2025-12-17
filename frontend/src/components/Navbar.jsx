import React, { useState } from "react";
import { Menu, X, User, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { UserCircleIcon } from "lucide-react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { status, logout, user } = useAuth();
  const navigate = useNavigate();

  const handleProfileVisit = () => {
    if (status !== "authenticated") {
      toast.info("Please login to view your profile");
      navigate("/login");
      return;
    }

    if (user?.role === "patient") {
      navigate("/patient/profile");
    } else if (user?.role == "doctor") {
      navigate("/doctors/profile");
    } else {
      toast.error("Unable to determine user role");
    }
  };

  return (
    <nav className="bg-white w-full border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          {/* Brand - Left */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">TM</span>
            </div>
            <span className="text-xl font-semibold text-slate-800">
              <span className="text-emerald-600">Token</span>Mitra
            </span>
          </Link>

          {/* Navigation Links - Center (Desktop) */}
          <div className="hidden md:flex items-center space-x-1">
            <Link
              to="/"
              className="px-4 py-2 text-slate-600 hover:text-emerald-600 hover:bg-emerald-50 font-medium text-sm rounded-lg transition"
            >
              Home
            </Link>
            <Link
              to="/about"
              className="px-4 py-2 text-slate-600 hover:text-emerald-600 hover:bg-emerald-50 font-medium text-sm rounded-lg transition"
            >
              About
            </Link>
            <Link
              to="/contact"
              className="px-4 py-2 text-slate-600 hover:text-emerald-600 hover:bg-emerald-50 font-medium text-sm rounded-lg transition"
            >
              Contact
            </Link>
          </div>

          {/* Auth Buttons - Right (Desktop) */}
          {status === "authenticated" ? (
            <div className="hidden md:flex items-center space-x-4">
              <button
                onClick={logout}
                className="flex items-center space-x-2 px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 font-medium text-sm rounded-lg transition border border-red-200"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>

              <button
                onClick={handleProfileVisit}
                className="flex items-center gap-1 px-4 py-2 rounded-lg
             bg-emerald-600 text-white font-semibold
             hover:bg-emerald-700 transition
             shadow-sm hover:shadow-md"
              >
                <UserCircleIcon className="w-5 h-5" />
                My Profile
              </button>
            </div>
          ) : (
            <div className="hidden md:flex items-center space-x-4">
              <Link
                to="/login"
                className="flex items-center space-x-1 px-4 py-2 text-slate-600 hover:text-emerald-600 hover:bg-emerald-50 font-medium text-sm rounded-lg transition"
              >
                <User className="w-4 h-4" />
                <span>Login</span>
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 bg-emerald-600 text-white font-medium text-sm rounded-lg hover:bg-emerald-700 transition shadow-sm"
              >
                Get Started
              </Link>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-slate-600 hover:text-emerald-600"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-6 py-4 space-y-2">
            <Link
              to="/"
              className="block px-4 py-3 text-slate-700 hover:text-emerald-600 hover:bg-emerald-50 font-medium text-sm rounded-lg transition"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/about"
              className="block px-4 py-3 text-slate-700 hover:text-emerald-600 hover:bg-emerald-50 font-medium text-sm rounded-lg transition"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              to="/contact"
              className="block px-4 py-3 text-slate-700 hover:text-emerald-600 hover:bg-emerald-50 font-medium text-sm rounded-lg transition"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>

            {status === "authenticated" ? (
              <div>
                <button
                  className="flex items-center justify-center space-x-2 w-full px-4 py-3 bg-red-50 text-red-600 hover:bg-red-100 font-medium text-sm rounded-lg transition border border-red-200 mt-3"
                  onClick={logout}
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>

                <button
                  onClick={handleProfileVisit}
                  className="flex items-center justify-center space-x-2 w-full  px-4 py-2 mt-4 rounded-lg
             bg-emerald-600 text-white font-semibold
             hover:bg-emerald-700 transition
             shadow-sm hover:shadow-md"
                >
                  <UserCircleIcon className="w-5 h-5" />
                  My Profile
                </button>
              </div>
            ) : (
              <div className="pt-3 space-y-2 border-t border-gray-200">
                <Link
                  to="/login"
                  className="flex items-center justify-center space-x-1 w-full px-4 py-3 text-slate-700 hover:text-emerald-600 hover:bg-emerald-50 font-medium text-sm rounded-lg transition"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <User className="w-4 h-4" />
                  <span>Login</span>
                </Link>
                <Link
                  to="/register"
                  className="block w-full px-4 py-3 bg-emerald-600 text-white text-center font-medium text-sm rounded-lg hover:bg-emerald-700 transition shadow-sm"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

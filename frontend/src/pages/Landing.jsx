import { Link } from "react-router-dom";
import Footer from "@/components/Footer.jsx";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext.jsx";
import { useEffect } from "react";

const LandingPage = () => {
  const {status} = useAuth();
  const navigate = useNavigate()

  const handleBtnClick = (path) => {
    if(status === "authenticated"){
      toast.info("You are already logged In !!")
      return;
    }

    navigate(path)
  }
  
  
  return (

    <div className="w-full bg-linear-to-br from-amber-50 via-white to-orange-50">

      {/* ================= HERO SECTION ================= */}
      <section>
        <div className="max-w-7xl mx-auto px-6 py-28 text-center">
          <div className="inline-block px-4 py-1.5 bg-yellow-100 text-amber-700 rounded-full text-sm font-medium mb-6">
            ✨ Trusted by 1000+ patients
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 leading-tight">
            Book Doctor Appointments <br />
            <span className="text-amber-600">Without Long Waiting</span>
          </h1>

          <p className="mt-8 text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            TokenMitra helps patients book appointments seamlessly and
            helps doctors manage schedules efficiently - all in one place.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={() => handleBtnClick("/register")}
              className="bg-amber-600 text-white px-10 py-4 rounded-lg text-base font-semibold hover:bg-amber-700 transition cursor-pointer "
            >
              Get Started Free
            </button>

            <button
              onClick={() => handleBtnClick("/login")}
              className="border-2 border-slate-300 px-10 py-4 rounded-lg text-base font-semibold text-slate-700 hover:border-amber-600 hover:text-amber-600 transition cursor-pointer"
            >
              Login
            </button>
          </div>

          <p className="mt-6 text-sm text-slate-500">
            No credit card required • Free for patients
          </p>
        </div>
      </section>

      {/* ================= TRUST / STATS ================= */}
      <section className="bg-amber-50/20 mt-5 rounded-lg shadow-xl ">
        <div className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <div>
            <h3 className="text-4xl font-bold text-amber-600">100+</h3>
            <p className="mt-3 text-slate-600 font-medium">Verified Doctors</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold text-amber-600">1,000+</h3>
            <p className="mt-3 text-slate-600 font-medium">Happy Patients</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold text-amber-600">Instant</h3>
            <p className="mt-3 text-slate-600 font-medium">Token Booking</p>
          </div>
        </div>
      </section>
      

      {/* ================= FEATURES ================= */}
      <section className="bg-amber-50">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold text-slate-900">
              Why Choose TokenMitra?
            </h2>
            <p className="mt-6 text-lg text-slate-600">
              Built for modern healthcare with features that matter.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white border border-slate-200 rounded-xl p-8 hover:scale-105 hover:shadow-xl transition-all duration-400">
              <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🔒</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900">Secure & Private</h3>
              <p className="mt-3 text-slate-600 text-sm leading-relaxed">
                Your health data is encrypted and protected with bank-level security.
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-8 hover:scale-105 hover:shadow-xl transition-all duration-400">
              <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900">Instant Booking</h3>
              <p className="mt-3 text-slate-600 text-sm leading-relaxed">
                Book appointments in seconds with real-time availability updates.
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-8 hover:scale-105 hover:shadow-xl transition-all duration-400">
              <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">📱</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900">Mobile Friendly</h3>
              <p className="mt-3 text-slate-600 text-sm leading-relaxed">
                Access your appointments anytime, anywhere on any device.
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-8 hover:scale-105 hover:shadow-xl transition-all duration-400">
              <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🔔</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900">Smart Reminders</h3>
              <p className="mt-3 text-slate-600 text-sm leading-relaxed">
                Get automated reminders so you never miss an appointment.
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-8 hover:scale-105 hover:shadow-xl transition-all duration-400">
              <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">✅</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900">Verified Doctors</h3>
              <p className="mt-3 text-slate-600 text-sm leading-relaxed">
                All doctors are verified professionals with proven credentials.
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-8 hover:scale-105 hover:shadow-xl transition-all duration-400">
              <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">💬</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900">24/7 Support</h3>
              <p className="mt-3 text-slate-600 text-sm leading-relaxed">
                Our support team is always ready to help you with any queries.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="bg-linear-to-br from-amber-400 to-orange-600">
        <div className="max-w-7xl mx-auto px-6 py-24 text-center">
          <h2 className="text-4xl font-bold text-white">
            Ready to Transform Your Healthcare Experience?
          </h2>

          <p className="mt-6 text-lg text-amber-50 max-w-2xl mx-auto leading-relaxed">
            Join thousands of patients who trust TokenMitra for hassle-free
            appointment booking and quality healthcare access.
          </p>

          <button
            onClick={() => handleBtnClick('/register')}
            className="inline-block mt-10 bg-white text-amber-600 px-10 py-4 rounded-lg text-base font-bold hover:bg-slate-50 transition cursor-pointer"
          >
            Create Your Free Account
          </button>

          <p className="mt-4 text-sm text-amber-100">
            Get started in less than 2 minutes
          </p>
        </div>
      </section>

    <Footer/>

    </div>
  );
};

export default LandingPage;
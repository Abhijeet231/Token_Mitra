import { Link } from "react-router-dom";
import Footer from "@/components/Footer";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

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

    <div className="w-full">

      {/* ================= HERO SECTION ================= */}
      <section className="bg-linear-to-b from-emerald-50 to-white">
        <div className="max-w-7xl mx-auto px-6 py-28 text-center">
          <div className="inline-block px-4 py-1.5 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium mb-6">
            ✨ Trusted by 1000+ patients
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 leading-tight">
            Book Doctor Appointments <br />
            <span className="text-emerald-600">Without Long Waiting</span>
          </h1>

          <p className="mt-8 text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            TokenMitra helps patients book appointments seamlessly and
            helps doctors manage schedules efficiently — all in one place.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={() => handleBtnClick("/register")}
              className="bg-emerald-600 text-white px-10 py-4 rounded-lg text-base font-semibold hover:bg-emerald-700 transition cursor-pointer "
            >
              Get Started Free
            </button>

            <button
              onClick={() => handleBtnClick("/login")}
              className="border-2 border-slate-300 px-10 py-4 rounded-lg text-base font-semibold text-slate-700 hover:border-emerald-600 hover:text-emerald-600 transition cursor-pointer"
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
      <section className="bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <div>
            <h3 className="text-4xl font-bold text-emerald-600">100+</h3>
            <p className="mt-3 text-slate-600 font-medium">Verified Doctors</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold text-emerald-600">1,000+</h3>
            <p className="mt-3 text-slate-600 font-medium">Happy Patients</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold text-emerald-600">Instant</h3>
            <p className="mt-3 text-slate-600 font-medium">Token Booking</p>
          </div>
        </div>
      </section>

      {/* ================= DOCTOR SHOWCASE ================= */}
      <section className="bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-slate-900">
              Consult Trusted Doctors
            </h2>

            <p className="mt-6 text-lg text-slate-600 leading-relaxed">
              Browse doctors by specialization and experience, and book
              appointments instantly with verified healthcare professionals.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: "Dr. Priya Sharma", specialization: "Cardiologist", experience: "12+ years" },
              { name: "Dr. Rajesh Kumar", specialization: "Orthopedic", experience: "10+ years" },
              { name: "Dr. Anjali Mehta", specialization: "Pediatrician", experience: "8+ years" }
            ].map((doctor, id) => (
              <div
                key={id}
                className="bg-white border border-slate-200 rounded-xl p-8 hover:border-emerald-300 hover:shadow-lg transition"
              >
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold text-emerald-600">
                    {doctor.name.split(' ')[1][0]}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-slate-900">
                  {doctor.name}
                </h3>
                <p className="text-emerald-600 font-medium mt-2">{doctor.specialization}</p>
                <p className="text-sm text-slate-500 mt-1">
                  {doctor.experience} experience
                </p>

                <Link
                  to={`/doctors/${id + 1}`}
                  className="inline-flex items-center mt-6 text-emerald-600 text-sm font-semibold hover:text-emerald-700"
                >
                  View Profile
                  <span className="ml-1">→</span>
                </Link>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/doctors"
              className="inline-block border-2 border-emerald-600 text-emerald-600 px-8 py-3 rounded-lg font-semibold hover:bg-emerald-600 hover:text-white transition"
            >
              Browse All Doctors
            </Link>
          </div>
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-slate-900">
              How TokenMitra Works
            </h2>
            <p className="mt-6 text-lg text-slate-600">
              Simple, fast, and efficient — book your appointment in three easy steps.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-emerald-600">1</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                Search Doctors
              </h3>
              <p className="mt-4 text-slate-600 leading-relaxed">
                Find doctors based on specialization, location, and availability.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-emerald-600">2</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                Book Appointment
              </h3>
              <p className="mt-4 text-slate-600 leading-relaxed">
                Choose a suitable time slot and book your token instantly online.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-emerald-600">3</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                Visit On Time
              </h3>
              <p className="mt-4 text-slate-600 leading-relaxed">
                No long queues — visit as per your scheduled token number.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="bg-slate-50">
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
            <div className="bg-white border border-slate-200 rounded-xl p-8">
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🔒</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900">Secure & Private</h3>
              <p className="mt-3 text-slate-600 text-sm leading-relaxed">
                Your health data is encrypted and protected with bank-level security.
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-8">
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900">Instant Booking</h3>
              <p className="mt-3 text-slate-600 text-sm leading-relaxed">
                Book appointments in seconds with real-time availability updates.
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-8">
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">📱</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900">Mobile Friendly</h3>
              <p className="mt-3 text-slate-600 text-sm leading-relaxed">
                Access your appointments anytime, anywhere on any device.
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-8">
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🔔</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900">Smart Reminders</h3>
              <p className="mt-3 text-slate-600 text-sm leading-relaxed">
                Get automated reminders so you never miss an appointment.
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-8">
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">✅</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900">Verified Doctors</h3>
              <p className="mt-3 text-slate-600 text-sm leading-relaxed">
                All doctors are verified professionals with proven credentials.
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-8">
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
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
      <section className="bg-linear-to-br from-emerald-600 to-emerald-700">
        <div className="max-w-7xl mx-auto px-6 py-24 text-center">
          <h2 className="text-4xl font-bold text-white">
            Ready to Transform Your Healthcare Experience?
          </h2>

          <p className="mt-6 text-lg text-emerald-50 max-w-2xl mx-auto leading-relaxed">
            Join thousands of patients who trust TokenMitra for hassle-free
            appointment booking and quality healthcare access.
          </p>

          <button
            onClick={() => handleBtnClick('/register')}
            className="inline-block mt-10 bg-white text-emerald-600 px-10 py-4 rounded-lg text-base font-bold hover:bg-slate-50 transition cursor-pointer"
          >
            Create Your Free Account
          </button>

          <p className="mt-4 text-sm text-emerald-100">
            Get started in less than 2 minutes
          </p>
        </div>
      </section>

    <Footer/>

    </div>
  );
};

export default LandingPage;
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="w-full">

      {/* ================= HERO SECTION ================= */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-6 py-24 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
            Book Doctor Appointments <br />
            <span className="text-blue-600">Without Long Waiting</span>
          </h1>

          <p className="mt-6 text-lg text-slate-600 max-w-2xl mx-auto">
            TokenMitra helps patients book appointments seamlessly and
            helps doctors manage schedules efficiently — all in one place.
          </p>

          <div className="mt-10 flex justify-center gap-4">
            <Link
              to="/register"
              className="bg-blue-600 text-white px-8 py-3 rounded-md text-sm font-medium hover:bg-blue-700 transition"
            >
              Get Started
            </Link>

            <Link
              to="/login"
              className="border border-slate-300 px-8 py-3 rounded-md text-sm font-medium text-slate-700 hover:bg-slate-100 transition"
            >
              Login
            </Link>
          </div>
        </div>
      </section>

      {/* ================= TRUST / STATS ================= */}
      <section className="bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <h3 className="text-3xl font-bold text-slate-900">100+</h3>
            <p className="mt-2 text-slate-600">Verified Doctors</p>
          </div>
          <div>
            <h3 className="text-3xl font-bold text-slate-900">1k+</h3>
            <p className="mt-2 text-slate-600">Appointments Booked</p>
          </div>
          <div>
            <h3 className="text-3xl font-bold text-slate-900">Fast</h3>
            <p className="mt-2 text-slate-600">Token-Based Scheduling</p>
          </div>
        </div>
      </section>

      {/* ================= DOCTOR SHOWCASE ================= */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <h2 className="text-2xl font-semibold text-slate-900 text-center">
            Consult Trusted Doctors
          </h2>

          <p className="mt-4 text-slate-600 text-center max-w-xl mx-auto">
            Browse doctors by specialization and experience, and book
            appointments instantly.
          </p>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((id) => (
              <div
                key={id}
                className="bg-white border border-slate-200 rounded-lg p-6 hover:shadow-md transition"
              >
                <h3 className="text-lg font-semibold text-slate-900">
                  Dr. John Doe
                </h3>
                <p className="text-slate-500 mt-1">Cardiologist</p>
                <p className="text-sm text-slate-400 mt-2">
                  10+ years experience
                </p>

                <Link
                  to={`/doctors/${id}`}
                  className="inline-block mt-4 text-blue-600 text-sm font-medium hover:underline"
                >
                  View Profile →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section className="bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <h2 className="text-2xl font-semibold text-slate-900 text-center">
            How TokenMitra Works
          </h2>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="bg-white p-6 rounded-lg border border-slate-200">
              <h3 className="font-semibold text-slate-900">
                Search Doctors
              </h3>
              <p className="mt-2 text-slate-600 text-sm">
                Find doctors based on specialization and availability.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-slate-200">
              <h3 className="font-semibold text-slate-900">
                Book Appointment
              </h3>
              <p className="mt-2 text-slate-600 text-sm">
                Choose a suitable slot and book your token instantly.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-slate-200">
              <h3 className="font-semibold text-slate-900">
                Visit On Time
              </h3>
              <p className="mt-2 text-slate-600 text-sm">
                No long queues — visit as per your scheduled token.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-6 py-24 text-center">
          <h2 className="text-3xl font-bold text-slate-900">
            Start Using TokenMitra Today
          </h2>

          <p className="mt-4 text-slate-600 max-w-xl mx-auto">
            Whether you are a patient or a doctor, TokenMitra simplifies
            appointment management for everyone.
          </p>

          <Link
            to="/register"
            className="inline-block mt-8 bg-blue-600 text-white px-10 py-3 rounded-md text-sm font-medium hover:bg-blue-700 transition"
          >
            Create an Account
          </Link>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="border-t border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-6 py-6 text-center text-sm text-slate-500">
          © {new Date().getFullYear()} TokenMitra. All rights reserved.
        </div>
      </footer>

    </div>
  );
};

export default LandingPage;

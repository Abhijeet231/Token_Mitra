import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { createPatientProfile } from "@/services/patient.service";
import { motion } from "framer-motion";
import { Activity, User, ArrowRight, UserCheck } from "lucide-react";

const FadeUp = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 18 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
);

const genders = [
  { value: "male",   label: "Male",   icon: "👨" },
  { value: "female", label: "Female", icon: "👩" },
  { value: "other",  label: "Other",  icon: "🧑" },
];

const PatientProfileComplete = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const selectedGender = watch("gender");

  const handleGenderSelect = (value) => {
    setValue("gender", value, { shouldValidate: true });
  };

  const onSubmit = async (data) => {
    try {
      await createPatientProfile(data);
      toast.success("Profile created! Let's get started 🎉");
      navigate("/patient/profile", { replace: true });
    } catch (error) {
      toast.error("Error creating profile. Please try again.");
      console.error("Patient profile creation error:", error);
    }
  };

  return (
    // pt-16 offsets the fixed navbar
    <div className="min-h-screen pt-16 bg-gradient-to-b from-amber-50/60 via-white to-white flex items-center justify-center px-4 py-12 relative overflow-hidden">

      {/* ambient glows */}
      <div className="pointer-events-none absolute -top-20 -left-40 w-[500px] h-[500px] rounded-full bg-amber-300/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 -right-20 w-[400px] h-[400px] rounded-full bg-orange-300/10 blur-3xl" />

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
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 shadow-lg shadow-amber-200 mb-5">
              <Activity className="w-6 h-6 text-white" strokeWidth={2.5} />
            </div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">
              Complete your profile
            </h1>
            <p className="mt-2 text-sm text-slate-500 font-medium">
              Just two quick details before you start booking
            </p>
          </div>
        </FadeUp>

        {/* ── Progress indicator ── */}
        <FadeUp delay={0.06}>
          <div className="flex items-center gap-2 mb-6 px-1">
            {["Account", "Profile", "Done"].map((step, i) => (
              <React.Fragment key={step}>
                <div className="flex items-center gap-1.5">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black transition-all ${
                      i === 1
                        ? "bg-amber-500 text-white shadow-md shadow-amber-200"
                        : i === 0
                        ? "bg-emerald-100 text-emerald-600 border border-emerald-200"
                        : "bg-slate-100 text-slate-400 border border-slate-200"
                    }`}
                  >
                    {i === 0 ? "✓" : i + 1}
                  </div>
                  <span
                    className={`text-xs font-semibold ${
                      i === 1 ? "text-amber-600" : i === 0 ? "text-slate-500" : "text-slate-300"
                    }`}
                  >
                    {step}
                  </span>
                </div>
                {i < 2 && (
                  <div className={`flex-1 h-px ${i === 0 ? "bg-emerald-200" : "bg-slate-200"}`} />
                )}
              </React.Fragment>
            ))}
          </div>
        </FadeUp>

        {/* ── Card ── */}
        <FadeUp delay={0.1}>
          <div className="bg-white border border-slate-200/80 rounded-3xl shadow-xl shadow-slate-100/60 p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>

              {/* Age */}
              <div className="space-y-1.5">
                <label htmlFor="age" className="flex items-center gap-2 text-xs font-bold text-slate-700 uppercase tracking-wide">
                  <User className="w-3.5 h-3.5 text-amber-500" />
                  Age
                </label>
                <input
                  type="number"
                  id="age"
                  placeholder="Enter your age"
                  className={`w-full px-4 py-3 rounded-xl border text-sm font-medium text-slate-900 placeholder:text-slate-400 bg-slate-50 focus:bg-white focus:ring-2 outline-none transition-all duration-200 ${
                    errors.age
                      ? "border-red-300 focus:ring-red-200"
                      : "border-slate-200 focus:border-amber-400 focus:ring-amber-100"
                  }`}
                  {...register("age", {
                    required: "Age is required",
                    min: { value: 1, message: "Age must be greater than 0" },
                  })}
                />
                {errors.age && (
                  <p className="text-red-500 text-xs font-medium mt-1 flex items-center gap-1">
                    <span className="w-1 h-1 rounded-full bg-red-400 inline-block" />
                    {errors.age.message}
                  </p>
                )}
              </div>

              {/* Gender — card selector */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-xs font-bold text-slate-700 uppercase tracking-wide">
                  <UserCheck className="w-3.5 h-3.5 text-amber-500" />
                  Gender
                </label>

                {/* hidden input for RHF validation */}
                <input
                  type="hidden"
                  {...register("gender", { required: "Please select a gender" })}
                />

                <div className="grid grid-cols-3 gap-3">
                  {genders.map((g) => (
                    <button
                      key={g.value}
                      type="button"
                      onClick={() => handleGenderSelect(g.value)}
                      className={`flex flex-col items-center gap-2 py-4 rounded-xl border-2 text-center transition-all duration-200 ${
                        selectedGender === g.value
                          ? "border-amber-400 bg-amber-50 shadow-md shadow-amber-100"
                          : "border-slate-200 bg-slate-50 hover:border-amber-200 hover:bg-amber-50/40"
                      }`}
                    >
                      <span className="text-2xl">{g.icon}</span>
                      <span
                        className={`text-xs font-bold ${
                          selectedGender === g.value ? "text-amber-700" : "text-slate-700"
                        }`}
                      >
                        {g.label}
                      </span>
                    </button>
                  ))}
                </div>

                {errors.gender && (
                  <p className="text-red-500 text-xs font-medium mt-1 flex items-center gap-1">
                    <span className="w-1 h-1 rounded-full bg-red-400 inline-block" />
                    {errors.gender.message}
                  </p>
                )}
              </div>

              {/* Submit */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                className="w-full flex items-center justify-center gap-2.5 py-3.5 bg-slate-900 text-white text-sm font-bold rounded-xl hover:bg-amber-500 transition-all duration-300 shadow-lg shadow-slate-900/20 hover:shadow-amber-400/30 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                    </svg>
                    Saving…
                  </>
                ) : (
                  <>
                    Save & Continue
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </motion.button>
            </form>
          </div>
        </FadeUp>

        {/* trust note */}
        <FadeUp delay={0.2}>
          <p className="text-center text-xs text-slate-400 font-medium mt-5">
            Your data is private and encrypted · Only used to match you with doctors
          </p>
        </FadeUp>

      </div>
    </div>
  );
};

export default PatientProfileComplete;
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { updateDoctorProfile, getLoggedInDoctor } from "@/services/doctor.service";
import { editDoctorProfileSchema } from "@/validations/editDoctor.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { ArrowRight, UserCog } from "lucide-react";
import DoctorProfileFormFields from "@/components/doctor/DoctorProfileFormFields";

/* ── Animation helper ───────────────────────────────────────────── */
const FadeUp = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 18 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
);

/* ── Page ───────────────────────────────────────────────────────── */
const EditDoctorProfile = () => {
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({ resolver: zodResolver(editDoctorProfileSchema) });

  /* ── Fetch existing profile ── */
  useEffect(() => {
    const getDoctor = async () => {
      try {
        const res = await getLoggedInDoctor();
        setDoctor(res.data.data);
        console.log("Logged in doctor editing profile:", res.data.data);
      } catch (error) {
        toast.error("Error while fetching doctor data!");
        console.log("Error fetching doctor data:", error);
      } finally {
        setLoading(false);
      }
    };
    getDoctor();
  }, []);

  /* ── Pre-fill form once doctor loads ── */
  useEffect(() => {
    if (doctor) {
      reset({
        specialization: doctor.specialization || "",
        qualification: doctor.qualification || "",
        experience: doctor.experience || "",
        clinicAddress: doctor.clinicAddress || "",
        slotDuration: doctor.slotDuration || "",
      });
    }
  }, [doctor, reset]);

  /* ── Submit ── */
  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("specialization", data.specialization);
      formData.append("qualification", data.qualification);
      formData.append("experience", data.experience);
      formData.append("clinicAddress", data.clinicAddress);
      formData.append("slotDuration", data.slotDuration);

      if (data.profileImage && data.profileImage.length > 0) {
        formData.append("profileImage", data.profileImage[0]);
      }

      await updateDoctorProfile(formData);
      toast.success("Profile Updated Successfully!");
      navigate("/doctors/profile");
    } catch (error) {
      toast.error("Error while updating profile");
      console.log("Doc Profile Update Error:", error);
    }
  };

  /* ── Loading skeleton ── */
  if (loading) {
    return (
      <div className="min-h-screen pt-16 bg-gradient-to-b from-amber-50/60 via-white to-white flex items-center justify-center px-4">
        <div className="w-full max-w-2xl bg-white border border-slate-200/80 rounded-3xl shadow-xl shadow-slate-100/60 p-8 sm:p-10">
          {/* Header skeleton */}
          <div className="flex flex-col items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 animate-pulse" />
            <div className="h-7 w-48 rounded-xl bg-slate-100 animate-pulse" />
            <div className="h-4 w-64 rounded-lg bg-slate-100 animate-pulse" />
          </div>
          {/* Fields skeleton */}
          <div className="grid grid-cols-2 gap-5">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex flex-col gap-2">
                <div className="h-3 w-24 rounded bg-slate-100 animate-pulse" />
                <div className="h-11 rounded-xl bg-slate-100 animate-pulse" />
              </div>
            ))}
          </div>
          <div className="mt-5 flex flex-col gap-2">
            <div className="h-3 w-28 rounded bg-slate-100 animate-pulse" />
            <div className="h-11 rounded-xl bg-slate-100 animate-pulse" />
          </div>
          <div className="mt-5 h-20 rounded-xl bg-slate-100 animate-pulse" />
          <div className="mt-6 h-12 rounded-xl bg-slate-100 animate-pulse" />
        </div>
      </div>
    );
  }

  /* ── Main render ── */
  return (
    <div
      className="min-h-screen pt-16 bg-gradient-to-b from-amber-50/60 via-white to-white 
                 flex items-center justify-center px-4 py-12 relative overflow-hidden"
    >
      {/* ── Ambient glows ── */}
      <div className="pointer-events-none absolute -top-20 -left-40 w-[500px] h-[500px] rounded-full bg-amber-300/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 -right-20 w-[400px] h-[400px] rounded-full bg-orange-300/10 blur-3xl" />

      {/* ── Subtle grid ── */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(#94a3b8 1px,transparent 1px),linear-gradient(90deg,#94a3b8 1px,transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* ── Card ── */}
      <div className="relative w-full max-w-2xl">
        <FadeUp delay={0}>
          <div className="bg-white border border-slate-200/80 rounded-3xl shadow-xl shadow-slate-100/60 p-8 sm:p-10">

            {/* ── Page header ── */}
            <div className="text-center mb-8">
              {/* Current profile image OR icon badge */}
              {doctor?.profileImage?.url ? (
                <div className="inline-block mb-5 relative">
                  <img
                    src={doctor.profileImage.url}
                    alt="Profile"
                    className="w-16 h-16 rounded-2xl object-cover ring-4 ring-amber-100 shadow-lg shadow-amber-100"
                  />
                  {/* Edit badge */}
                  <div className="absolute -bottom-2 -right-2 w-6 h-6 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-md">
                    <UserCog className="w-3 h-3 text-white" strokeWidth={2.5} />
                  </div>
                </div>
              ) : (
                <div
                  className="inline-flex items-center justify-center w-12 h-12 rounded-2xl 
                              bg-gradient-to-br from-amber-400 to-orange-500 
                              shadow-lg shadow-amber-200 mb-5"
                >
                  <UserCog className="w-6 h-6 text-white" strokeWidth={2.5} />
                </div>
              )}

              <h1 className="text-3xl font-black text-slate-900 tracking-tight">
                Edit Your Profile
              </h1>
              <p className="mt-2 text-sm text-slate-500 font-medium">
                Update your practice details — changes reflect immediately.
              </p>
            </div>

            {/* ── Divider ── */}
            <div className="flex items-center gap-3 mb-7">
              <div className="flex-1 h-px bg-slate-100" />
              <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
                Practice Details
              </span>
              <div className="flex-1 h-px bg-slate-100" />
            </div>

            {/* ── Form ── */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <FadeUp delay={0.08}>
                <DoctorProfileFormFields
                  register={register}
                  errors={errors}
                  previewUrl={doctor?.profileImage?.url}
                />
              </FadeUp>

              {/* ── Submit ── */}
              <FadeUp delay={0.16}>
                <div className="pt-2">
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full flex items-center justify-center gap-2.5 py-3.5 
                               bg-slate-900 text-white text-sm font-bold rounded-xl 
                               hover:bg-amber-500 transition-all duration-300 
                               shadow-lg shadow-slate-900/20 hover:shadow-amber-400/30
                               disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                        </svg>
                        Saving Changes…
                      </>
                    ) : (
                      <>
                        Save Changes
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </motion.button>
                </div>
              </FadeUp>

              {/* ── Footer note ── */}
              <FadeUp delay={0.22}>
                <p className="text-center text-xs text-slate-400 font-medium">
                  You can update these details anytime from your profile settings.
                </p>
              </FadeUp>
            </form>
          </div>
        </FadeUp>
      </div>
    </div>
  );
};

export default EditDoctorProfile;
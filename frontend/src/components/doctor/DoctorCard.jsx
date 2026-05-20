import { Star, MapPin, Clock, Award, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

// ── Placeholder avatar ───────────────────────────────────────────────────────

const DoctorPlaceholder = ({ name = "" }) => {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-amber-50 to-orange-100">
      <div className="flex flex-col items-center gap-2">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-300 to-orange-400 flex items-center justify-center shadow-lg shadow-amber-200">
          <span className="text-white text-xl font-black tracking-tight">
            {initials || "DR"}
          </span>
        </div>
        <p className="text-[10px] font-semibold text-amber-400 uppercase tracking-widest">
          No Photo
        </p>
      </div>
    </div>
  );
};

// ── Main card ────────────────────────────────────────────────────────────────

const DoctorCard = ({ doctor }) => {
  const hasImage = doctor?.profileImage?.url;
  const doctorName = doctor?.userId?.fullName || doctor?.fullName || "Doctor";

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className="group bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:shadow-slate-200/60 hover:border-amber-200 transition-all duration-300"
    >
      {/* ── Image / placeholder area ── */}
      <div className="relative h-44 overflow-hidden bg-gradient-to-br from-amber-50 to-orange-100">
        {hasImage ? (
          <img
            src={doctor.profileImage.url}
            alt={doctorName}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <DoctorPlaceholder name={doctorName} />
        )}

        {/* Slot duration badge — top left */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-white/90 backdrop-blur-sm border border-amber-100 px-2.5 py-1 rounded-full shadow-sm">
          <Clock className="w-3 h-3 text-amber-500" />
          <span className="text-[11px] font-bold text-amber-700">
            {doctor?.slotDuration} min slots
          </span>
        </div>

        {/* Experience badge — top right */}
        <div className="absolute top-3 right-3 flex items-center gap-1 bg-slate-900/80 backdrop-blur-sm px-2.5 py-1 rounded-full shadow-sm">
          <Award className="w-3 h-3 text-amber-400" />
          <span className="text-[11px] font-bold text-white">
            {doctor?.experience}y exp
          </span>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="p-5">

        {/* Name + specialization */}
        <div className="mb-4">
          <h3 className="text-base font-black text-slate-900 tracking-tight leading-tight">
            {doctorName}
          </h3>
          <span className="inline-block mt-1.5 px-2.5 py-0.5 bg-amber-50 border border-amber-100 text-amber-700 text-[11px] font-bold rounded-full">
            {doctor?.specialization}
          </span>
        </div>

        {/* Location */}
        <div className="flex items-start gap-2 mb-4">
          <MapPin className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mt-0.5" />
          <span className="text-xs text-slate-500 font-medium leading-snug line-clamp-2">
            {doctor?.clinicAddress}
          </span>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-100 pt-4 flex items-center justify-between">
          {/* Reviews */}
          <button
            onClick={() => toast.info("⭐ Reviews coming soon")}
            className="flex items-center gap-1.5 group/review"
          >
            <div className="flex">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star
                  key={i}
                  className="w-3 h-3 fill-amber-400 text-amber-400 -ml-0.5 first:ml-0"
                />
              ))}
            </div>
            <span className="text-xs text-slate-400 font-medium group-hover/review:text-amber-500 transition-colors">
              {doctor?.reviews ?? 0} reviews
            </span>
          </button>

          {/* Book Now CTA */}
          <Link
            to={`/doctors/${doctor?._id}`}
            className="group/btn inline-flex items-center gap-1.5 px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-xl hover:bg-amber-500 transition-all duration-300 shadow-md shadow-slate-900/15 hover:shadow-amber-400/25"
          >
            Book Now
            <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default DoctorCard;
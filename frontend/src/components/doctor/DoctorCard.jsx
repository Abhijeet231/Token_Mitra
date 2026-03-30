import { Star, MapPin, Clock, Award } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const DoctorPlaceholder = () => (
  <div className="w-full h-full flex flex-col items-center justify-center bg-linear-to-br from-amber-50 to-orange-100">
    {/* Subtle circle backdrop */}
    <div className="relative flex items-center justify-center">
      <div className="w-24 h-24 rounded-full bg-amber-200/60 flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 80 80"
          className="w-16 h-16"
          fill="none"
        >
          {/* Body / coat */}
          <ellipse cx="40" cy="72" rx="26" ry="14" fill="#f59e0b" opacity="0.25" />
          <rect x="22" y="46" width="36" height="28" rx="10" fill="#fff7ed" />
          <rect x="22" y="46" width="36" height="28" rx="10" fill="#f59e0b" opacity="0.15" />
          {/* Coat lapels */}
          <path d="M40 52 L33 46 L33 62" stroke="#f59e0b" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          <path d="M40 52 L47 46 L47 62" stroke="#f59e0b" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          {/* Stethoscope */}
          <path d="M33 56 Q30 62 34 65 Q38 68 40 65 Q42 62 40 59" stroke="#ea580c" strokeWidth="1.8" fill="none" strokeLinecap="round" />
          <circle cx="40" cy="58.5" r="2" fill="#ea580c" />
          {/* Head */}
          <circle cx="40" cy="32" r="14" fill="#fef3c7" />
          <circle cx="40" cy="32" r="14" stroke="#f59e0b" strokeWidth="1.5" fill="#fef3c7" />
          {/* Face – subtle */}
          <circle cx="36" cy="30" r="1.2" fill="#d97706" />
          <circle cx="44" cy="30" r="1.2" fill="#d97706" />
          <path d="M36 36 Q40 39 44 36" stroke="#d97706" strokeWidth="1.2" fill="none" strokeLinecap="round" />
          {/* Hair */}
          <path d="M26 30 Q27 18 40 18 Q53 18 54 30" fill="#d97706" opacity="0.5" />
          {/* Cross on coat */}
          <rect x="38.5" y="54" width="3" height="8" rx="1" fill="#ea580c" opacity="0.6" />
          <rect x="36" y="56.5" width="8" height="3" rx="1" fill="#ea580c" opacity="0.6" />
        </svg>
      </div>
    </div>
    <p className="mt-3 text-xs font-medium text-amber-500/80 tracking-wide uppercase">
      No Photo
    </p>
  </div>
);

const DoctorCard = ({ doctor }) => {
  const hasImage = doctor?.profileImage?.url;

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl overflow-hidden group hover:translate-y-1 transition-all duration-300">
      <div className="relative h-48 overflow-hidden bg-linear-to-br from-amber-100 to-orange-100">
        {hasImage ? (
          <img
            src={doctor.profileImage.url}
            alt={doctor?.userId?.fullName}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
        ) : (
          <DoctorPlaceholder />
        )}
        <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
          <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
          <span className="text-sm font-semibold text-gray-800">
            {doctor?.userId?.fullName}
          </span>
        </div>
      </div>

      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-900 mb-1">{doctor?.fullName}</h3>
        <p className="text-amber-600 font-medium mb-3">{doctor?.specialization}</p>

        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <MapPin className="w-4 h-4 text-amber-500" />
            <span>{doctor?.clinicAddress}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Award className="w-4 h-4 text-amber-500" />
            <span>{doctor?.experience} Years of experience</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Clock className="w-4 h-4 text-amber-500" />
            <span className="text-green-600 font-medium">
              Book a {doctor?.slotDuration}-minute slot
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <span
            onClick={() => toast.info("⭐ Reviews are coming soon")}
            className="text-sm text-gray-600 cursor-pointer"
          >
            {doctor?.reviews} Reviews
          </span>
          <Link
            to={`/doctors/${doctor?._id}`}
            className="px-4 py-2 bg-linear-to-r from-amber-500 to-orange-500 text-white rounded-lg font-medium hover:from-amber-600 hover:to-orange-600 transition-all cursor-pointer"
          >
            Book Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;
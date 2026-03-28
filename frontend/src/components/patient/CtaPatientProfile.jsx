import { PlusCircle } from "lucide-react";

const CtaPatientProfile = ({ bookNewAppointment }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 border border-dashed border-gray-300 bg-gray-50 rounded-2xl px-8 py-12 text-center">

      {/* Icon */}
      <div className="w-14 h-14 rounded-full bg-gray-200 flex items-center justify-center">
        <PlusCircle className="w-7 h-7 text-gray-400" />
      </div>

      {/* Text */}
      <div className="space-y-1.5">
        <h2 className="text-base font-bold text-gray-700">
          Need a new appointment?
        </h2>
        <p className="text-sm text-gray-400 max-w-55 leading-relaxed">
          Book your next service with our verified providers instantly.
        </p>
      </div>

      {/* CTA Link */}
      <button
        onClick={bookNewAppointment}
        className="text-sm font-bold text-amber-700 hover:text-amber-800 transition-colors duration-150 cursor-pointer"
      >
        Browse Services →
      </button>

    </div>
  );
};

export default CtaPatientProfile;
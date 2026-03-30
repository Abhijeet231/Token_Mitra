import { LoaderCircle } from "lucide-react";

const PatientProfileDashboard = ({
  patientData,
  onDeleteProfile,
  onEditProfile,
}) => {
  if (!patientData) {
    return (
      <div className="flex items-center justify-center h-40">
        <LoaderCircle className="animate-spin text-amber-500 w-6 h-6" />
      </div>
    );
  }

  const { age, gender, userId } = patientData;

  const initials = userId?.fullName
    ? userId.fullName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "?";

  return (
    <div className="font-sans bg-white rounded-lg p-6 w-full shadow-xl shadow-black/7 border border-amber-100">
      {/* Avatar */}
      <div className="text-center">
        <div className="w-18 h-18 mx-auto mb-3 rounded-full bg-linear-to-br from-amber-600 to-amber-800 flex items-center justify-center text-white text-2xl font-bold tracking-[-0.5px]">
          {initials}
        </div>

        {/* Active chip */}
        <div className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-800 text-[10px] font-bold tracking-[0.07em] uppercase px-3 py-1 rounded-full mb-3">
          <span className="w-1.5 h-1.5 bg-amber-500 rounded-full inline-block" />
          Active Patient
        </div>

        <h2 className="text-[19px] font-bold text-amber-950 tracking-[-0.02em]">
          {userId?.fullName ?? "—"}
        </h2>
        <p className="text-xs text-amber-700/70 mt-1">
          {userId?.email ?? "—"}
        </p>
      </div>

      {/* Divider */}
      <div className="h-px bg-amber-100 my-6" />

      {/* Stats */}
      <div className="space-y-2">
        {[
          { label: "Age", value: age ?? "—" },
          { label: "Gender", value: gender ?? "—" },
        ].map((row, i) => (
          <div
            key={row.label}
            className={`flex justify-between items-center py-2.5 ${
              i > 0 ? "border-t border-amber-100" : ""
            }`}
          >
            <span className="text-[10px] font-semibold tracking-widest text-amber-600/80 uppercase">
              {row.label}
            </span>
            <span className="text-[14.5px] font-semibold text-amber-950">
              {row.value}
            </span>
          </div>
        ))}
      </div>

      {/* Buttons */}
      <button
        onClick={onEditProfile}
        className="w-full mt-6 py-3 bg-linear-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold text-sm tracking-wider rounded-xl transition-all active:scale-[0.985] hover:-translate-y-px shadow-md shadow-amber-600/30"
      >
        Edit Profile
      </button>

      <button
        onClick={onDeleteProfile}
        className="w-full mt-3 py-2.5 text-orange-700 hover:text-orange-800 font-semibold text-sm transition-colors"
      >
        Delete Account
      </button>
    </div>
  );
};

export default PatientProfileDashboard;
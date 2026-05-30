import {
  Stethoscope,
  GraduationCap,
  Clock,
  MapPin,
  Timer,
  Upload,
  AlertCircle,
} from "lucide-react";


const fields = [
  {
    id: "specialization",
    label: "Specialization",
    icon: Stethoscope,
    type: "text",
    placeholder: "e.g. Cardiologist, Neurologist…",
    errorKey: "specialization",
  },
  {
    id: "qualification",
    label: "Qualification",
    icon: GraduationCap,
    type: "text",
    placeholder: "e.g. MBBS, MD, MS…",
    errorKey: "qualification",
  },
  {
    id: "experience",
    label: "Years of Experience",
    icon: Clock,
    type: "number",
    placeholder: "e.g. 8",
    errorKey: "experience",
  },
  {
    id: "slotDuration",
    label: "Slot Duration (minutes)",
    icon: Timer,
    type: "number",
    placeholder: "e.g. 15",
    errorKey: "slotDuration",
  },
  {
    id: "clinicAddress",
    label: "Clinic Address",
    icon: MapPin,
    type: "text",
    placeholder: "Full clinic address…",
    errorKey: "clinicAddress",
    fullWidth: true,
  },
];

const DoctorProfileFormFields = ({ register, errors, previewUrl }) => {
  return (
    <div className="space-y-5">
      {/* Two-column grid for most fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {fields
          .filter((f) => !f.fullWidth)
          .map(({ id, label, icon: Icon, type, placeholder, errorKey }) => (
            <div key={id} className="flex flex-col gap-1.5">
              <label className="flex items-center gap-2 text-xs font-bold text-slate-700 uppercase tracking-wide">
                <Icon className="w-3.5 h-3.5 text-amber-500" />
                {label}
              </label>
              <input
                id={id}
                type={type}
                placeholder={placeholder}
                className={`w-full px-4 py-3 rounded-xl border text-sm font-medium text-slate-900 
                  placeholder:text-slate-400 bg-slate-50 focus:bg-white focus:ring-2 outline-none 
                  transition-all duration-200 
                  ${
                    errors[errorKey]
                      ? "border-red-300 focus:ring-red-200 focus:border-red-400"
                      : "border-slate-200 focus:border-amber-400 focus:ring-amber-100"
                  }`}
                {...register(id)}
              />
              {errors[errorKey] && (
                <p className="text-red-500 text-xs font-medium flex items-center gap-1">
                  <span className="w-1 h-1 rounded-full bg-red-400 inline-block" />
                  {errors[errorKey].message}
                </p>
              )}
            </div>
          ))}
      </div>

      {/* Clinic Address — full width */}
      {fields
        .filter((f) => f.fullWidth)
        .map(({ id, label, icon: Icon, type, placeholder, errorKey }) => (
          <div key={id} className="flex flex-col gap-1.5">
            <label className="flex items-center gap-2 text-xs font-bold text-slate-700 uppercase tracking-wide">
              <Icon className="w-3.5 h-3.5 text-amber-500" />
              {label}
            </label>
            <input
              id={id}
              type={type}
              placeholder={placeholder}
              className={`w-full px-4 py-3 rounded-xl border text-sm font-medium text-slate-900 
                placeholder:text-slate-400 bg-slate-50 focus:bg-white focus:ring-2 outline-none 
                transition-all duration-200 
                ${
                  errors[errorKey]
                    ? "border-red-300 focus:ring-red-200 focus:border-red-400"
                    : "border-slate-200 focus:border-amber-400 focus:ring-amber-100"
                }`}
              {...register(id)}
            />
            {errors[errorKey] && (
              <p className="text-red-500 text-xs font-medium flex items-center gap-1">
                <span className="w-1 h-1 rounded-full bg-red-400 inline-block" />
                {errors[errorKey].message}
              </p>
            )}
          </div>
        ))}

      {/* Profile Image Upload */}
      <div className="flex flex-col gap-1.5">
        <label className="flex items-center gap-2 text-xs font-bold text-slate-700 uppercase tracking-wide">
          <Upload className="w-3.5 h-3.5 text-amber-500" />
          Profile Photo
        </label>

        {/* Custom file input wrapper */}
        <label
          className={`relative flex items-center gap-4 px-4 py-4 rounded-xl border-2 border-dashed 
            cursor-pointer transition-all duration-200 group
            ${
              errors.profileImage
                ? "border-red-300 bg-red-50"
                : "border-slate-200 bg-slate-50 hover:border-amber-300 hover:bg-amber-50/40"
            }`}
        >
          {/* Preview circle */}
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-100 to-orange-100 
                          flex items-center justify-center flex-shrink-0 overflow-hidden 
                          border border-amber-200">
            {previewUrl ? (
              <img src={previewUrl} alt="preview" className="w-full h-full object-cover" />
            ) : (
              <Upload className="w-5 h-5 text-amber-500" />
            )}
          </div>

          <div className="flex flex-col">
            <span className="text-sm font-semibold text-slate-700 group-hover:text-amber-600 transition-colors">
              Click to upload photo
            </span>
            <span className="text-xs text-slate-400 mt-0.5">
              JPG, PNG or WEBP — max 5 MB
            </span>
          </div>

          <input
            type="file"
            accept="image/*"
            className="absolute inset-0 opacity-0 cursor-pointer"
            {...register("profileImage")}
          />
        </label>

        {errors.profileImage && (
          <p className="text-red-500 text-xs font-medium flex items-center gap-1">
            <span className="w-1 h-1 rounded-full bg-red-400 inline-block" />
            {errors.profileImage.message}
          </p>
        )}
      </div>
    </div>
  );
};

export default DoctorProfileFormFields;
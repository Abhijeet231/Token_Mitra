import { motion } from 'framer-motion';
import { Award, Briefcase, MapPin, Star } from 'lucide-react';

const FadeUp = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 18 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}>
    {children}
  </motion.div>
);

const MonogramAvatar = ({ name }) => {
  const initials = name
    ?.split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase() || 'DR';
  return (
    <div className="w-full h-full rounded-2xl bg-gradient-to-br from-amber-300 to-orange-400 flex items-center justify-center text-white text-4xl font-black">
      {initials}
    </div>
  );
};

const InfoPill = ({ icon: Icon, label, value }) => (
  <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-50 border border-slate-200/80">
    <div className="w-7 h-7 rounded-lg bg-amber-50 border border-amber-100 flex items-center justify-center shrink-0">
      <Icon className="w-3.5 h-3.5 text-amber-500" />
    </div>
    <div>
      <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">{label}</p>
      <p className="text-sm font-semibold text-slate-800">{value}</p>
    </div>
  </div>
);

const DoctorDetailCard = ({ doctor }) => {
  const hasImage = doctor?.profileImage?.url;
  const fullName = doctor?.userId?.fullName || '';

  return (
    <FadeUp delay={0.05}>
      <div className="bg-white border border-slate-200/80 rounded-3xl shadow-xl shadow-slate-100/60 overflow-hidden">
        <div className="flex flex-col md:flex-row gap-0">
          {/* Image column */}
          <div className="md:w-56 shrink-0 relative">
            <div className="w-full h-56 md:h-full">
              {hasImage ? (
                <img
                  src={doctor.profileImage.url}
                  alt={`Dr. ${fullName}`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <MonogramAvatar name={fullName} />
              )}
            </div>
            {/* Specialization overlay badge */}
            <div className="absolute bottom-3 left-3 right-3">
              <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-black/50 backdrop-blur-sm text-white text-xs font-semibold">
                {doctor?.specialization}
              </span>
            </div>
          </div>

          {/* Info column */}
          <div className="flex-1 p-7 flex flex-col justify-between">
            <div>
              {/* Name + rating row */}
              <div className="flex items-start justify-between gap-4 mb-1">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-amber-600 mb-1">Verified Doctor</p>
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                    Dr. {fullName}
                  </h2>
                </div>
                {/* Stars */}
                <div className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-100 shrink-0">
                  <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  <span className="text-xs font-bold text-amber-700">4.9</span>
                </div>
              </div>

              <div className="h-px bg-slate-100 my-4" />

              {/* Info pills */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <InfoPill icon={Briefcase} label="Experience" value={`${doctor?.experience} Years`} />
                <InfoPill icon={Award} label="Qualification" value={doctor?.qualification} />
                {doctor?.clinicAddress && (
                  <InfoPill icon={MapPin} label="Clinic" value={doctor.clinicAddress} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </FadeUp>
  );
};

export default DoctorDetailCard;
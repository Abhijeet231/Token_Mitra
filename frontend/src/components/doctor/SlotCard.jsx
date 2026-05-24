import { motion } from "framer-motion";
import { CalendarDays, Clock, Users, CheckCircle2, Timer } from "lucide-react";

// Format date: "2026-07-22T..." → "22 Jul 2026"
const formatDate = (iso) => {
  if (!iso) return "—";
  const d = new Date(iso);
  return d.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

// Day of week
const getDayName = (iso) => {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-IN", { weekday: "long" });
};

const SlotCard = ({ slot, doctor, onBookClick }) => {
  const availableSpots = slot?.maxPatients - (slot?.bookedPatientCount ?? 0);
  const isFull = availableSpots <= 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={!isFull ? { y: -4 } : {}}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className={`bg-white border rounded-3xl shadow-xl shadow-slate-100/60 overflow-hidden flex flex-col transition-all duration-300 ${
        isFull
          ? "border-slate-200/50 opacity-60"
          : "border-slate-200/80 hover:border-amber-200 hover:shadow-amber-100/40"
      }`}
    >
      {/* Card top accent bar */}
      <div
        className={`h-1 w-full ${isFull ? "bg-slate-200" : "bg-gradient-to-r from-amber-400 to-orange-400"}`}
      />

      <div className="p-5 flex flex-col flex-1 gap-4">
        {/* Date header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center shrink-0">
              <CalendarDays className="w-4 h-4 text-amber-500" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wide">
                {getDayName(slot?.date)}
              </p>
              <p className="text-sm font-black text-slate-900">
                {formatDate(slot?.date)}
              </p>
            </div>
          </div>

          {/* Available badge */}
          {!isFull ? (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50 border border-emerald-100 text-emerald-600 text-xs font-bold">
              <CheckCircle2 className="w-3 h-3" />
              Open
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 border border-slate-200 text-slate-400 text-xs font-bold">
              Full
            </span>
          )}
        </div>

        <div className="h-px bg-slate-100" />

        {/* Time row */}
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-1 px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
            <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400 flex items-center gap-1">
              <Clock className="w-3 h-3 text-amber-500" /> Start
            </p>
            <p className="text-base font-black text-slate-900">
              {slot?.startTime}
            </p>
          </div>
          <div className="flex flex-col gap-1 px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
            <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400 flex items-center gap-1">
              <Clock className="w-3 h-3 text-amber-500" /> End
            </p>
            <p className="text-base font-black text-slate-900">
              {slot?.endTime}
            </p>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-1 px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
            <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400 flex items-center gap-1">
              <Users className="w-3 h-3 text-amber-500" /> Spots Left
            </p>
            <p
              className={`text-base font-black ${isFull ? "text-slate-400" : "text-emerald-600"}`}
            >
              {isFull ? "0" : availableSpots}
              <span className="text-xs font-semibold text-slate-400 ml-1">
                / {slot?.maxPatients}
              </span>
            </p>
          </div>
          <div className="flex flex-col gap-1 px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
            <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400 flex items-center gap-1">
              <Timer className="w-3 h-3 text-amber-500" /> Duration
            </p>
            <p className="text-base font-black text-slate-900">
              {doctor?.slotDuration}
              <span className="text-xs font-semibold text-slate-400 ml-1">
                min
              </span>
            </p>
          </div>
        </div>

        {/* Book button */}
        <motion.button
          whileHover={!isFull ? { scale: 1.02 } : {}}
          whileTap={!isFull ? { scale: 0.98 } : {}}
          onClick={() => !isFull && onBookClick(slot)}
          disabled={isFull}
          className={`mt-auto w-full flex items-center justify-center gap-2 py-3 text-sm font-bold rounded-xl transition-all duration-300 ${
            isFull
              ? "bg-slate-100 text-slate-400 cursor-not-allowed"
              : "bg-slate-900 text-white hover:bg-amber-500 shadow-lg shadow-slate-900/20 hover:shadow-amber-400/30"
          }`}
        >
          {isFull ? "Fully Booked" : "Book This Slot"}
        </motion.button>
      </div>
    </motion.div>
  );
};

export default SlotCard;

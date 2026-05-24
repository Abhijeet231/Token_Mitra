import { X, CalendarDays, Clock, Stethoscope, FileText, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BookingModal = ({ isOpen, onClose, slot, doctor, onSubmit }) => {
  const [issue, setIssue] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!issue.trim()) return;
    setIsSubmitting(true);
    try {
      await onSubmit(slot._id, issue);
      setIssue('');
    } catch (error) {
      console.error('Booking error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setIssue('');
    onClose();
  };

  const formatDate = (iso) => {
    if (!iso) return '—';
    return new Date(iso).toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={(e) => e.target === e.currentTarget && handleClose()}
        >
          <motion.div
            key="modal"
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="bg-white rounded-3xl shadow-2xl shadow-slate-900/20 max-w-md w-full overflow-hidden"
          >
            {/* Header */}
            <div className="px-7 pt-7 pb-5 relative">
              <button
                onClick={handleClose}
                className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4 text-slate-600" />
              </button>

              {/* Icon + title */}
              <div className="flex items-center gap-3 mb-1">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 shadow-lg shadow-amber-200 flex items-center justify-center">
                  <Stethoscope className="w-5 h-5 text-white" strokeWidth={2.5} />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-amber-600">New Appointment</p>
                  <h2 className="text-xl font-black text-slate-900 tracking-tight">Book This Slot</h2>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-slate-100 mx-7" />

            {/* Slot summary */}
            <div className="mx-7 mt-5 bg-slate-50 border border-slate-200/80 rounded-2xl p-4 grid grid-cols-2 gap-3">
              <div className="flex items-center gap-2.5">
                <CalendarDays className="w-4 h-4 text-amber-500 shrink-0" />
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">Date</p>
                  <p className="text-xs font-bold text-slate-900">{formatDate(slot?.date)}</p>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-amber-500 shrink-0" />
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">Time</p>
                  <p className="text-xs font-bold text-slate-900">{slot?.startTime} – {slot?.endTime}</p>
                </div>
              </div>
              <div className="col-span-2 flex items-center gap-2.5 pt-1 border-t border-slate-200/80">
                <Stethoscope className="w-4 h-4 text-amber-500 shrink-0" />
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">Doctor</p>
                  <p className="text-xs font-bold text-slate-900">Dr. {doctor?.userId?.fullName} · {doctor?.slotDuration} min slot</p>
                </div>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="px-7 pt-5 pb-7">
              <div className="mb-5">
                <label className="flex items-center gap-2 text-xs font-bold text-slate-700 uppercase tracking-wide mb-2">
                  <FileText className="w-3.5 h-3.5 text-amber-500" />
                  Describe your health concern <span className="text-red-500 ml-0.5">*</span>
                </label>
                <textarea
                  value={issue}
                  onChange={(e) => setIssue(e.target.value)}
                  placeholder="Describe your symptoms or reason for the visit…"
                  rows={4}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-medium text-slate-900 placeholder:text-slate-400 bg-slate-50 focus:bg-white focus:border-amber-400 focus:ring-2 focus:ring-amber-100 outline-none transition-all duration-200 resize-none"
                />
                <p className="text-xs text-slate-400 font-medium mt-1.5">
                  This helps the doctor prepare before your visit.
                </p>
              </div>

              {/* Buttons */}
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={handleClose}
                  disabled={isSubmitting}
                  className="flex-1 px-4 py-3 border border-slate-200 text-slate-600 text-sm font-semibold rounded-xl hover:border-slate-300 hover:bg-slate-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancel
                </button>
                <motion.button
                  type="submit"
                  whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                  whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                  disabled={isSubmitting}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-slate-900 text-white text-sm font-bold rounded-xl hover:bg-amber-500 transition-all duration-300 shadow-lg shadow-slate-900/20 hover:shadow-amber-400/30 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                      </svg>
                      Booking…
                    </>
                  ) : (
                    <>
                      Confirm Booking
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </motion.button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BookingModal;
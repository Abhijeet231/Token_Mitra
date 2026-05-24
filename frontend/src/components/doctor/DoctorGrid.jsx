import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Stethoscope } from 'lucide-react';
import DoctorCard from '@/components/doctor/DoctorCard';

const FadeUp = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 18 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}>
    {children}
  </motion.div>
);

const DoctorGrid = ({ visibleDoctors, filteredDoctors, showAll, setShowAll, totalDoctors, searchQuery }) => {
  if (filteredDoctors.length === 0) {
    return (
      <FadeUp>
        <div className="flex flex-col items-center justify-center py-24 gap-4">
          <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center">
            <Stethoscope className="w-8 h-8 text-slate-400" />
          </div>
          <p className="text-slate-500 font-medium text-sm">
            No doctors found for{' '}
            <span className="text-slate-800 font-bold">"{searchQuery}"</span>
          </p>
          <p className="text-slate-400 text-xs">Try a different name, specialty or city</p>
        </div>
      </FadeUp>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section header */}
      <FadeUp>
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-amber-600 mb-1 flex items-center gap-1.5">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-400" />
              Available Now
            </p>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">
              {searchQuery ? `Results for "${searchQuery}"` : 'Available Doctors'}
            </h2>
          </div>
          <span className="text-sm font-semibold text-slate-400 hidden sm:block">
            {filteredDoctors.length} doctor{filteredDoctors.length !== 1 ? 's' : ''} found
          </span>
        </div>
      </FadeUp>

      {/* Cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <AnimatePresence>
          {visibleDoctors.map((doc, i) => (
            <motion.div
              key={doc._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -4 }}
            >
              <DoctorCard doctor={doc} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Show More / Show Less */}
      {filteredDoctors.length >= 1 && totalDoctors > 4 && (
        <FadeUp delay={0.1}>
          <div className="flex justify-center mt-10">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowAll(!showAll)}
              className="flex items-center gap-2.5 px-8 py-3.5 bg-slate-900 text-white text-sm font-bold rounded-xl hover:bg-amber-500 transition-all duration-300 shadow-lg shadow-slate-900/20 hover:shadow-amber-400/30"
            >
              {showAll ? (
                <>
                  Show Less
                  <ChevronUp className="w-4 h-4" />
                </>
              ) : (
                <>
                  Show More Doctors
                  <ChevronDown className="w-4 h-4" />
                </>
              )}
            </motion.button>
          </div>
        </FadeUp>
      )}
    </div>
  );
};

export default DoctorGrid;
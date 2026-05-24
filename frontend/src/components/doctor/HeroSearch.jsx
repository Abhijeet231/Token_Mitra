import { Search, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const FadeUp = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 18 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}>
    {children}
  </motion.div>
);

const PILLS = ['Cardiologist', 'Dermatologist', 'Orthopedic', 'Neurologist', 'Pediatrics'];

const HeroSearch = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="relative pt-16 pb-10 px-4">
      {/* Ambient glows */}
      <div className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 w-[700px] h-[300px] rounded-full bg-amber-300/15 blur-3xl" />

      <div className="max-w-3xl mx-auto text-center relative z-10">
        {/* Badge */}
        <FadeUp delay={0}>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-100 text-amber-700 text-xs font-bold uppercase tracking-wide mb-6">
            <Sparkles className="w-3 h-3 text-amber-500" />
            Find &amp; Book Instantly
          </div>
        </FadeUp>

        {/* Heading */}
        <FadeUp delay={0.08}>
          <h1 className="text-5xl sm:text-6xl font-black text-slate-900 tracking-tight leading-[1.05] mb-4">
            Find Your{' '}
            <span className="relative inline-block">
              Perfect Doctor
              {/* Underline accent */}
              <svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 300 10" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                <path d="M2 7 Q150 2 298 7" stroke="#f59e0b" strokeWidth="3" strokeLinecap="round" fill="none"/>
              </svg>
            </span>
          </h1>
        </FadeUp>

        <FadeUp delay={0.14}>
          <p className="text-base text-slate-500 font-medium mb-8 max-w-lg mx-auto">
            Search by name, specialty, or location — get a token and skip the waiting room.
          </p>
        </FadeUp>

        {/* Search Bar */}
        <FadeUp delay={0.2}>
          <div className="relative group max-w-2xl mx-auto">
            {/* Glow ring on focus-within */}
            <div className="absolute inset-0 rounded-2xl bg-amber-400/20 blur-md opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none" />
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 z-10 pointer-events-none group-focus-within:text-amber-500 transition-colors" />
            <input
              type="text"
              placeholder="Search by doctor name, specialty, or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="relative w-full pl-14 pr-6 py-4 rounded-2xl border border-slate-200 bg-white focus:border-amber-400 focus:ring-2 focus:ring-amber-100 text-sm font-medium text-slate-900 placeholder:text-slate-400 outline-none transition-all duration-200 shadow-xl shadow-slate-100/60"
            />
          </div>
        </FadeUp>

        {/* Quick filter pills */}
        <FadeUp delay={0.28}>
          <div className="flex flex-wrap justify-center gap-2 mt-5">
            {PILLS.map((pill) => (
              <button
                key={pill}
                onClick={() => setSearchQuery(pill)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200 ${
                  searchQuery === pill
                    ? 'bg-amber-400 border-amber-400 text-white shadow-md shadow-amber-200'
                    : 'bg-white border-slate-200 text-slate-600 hover:border-amber-300 hover:text-amber-700'
                }`}
              >
                {pill}
              </button>
            ))}
          </div>
        </FadeUp>
      </div>
    </div>
  );
};

export default HeroSearch;
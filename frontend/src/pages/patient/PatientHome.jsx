import { useState, useEffect } from 'react';
import { LoaderCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';

import { getAllDoctors } from '@/services/doctor.service';
import HeroSearch from "@/components/doctor/HeroSearch.jsx";
import DoctorGrid from '@/components/doctor/DoctorGrid.jsx';

const PatientHomePage = () => {
  const [doctor, setDoctor] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAll, setShowAll] = useState(false);
  const [loading, setLoading] = useState(false);

  // Fetch all doctors
  useEffect(() => {
    const getAllDocs = async () => {
      try {
        setLoading(true);
        const res = await getAllDoctors();
        setDoctor(res.data.data);
      } catch (error) {
        toast.error('Error while fetching doctors!');
        console.error('Error fetching doctors:', error);
      } finally {
        setLoading(false);
      }
    };
    getAllDocs();
  }, []);

  // Reset show all on new search
  useEffect(() => {
    setShowAll(false);
  }, [searchQuery]);

  const normalizedQuery = searchQuery.toLocaleLowerCase().trim();

  const filteredDoctors = doctor.filter((doc) => {
    const name = doc?.userId?.fullName?.toLocaleLowerCase() || '';
    const specialization = doc?.specialization?.toLocaleLowerCase() || '';
    const address = doc?.clinicAddress?.toLocaleLowerCase() || '';
    return (
      name.includes(normalizedQuery) ||
      specialization.includes(normalizedQuery) ||
      address.includes(normalizedQuery)
    );
  });

  const visibleDoctors = showAll ? filteredDoctors : filteredDoctors.slice(0, 4);

  if (loading) {
    return (
      <div className="min-h-screen pt-16 bg-gradient-to-b from-amber-50/60 via-white to-white flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center gap-4"
        >
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 shadow-lg shadow-amber-200 flex items-center justify-center">
            <LoaderCircle className="w-6 h-6 text-white animate-spin" />
          </div>
          <p className="text-sm font-semibold text-slate-500 animate-pulse">Finding doctors near you…</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16 bg-gradient-to-b from-amber-50/60 via-white to-white relative overflow-hidden">
      {/* Ambient glows */}
      <div className="pointer-events-none absolute -top-20 -left-40 w-[500px] h-[500px] rounded-full bg-amber-300/10 blur-3xl" />
      <div className="pointer-events-none absolute top-1/3 -right-20 w-[400px] h-[400px] rounded-full bg-orange-300/10 blur-3xl" />

      {/* Subtle dot grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            'linear-gradient(#94a3b8 1px,transparent 1px),linear-gradient(90deg,#94a3b8 1px,transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Hero + Search */}
      <HeroSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      {/* Divider */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
      </div>

      {/* Doctor grid */}
      <div className="pb-20">
        <DoctorGrid
          visibleDoctors={visibleDoctors}
          filteredDoctors={filteredDoctors}
          showAll={showAll}
          setShowAll={setShowAll}
          totalDoctors={doctor.length}
          searchQuery={searchQuery}
        />
      </div>

   
    </div>
  );
};

export default PatientHomePage;
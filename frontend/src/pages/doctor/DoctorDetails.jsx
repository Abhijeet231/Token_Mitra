import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LoaderCircle, CalendarX, ArrowLeft } from 'lucide-react';

import { getSpecificDoctor } from '@/services/doctor.service.js';
import { getDoctorsAvailability } from '@/services/docAvailability.service';
import { createBooking } from '@/services/booking.service';

import DoctorDetailCard from '@/components/doctor/DoctorDetailCard.jsx';
import SlotCard from '@/components/doctor/SlotCard.jsx';
import BookingModal from '@/components/doctor/BookingModal.jsx';

const FadeUp = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 18 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}>
    {children}
  </motion.div>
);

const DoctorDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [doctor, setDoctor] = useState(null);
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);

  const refetchSlots = async () => {
    const res = await getDoctorsAvailability(id);
    setSlots(res.data?.data || []);
  };

  console.log("SULTTS<:", slots)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getSpecificDoctor(id);
        setDoctor(res.data?.data);

        const slotRes = await getDoctorsAvailability(id);
        setSlots(slotRes.data.data || []);
      } catch (error) {
        toast.error('Failed to fetch doctor details');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchData();
  }, [id]);

  const handleBookSlotClick = (slot) => {
    setSelectedSlot(slot);
    setIsModalOpen(true);
  };

  const handleBookingSubmit = async (slotId, issue) => {
    try {
      const bookingData = { availabilityId: slotId, issue };
      const response = await createBooking(bookingData);
      console.log('Booking Response:', response.data);
      toast.success('Appointment Booked Successfully!');
      setIsModalOpen(false);
      refetchSlots();
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Something went wrong';
      toast.error(errorMessage);
      console.error('Booking error:', errorMessage);
    }
  };

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
          <p className="text-sm font-semibold text-slate-500 animate-pulse">Loading doctor profile…</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16 bg-gradient-to-b from-amber-50/60 via-white to-white relative overflow-hidden">
      {/* Ambient glows */}
      <div className="pointer-events-none absolute -top-20 -left-40 w-[500px] h-[500px] rounded-full bg-amber-300/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 -right-20 w-[400px] h-[400px] rounded-full bg-orange-300/10 blur-3xl" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            'linear-gradient(#94a3b8 1px,transparent 1px),linear-gradient(90deg,#94a3b8 1px,transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative z-10">
        {/* Back button */}
        <FadeUp delay={0}>
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-900 mb-7 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            Back to Doctors
          </button>
        </FadeUp>

        {/* Doctor Detail Card */}
        <DoctorDetailCard doctor={doctor} />

        {/* Slots Section */}
        <div className="mt-10">
          <FadeUp delay={0.15}>
            <div className="flex items-end justify-between mb-6">
              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-amber-600 mb-1 flex items-center gap-1.5">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-400" />
                  Availability
                </p>
                <h3 className="text-2xl font-black text-slate-900 tracking-tight">Book a Slot</h3>
              </div>
              {slots.length > 0 && (
                <span className="text-sm font-semibold text-slate-400 hidden sm:block">
                  {slots.length} slot{slots.length !== 1 ? 's' : ''} available
                </span>
              )}
            </div>
          </FadeUp>

          {slots.length === 0 ? (
            <FadeUp delay={0.2}>
              <div className="flex flex-col items-center justify-center py-20 gap-4">
                <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center">
                  <CalendarX className="w-7 h-7 text-slate-400" />
                </div>
                <p className="text-slate-500 font-semibold text-sm">No slots available right now</p>
                <p className="text-slate-400 text-xs">Check back later or try another doctor</p>
              </div>
            </FadeUp>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {slots.map((slot, i) => (
                <motion.div
                  key={slot._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.15 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                >
                  <SlotCard
                    slot={slot}
                    doctor={doctor}
                    onBookClick={handleBookSlotClick}
                  />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Booking Modal */}
      <BookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        slot={selectedSlot}
        doctor={doctor}
        onSubmit={handleBookingSubmit}
      />
    </div>
  );
};

export default DoctorDetails;
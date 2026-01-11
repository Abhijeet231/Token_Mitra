import { useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { getSpecificDoctor } from "@/services/doctor.service.js";
import { getDoctorsAvailability } from "@/services/docAvailability.service.js";
import { LoaderCircle} from "lucide-react";
import { useNavigate } from "react-router-dom";
import SlotCard from "@/components/doctor/SlotCard.jsx";
import DoctorDetailCard from "@/components/doctor/DoctorDetailCard.jsx";
import BookingModal from "@/components/doctor/BookingModal.jsx";
import { createBooking } from "@/services/booking.service.js";


const DoctorDetails = () => {
  const navigate = useNavigate()
  const { id } = useParams();

  const [doctor, setDoctor] = useState(null);
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);

  // REfetching Slots 
  const refetchSlots = async() => {
    const res = await getDoctorsAvailability(id);
    setSlots(res.data?.data || []);
  }

  // Fetching Specific Doctor
  useEffect(() => {
    const fetchData = async () => {
      try {
        // First: fetching doctor details
        const res = await getSpecificDoctor(id);
        console.log("SPecific Doctor is : ", res.data.data);
        setDoctor(res.data?.data);

        // Second: fetching available slots for that specific doctor
        const slotRes = await getDoctorsAvailability(id);
        console.log("Available SLots:", slotRes.data);
        setSlots(slotRes.data.data || []);
      } catch (error) {
        toast.error("Failed to fetch doctor details");
        console.log("Failed to fetch doctor detils:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchData();
  }, [id]);



// Handle Book Slot Click
 const handleBookSlotClick = (slot) => {
  setSelectedSlot(slot);
  setIsModalOpen(true);
 };

 // Handle Booking Submission
 const handleBookingSubmit = async (slotId, issue) => {
  try {
    const bookingData = {
      availabilityId: slotId,
      issue: issue
    }
   const response = await createBooking(bookingData);
    console.log("Booking Response:", response.data)

    toast.success("Appointment Booked Successfully!");
    setIsModalOpen(false);

    // refetching slots 
    refetchSlots()
     
  } catch (error) {
     const errorMessage = error.response?.data?.message || error.message || "Something went wrong";
    toast.error(errorMessage);
    console.log("Error while creating Booking: ", errorMessage)
  }
 }

  // Loading State
if(loading) {
  return <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
  <h3 className="text-center font-semibold text-2xl text-gray-700 animate-pulse">
    Loading...
  </h3>

  <LoaderCircle className="w-10 h-10 text-amber-500 animate-spin" />
</div>

}

  return (
    <div className="flex flex-col items-center gap-10 mt-10 justify-center">
      {/* Doctor Detail Part */}
     <DoctorDetailCard doctor={doctor}/>

      {/* Available Slots part*/}
    {slots.length === 0 ? "No Available Slots!" : 
         
         
      <div className="flex flex-row gap-4 ">
        {slots.map((slot) => (
          <SlotCard 
          key={slot._id}
          slot= {slot}
           doctor = {doctor}
           onBookClick={handleBookSlotClick}
           />
      
        ))}
      </div>
    }

         {/* Booking Modal*/}
      <BookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        slot={ selectedSlot}
        doctor={doctor}
        onSubmit={handleBookingSubmit}
        
      />

    
    </div>
  );
};

export default DoctorDetails;

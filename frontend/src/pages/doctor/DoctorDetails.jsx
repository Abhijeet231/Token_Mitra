import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { getSpecificDoctor } from "@/services/doctor.service.js";
import { getDoctorsAvailability } from "@/services/docAvailability.service";
import { MessageSquareMore } from "lucide-react";

const DoctorDetails = () => {
  const { id } = useParams();

  const [doctor, setDoctor] = useState(null);
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="flex flex-col items-center gap-10 mt-10 justify-center">
      
 {/* Doctor Detail Part */}
<div className="w-full flex justify-center mt-6">
  <div className="w-[80%] md:w-[80%] bg-white rounded-2xl drop-shadow-lg p-6 flex flex-col md:flex-row gap-6">

    {/* Doctor Image */}
    <div className="shrink-0">
      <img
        src={doctor?.profileImage?.url}
        alt="Doctor Profile"
        className="w-32 h-32 md:w-40 md:h-40 object-cover rounded-xl "
      />
    </div>

    {/* Doctor Info */}
    <div className="flex-1 flex flex-col justify-between">
      
      <div>
        <h2 className="text-2xl font-bold text-gray-800">
          Dr. {doctor?.userId?.fullName}
        </h2>

        <p className="text-sm text-amber-600 font-medium mt-1">
          {doctor?.specialization}
        </p>

        <hr className="my-3 border-gray-200" />

        <p className="text-sm text-gray-700">
          <span className="font-semibold">Experience:</span> {doctor?.experience} Years
        </p>

        <p className="text-sm text-gray-700 mt-1">
          <span className="font-semibold">Qualification:</span> {doctor?.qualification}
        </p>
      </div>

      {/* Action Button */}
      <div className="mt-4 md:mt-0 flex md:justify-end">
        <button
          className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 cursor-pointer
                     text-white font-semibold px-5 py-2 rounded-lg 
                     transition-all shadow-sm hover:shadow-md"
        >
          <MessageSquareMore size={18} />
          Chat with Doctor
        </button>
      </div>
    </div>
  </div>
</div>


      {/* Available Slots part*/}
      <div>
        {/* All Available SLots for this specific doctor */}
        {slots.map((slot) => (
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow duration-300">
  <div className="space-y-4">
    {/* Date Header */}
    <div className="border-b border-gray-200 pb-3">
      <h3 className="text-lg font-semibold text-gray-900">
        {slot?.date.split("T")[0]}
      </h3>
    </div>

    {/* Time and Capacity Info */}
    <div className="grid grid-cols-2 gap-4">
      <div>
        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
          Start Time
        </p>
        <p className="text-sm font-semibold text-gray-900">
          {slot?.startTime}
        </p>
      </div>
      
      <div>
        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
          End Time
        </p>
        <p className="text-sm font-semibold text-gray-900">
          {slot?.endTime}
        </p>
      </div>
    </div>

    <div className="grid grid-cols-2 gap-4">
      <div>
        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
          Max Patients
        </p>
        <p className="text-sm font-semibold text-gray-900">
          {slot?.maxPatients}
        </p>
      </div>
      
      <div>
        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
          Slots Available
        </p>
        <p className="text-sm font-semibold text-emerald-600">
          {slot?.maxPatients - slot?.bookedPatientCount}
        </p>
      </div>
    </div>

    <div>
      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
        Slot Duration
      </p>
      <p className="text-sm font-semibold text-gray-900">
        {doctor?.slotDuration}
      </p>
    </div>

    {/* Book Button */}
    <button className="w-full bg-gray-900 text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors duration-200 mt-2">
      Book Slot
    </button>
  </div>
</div>
        ))}
      </div>
    </div>
  );
};

export default DoctorDetails;

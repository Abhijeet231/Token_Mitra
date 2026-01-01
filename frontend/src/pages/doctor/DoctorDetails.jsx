import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { getSpecificDoctor } from "@/services/doctor.service.js";
import { getDoctorsAvailability } from "@/services/docAvailability.service";
import {
  Clock,
  Users,
  CalendarDays,
  Timer,
  Plus,
  MessageSquareMore,
  LoaderCircle
} from "lucide-react";

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
      <div className="w-full flex justify-center  mt-6 ">
        <div className="w-[80%] md:w-[80%] border border-amber-200/60 hover:shadow-2xl hover:border-amber-300 transition-all duration-300 hover:translate-y-1 rounded-2xl drop-shadow-lg p-6 flex flex-col md:flex-row gap-6 shadow-sm ">
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
                <span className="font-semibold">Experience:</span>{" "}
                {doctor?.experience} Years
              </p>

              <p className="text-sm text-gray-700 mt-1">
                <span className="font-semibold">Qualification:</span>{" "}
                {doctor?.qualification}
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
    {slots.length === 0 ? "No Available Slots!" : 
         
         
      <div className="flex flex-row gap-4 ">
        {slots.map((slot) => (
          <div className=" rounded-lg shadow-md border border-amber-200/60 p-6 hover:shadow-2xl hover:border-amber-300 transition-all duration-300 hover:-translate-y-1">
            <div className="space-y-4">
              {/* Date Header */}
              <div className="border-b border-amber-200/50 pb-3 flex items-center gap-2">
                <CalendarDays className="w-5 h-5 text-amber-600" />
                <h3 className="text-lg font-bold text-amber-700">
                  {slot?.date.split("T")[0]}
                </h3>
              </div>

              {/* Time and Capacity Info */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/60 rounded-lg p-3 border border-amber-100">
                  <div className="flex items-center gap-2 mb-1">
                    <Clock className="w-3.5 h-3.5 text-amber-500" />
                    <p className="text-xs font-semibold text-amber-600 uppercase tracking-wide">
                      Start Time
                    </p>
                  </div>
                  <p className="text-base font-bold text-gray-800">
                    {slot?.startTime}
                  </p>
                </div>

                <div className="bg-white/60 rounded-lg p-3 border border-amber-100">
                  <div className="flex items-center gap-2 mb-1">
                    <Clock className="w-3.5 h-3.5 text-orange-500" />
                    <p className="text-xs font-semibold text-orange-600 uppercase tracking-wide">
                      End Time
                    </p>
                  </div>
                  <p className="text-base font-bold text-gray-800">
                    {slot?.endTime}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/60 rounded-lg p-3 border border-amber-100">
                  <div className="flex items-center gap-2 mb-1">
                    <Users className="w-3.5 h-3.5 text-amber-500" />
                    <p className="text-xs font-semibold text-amber-600 uppercase tracking-wide">
                      Max Patients
                    </p>
                  </div>
                  <p className="text-base font-bold text-gray-800">
                    {slot?.maxPatients}
                  </p>
                </div>

                <div className="bg-white/60 rounded-lg p-3 border border-green-100">
                  <div className="flex items-center gap-2 mb-1">
                    <Plus className="w-3.5 h-3.5 text-green-600" />
                    <p className="text-xs font-semibold text-green-600 uppercase tracking-wide">
                      Available
                    </p>
                  </div>
                  <p className="text-base font-bold text-green-700">
                    {slot?.maxPatients - slot?.bookedPatientCount}
                  </p>
                </div>
              </div>

              <div className="bg-white/60 rounded-lg p-3 border border-amber-100">
                <div className="flex items-center gap-2 mb-1">
                  <Timer className="w-3.5 h-3.5 text-amber-500" />
                  <p className="text-xs font-semibold text-amber-600 uppercase tracking-wide">
                    Slot Duration
                  </p>
                </div>
                <p className="text-base font-bold text-gray-800">
                  {doctor?.slotDuration} minutes
                </p>
              </div>

              {/* Book Button */}
              <button className="w-full bg-linear-to-r from-amber-500 to-orange-500 text-white py-3 rounded-xl font-bold hover:from-amber-600 hover:to-orange-600 cursor-pointer transition-all duration-200 mt-2 shadow-md hover:shadow-lg active:scale-95">
                Book Slot
              </button>
            </div>
          </div>
        ))}
      </div>
    }
    </div>
  );
};

export default DoctorDetails;

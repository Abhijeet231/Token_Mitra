import { useState, useEffect } from "react";
import { getMyAvailability } from "@/services/docAvailability.service";
import { toast } from "react-toastify";
import { Calendar, Clock, Users, UserCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { LoaderCircle } from "lucide-react";

const AvailableSlots = () => {
  const navigate = useNavigate();
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getDoctorSlots = async () => {
      try {
        const res = await getMyAvailability();
        setSlots(res.data.data);
        console.log("Docs Availability:", res);
      } catch (error) {
        toast.error("Error While Fetching Doctors Availability SLots");
        console.log("Error While Fetching Slots for Doctor:", error);
      } finally {
        setLoading(false);
      }
    };
    getDoctorSlots();
  }, []);

  // Loading
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <h3 className="text-center font-semibold text-2xl text-gray-700 animate-pulse">
          Loading...
        </h3>

        <LoaderCircle className="w-10 h-10 text-amber-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p6">
      {slots.length == 0 ? (
        <div className="flex flex-col items-center justify-center mt-16 p-8 border border-amber-200 rounded-2xl bg-amber-50/40 shadow-sm">
          <h1 className="text-2xl font-semibold text-amber-700 mb-2">
            No available slots yet
          </h1>

          <p className="text-sm text-gray-600 mb-6 text-center max-w-sm">
            You haven't created any slots so far. Create a slot to start
            accepting bookings.
          </p>

          <button
            onClick={() => navigate("/Doctors/open-bookings")}
            className="px-6 py-3 rounded-xl bg-amber-600 text-white font-medium
                 hover:bg-amber-700 transition-all shadow-md hover:shadow-lg"
          >
            + Create Slot
          </button>
        </div>
      ) : (
        <h1 className="mb-2 text-2xl font-semibold text-gray-800">My Slots</h1>
      )}
      {slots.map((el) => (
        <div key={el._id} className="mb-4">
          <div className="border-2 border-amber-400 p-4 rounded-xl shadow-md hover:shadow-xl transition-all duration-200 hover:border-amber-500  hover:scale-[1.03] ">
            {/* Date */}
            <div className="flex items-center gap-3 mb-3 pb-3 border-b border-amber-200">
              <div className="p-2 bg-amber-100 rounded-lg">
                <Calendar className="text-amber-600" size={20} />
              </div>
              <div>
                <p className="text-xs text-gray-600 font-medium">Date</p>
                <p className="text-base font-bold text-gray-800">
                  {el?.date.split("T")[0]}
                </p>
              </div>
            </div>

            {/* Time Range */}
            <div className="flex items-center gap-3 mb-3 pb-3 border-b border-amber-200">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Clock className="text-orange-600" size={20} />
              </div>
              <div>
                <p className="text-xs text-gray-600 font-medium">Time Slot</p>
                <p className="text-base font-bold text-gray-800">
                  {el?.startTime} - {el?.endTime}
                </p>
              </div>
            </div>

            {/* Patients Info with Progress */}
            <div className="flex items-start gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Users className="text-green-600" size={20} />
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-600 font-medium mb-2">
                  Patient Capacity
                </p>

                {/* Stats */}
                <div className="flex items-center gap-4 mb-2">
                  <div className="flex items-center gap-2">
                    <UserCheck className="text-green-600" size={16} />
                    <span className="text-sm font-bold text-green-700">
                      {el?.bookedPatientCount} Booked
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="text-amber-600" size={16} />
                    <span className="text-sm font-bold text-amber-700">
                      {el?.maxPatients} Available Slots
                    </span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-linear-to-r from-green-500 to-green-600 h-2.5 rounded-full transition-all duration-300"
                    style={{
                      width: `${
                        (el?.bookedPatientCount / el?.maxPatients) * 100
                      }%`,
                    }}
                  ></div>
                </div>

                {/* Remaining count */}
                <p className="text-xs text-gray-500 mt-1">
                  {el?.maxPatients - el?.bookedPatientCount} spots remaining
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AvailableSlots;

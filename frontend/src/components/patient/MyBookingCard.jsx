import { Clock, Stethoscope, Calendar } from "lucide-react";

const MyBookingCard = ({ booking }) => {
  return (
    <>
      <div className="border border-amber-200 shadow-md p-5 mt-3 mb-4 hover:border-amber-300 bg-amber-50/30 hover:shadow-lg hover:scale-105  transition-all duration-200 rounded-xl">
        <div className="space-y-3">
          {/* Date */}
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-50 rounded-lg">
              <Calendar className="text-amber-600" size={18} />
            </div>
            <span className="text-gray-700 font-medium">
              {booking?.appointmentDate.split("T")[0]}
            </span>
          </div>

          {/* Doctor */}
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Stethoscope className="text-blue-600" size={18} />
            </div>
            <span className="text-black font-semibold">
              Dr. {booking?.doctorId?.fullName}
            </span>
          </div>

          {/* Slot Time */}
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-50 rounded-lg">
              <Clock className="text-purple-600" size={18} />
            </div>
            <span className="text-gray-700">{booking?.slotTime}</span>
          </div>

          {/* Token Number & Status */}
          <div className="flex items-center justify-between pt-2 border-t border-gray-100">
            <span className="text-md text-gray-800">
              Token:{" "}
              <span className="font-semibold text-gray-800">
                #{booking?.tokenNumber}
              </span>
            </span>

            <span
              className={`px-3 py-1  text-md font-semibold ${
                booking?.status === "pending"
                  ? " text-amber-700"
                  : booking?.status === "completed"
                  ? " text-green-700"
                  : booking?.status === "cancelled"
                  ? " text-red-700"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              {booking?.status?.charAt(0).toUpperCase() +
                booking?.status?.slice(1)}
            </span>

            <span>
              <button className="bg-red-600 px-3 py-0.5 rounded-sm shadow-sm text-white font-semibold cursor-pointer hover:bg-red-700 ">
                Cancel Booking
              </button>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyBookingCard;

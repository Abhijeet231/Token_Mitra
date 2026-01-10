import { getBookingsForDoctor } from "@/services/booking.service";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  Calendar,
  Clock,
  User,
  Hash,
  CheckCircle2,
  LoaderCircle,
} from "lucide-react";

const ScheduledAppointments = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await getBookingsForDoctor();
        setBookings(res.data.data);
        console.log("All Booking Fetched:", res.data.data);
      } catch (error) {
        toast.error("Error While Fetching alll Bookings");
        console.log("Error while fetching all bookings:", error);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

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
    <div className="max-w-4xl mx-auto p-6">
      {bookings.length == 0 ? (
        <div className="flex flex-col items-center justify-center mt-16 p-8 border border-amber-200 rounded-2xl bg-amber-50/40 shadow-sm">
          <h1 className="text-2xl font-semibold text-amber-700 mb-2">
            No scheduled appointments
          </h1>

          <p className="text-sm text-gray-600 text-center max-w-sm">
            You don’t have any appointments scheduled yet. Once patients book a
            slot, they will appear here.
          </p>
        </div>
      ) : (
        <h2 className="bg-linear-to-r from-amber-500 to-amber-600 bg-clip-text text-transparent font-semibold text-3xl mb-6">
          Scheduled Appointments
        </h2>
      )}

      <div className="space-y-4">
        {bookings.map((booking) => (
          <div
            key={booking._id}
            className="border-2 border-amber-200 rounded-lg p-4 shadow-md hover:border-amber-300 hover:shadow-xl transition-all duration-200 hover:scale-[1.03]"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1 space-y-3">
                <div className="flex items-center gap-2 text-gray-700">
                  <div className="p-2 bg-amber-100 rounded-lg">
                    <Calendar className=" text-amber-500" size={20} />
                  </div>
                  <span className="font-medium">
                    {booking?.appointmentDate.split("T")[0]}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-gray-700">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <User className="text-amber-500" size={20} />
                  </div>
                  <span>{booking?.patientId?.fullName}</span>
                </div>

                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2 text-gray-700">
                    <div className="bg-red-100 rounded-lg p-2">
                      <Clock className="text-amber-500" size={20} />
                    </div>
                    <span>{booking?.slotTime}</span>
                  </div>

                  <div className="flex items-center gap-2 text-gray-700">
                    <div className="bg-blue-100 rounded-lg p-2">
                      <Hash className=" text-amber-500" size={20} />
                    </div>
                    <span className="font-semibold">
                      Token {booking?.tokenNumber}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-end gap-3 ">
                <span
                  className={`px-5 py-1.5 text-center rounded-md text-sm font-semibold ${
                    booking?.status === "completed"
                      ? "bg-green-100 text-green-700"
                      : booking?.status === "pending"
                      ? "bg-amber-200 text-red-600"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {booking?.status}
                </span>

                {booking?.status === "pending" && (
                  <button
                    onClick={() => handleCompleteAppointment(booking._id)}
                    className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 cursor-pointer text-white rounded-lg transition-colors duration-200 text-sm font-medium"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    Mark Complete
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScheduledAppointments;

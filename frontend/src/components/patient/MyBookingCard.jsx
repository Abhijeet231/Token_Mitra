import { cancelBooking } from "@/services/booking.service";
import { toast } from "react-toastify";
import { Calendar, Clock, Gift, XCircle, Ticket } from "lucide-react";

const statusConfig = {
  pending: {
    pill: "bg-amber-100 text-amber-800",
    accent: "from-amber-400 to-amber-600",
    icon: "bg-amber-50",
    iconColor: "text-amber-600",
  },
  completed: {
    pill: "bg-green-100 text-green-800",
    accent: "from-green-400 to-green-600",
    icon: "bg-green-50",
    iconColor: "text-green-600",
  },
  cancelled: {
    pill: "bg-red-100 text-red-800",
    accent: "from-red-400 to-red-500",
    icon: "bg-red-50",
    iconColor: "text-red-500",
  },
};

const MyBookingCard = ({ booking, onCancelBooking }) => {
  const handleCancelBooking = async () => {
    if (booking?.status === "cancelled") {
      toast.info("Booking Already Cancelled!");
      return;
    }
    try {
      await cancelBooking(booking._id);
      toast.success("Booking cancelled successfully.");
      onCancelBooking();
    } catch (error) {
      toast.error("Failed to cancel booking. Please try again.");
      console.error("Error cancelling booking:", error);
    }
  };

  const status = booking?.status ?? "pending";
  const cfg = statusConfig[status] ?? statusConfig.pending;
  const isCancelled = status === "cancelled";

  return (
    <div
      style={{ fontFamily: "'Geist', 'DM Sans', sans-serif" }}
      className="relative flex items-center gap-4 bg-white rounded-2xl px-5 py-4 shadow-sm ring-1 ring-black/5 hover:shadow-md transition-shadow duration-200 overflow-hidden"
    >
      {/* Left accent bar */}
      <div
        className={`absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl bg-linear-to-b ${cfg.accent}`}
      />

      {/* Calendar icon box */}
      <div
        className={`shrink-0 w-11 h-11 rounded-xl flex items-center justify-center ${cfg.icon}`}
      >
        <Calendar className={`w-5 h-5 ${cfg.iconColor}`} />
      </div>

      {/* Main info */}
      <div className="flex-1 min-w-0">
        <p className="text-[0.95rem] font-700 text-gray-900 font-bold leading-tight truncate">
          Dr. {booking?.doctorId?.fullName}
        </p>
        <div className="flex items-center flex-wrap gap-x-3 gap-y-1 mt-1.5">
          {/* Date */}
          <span className="flex items-center gap-1 text-[0.72rem] text-gray-400 font-medium">
            <Calendar className="w-3 h-3" />
            {booking?.appointmentDate?.split("T")[0]}
          </span>
          {/* Time */}
          <span className="flex items-center gap-1 text-[0.72rem] text-gray-400 font-medium">
            <Clock className="w-3 h-3" />
            {booking?.slotTime}
          </span>
          {/* Token */}
          <span className="flex items-center gap-1 text-[0.72rem] text-amber-600 font-700 font-bold">
            <Ticket className="w-3 h-3" />
            Token #{booking?.tokenNumber}
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 shrink-0">
        {/* Status pill */}
        <span
          className={`text-[0.7rem] font-bold tracking-wide uppercase px-3 py-1 rounded-full ${cfg.pill}`}
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>

        {/* Cancel button — only shown when not cancelled/completed */}
        {!isCancelled && status !== "completed" && (
          <button
            onClick={handleCancelBooking}
            className="flex items-center gap-1.5 text-[0.72rem] font-semibold text-red-500 transition-colors duration-150 cursor-pointer hover:text-red-800"
          >
            <XCircle className="w-4 h-4" />
            Cancel
          </button>
        )}
      </div>
    </div>
  );
};

export default MyBookingCard;

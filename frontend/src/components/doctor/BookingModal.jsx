import {X, CalendarDays, Stethoscope} from "lucide-react"
import { useState } from "react"



const BookingModal = (
  {
    isOpen,
    onClose,
    slot,
    doctor,
    onSubmit
  }
) => {

  const [issue, setIssue] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if(!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!issue.trim()) {
      return;
    }

    setIsSubmitting(true);

    try {
      await onSubmit(slot._id, issue);
      setIssue("");
    } catch (error) {
      console.log("Booking Error:", error)
    }finally{
      setIsSubmitting(false);
    }
  }

  const handleClose = () => {
    setIssue("");
    onClose();
  }

  return (
    <div>
       <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="bg-linear-to-r from-amber-500 to-orange-500 p-6 rounded-t-2xl relative">
          <button 
            onClick={handleClose}
            className="absolute top-4 right-4 text-white hover:bg-white/20 rounded-full p-1 transition-colors"
          >
            <X size={24} />
          </button>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Stethoscope size={28} />
            Book Appointment
          </h2>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {/* Slot Details */}
          <div className="bg-amber-50 rounded-xl p-4 mb-6 border border-amber-200">
            <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <CalendarDays size={18} className="text-amber-600" />
              Appointment Details
            </h3>
            <div className="space-y-2 text-sm">
              <p className="text-gray-700">
                <span className="font-semibold">Date:</span> {slot?.date?.split("T")[0]}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Time:</span> {slot?.startTime} - {slot?.endTime}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Doctor:</span> Dr. {doctor?.userId?.fullName}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Duration:</span> {doctor?.slotDuration} minutes
              </p>
            </div>
          </div>

          {/* Health Issue Form */}
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label 
                htmlFor="issue" 
                className="block text-sm font-semibold text-gray-800 mb-2"
              >
                Describe your health concern <span className="text-red-500">*</span>
              </label>
              <textarea
                id="issue"
                value={issue}
                onChange={(e) => setIssue(e.target.value)}
                placeholder="Please describe your symptoms, concerns, or reason for visit..."
                rows={5}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none resize-none text-gray-800"
                required
              />
              <p className="text-xs text-gray-500 mt-2">
                This information helps the doctor prepare for your consultation
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleClose}
                disabled={isSubmitting}
                className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`flex-1 px-4 py-3 font-semibold rounded-lg transition-all ${
                  isSubmitting
                    ? 'bg-gray-400 cursor-not-allowed text-gray-200'
                    : 'bg-linear-to-r from-amber-500 to-orange-500 text-white hover:from-amber-600 hover:to-orange-600 shadow-md hover:shadow-lg'
                }`}
              >
                {isSubmitting ? 'Booking...' : 'Confirm Booking'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    </div>
  )
}

export default BookingModal
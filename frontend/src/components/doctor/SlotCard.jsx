import { Clock, Users, CalendarDays, Timer, Plus} from "lucide-react";

const SlotCard = ({slot, doctor, onBookClick}) => {
  return (
    <div>
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
              <button 
                onClick={() => onBookClick(slot)}
              className="w-full bg-linear-to-r from-amber-500 to-orange-500 text-white py-3 rounded-xl font-bold hover:from-amber-600 hover:to-orange-600 cursor-pointer transition-all duration-200 mt-2 shadow-md hover:shadow-lg active:scale-95">
                Book Slot
              </button>
            </div>
          </div>
    </div>
  )
}

export default SlotCard
import { useState, useEffect } from "react"
import { getMyAvailability } from "@/services/docAvailability";
import { toast } from "react-toastify";
import { Calendar, Clock, Users, UserCheck } from "lucide-react";


const AvailableSlots = () => {
const [slots, setSlots] = useState([]);

useEffect(() => {
   const getDoctorSlots = async() => {
    try {
        const res = await getMyAvailability();
        setSlots(res.data.data)
        console.log("Docs Availability:", res)
    } catch (error) {
        toast.error("Error While Fetching Doctors Availability SLots")
        console.log("Error While Fetching Slots for Doctor:", error)
    }
   }
   getDoctorSlots();
}, [])

  return (
    <div><h2>MY SLots:</h2>
     {slots.map ((el) => 
        



// ... in your component

<div key={el._id} className="mb-4"> 
  <div className="border-2 border-amber-400 p-4 rounded-xl shadow-md hover:shadow-xl transition-all duration-200 hover:border-amber-500  hover:scale-[1.03] hover:border-3">
    
    {/* Date */}
    <div className="flex items-center gap-3 mb-3 pb-3 border-b border-amber-200">
      <div className="p-2 bg-amber-100 rounded-lg">
        <Calendar className="text-amber-600" size={20} />
      </div>
      <div>
        <p className="text-xs text-gray-600 font-medium">Date</p>
        <p className="text-base font-bold text-gray-800">{el?.date.split("T")[0]}</p>
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
        <p className="text-xs text-gray-600 font-medium mb-2">Patient Capacity</p>
        
        {/* Stats */}
        <div className="flex items-center gap-4 mb-2">
          <div className="flex items-center gap-2">
            <UserCheck className="text-green-600" size={16} />
            <span className="text-sm font-bold text-green-700">{el?.bookedPatientCount} Booked</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="text-amber-600" size={16} />
            <span className="text-sm font-bold text-amber-700">{el?.maxPatients} Available Slots</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className="bg-linear-to-r from-green-500 to-green-600 h-2.5 rounded-full transition-all duration-300"
            style={{ width: `${(el?.bookedPatientCount / el?.maxPatients) * 100}%` }}
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
    )}
    
    </div>

  )
}

export default AvailableSlots
import { useState, useEffect } from "react"
import { getMyAvailability } from "@/services/docAvailability";
import { toast } from "react-toastify";


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
          <div key={el._id}>
           MaxPatient: {el?.maxPatients}
           Is Active: {el?.isActive}
          </div>
    )}
    </div>

  )
}

export default AvailableSlots
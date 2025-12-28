import { useState, useEffect } from "react";
import { createBooking } from "@/services/booking.service";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Calendar from "@/components/doctor/Calendar";


const PatientBookings = () => {

  const navigate = useNavigate();

  const [appointmentDate, setAppointmentDate] = useState(null);
  const [slotTime, setSlotTime] = useState("");
  const [issue, setIssue] = useState("")
  const [loading, setLoading] = useState(true);

  // Reset Form function
  const resetForm = () => {
    setAppointmentDate(null)
    setSlotTime("")
    setIssue("")
  }

  // handleSubmit function
  const handleSubmit = async(e) => {
    e.preventDefault()

    if(!appointmentDate){
      toast.error("Please select appointment Date")
      return
    }

    if(!slotTime) {
      toast.error("Slot time is required!")
      return
    }

    if(!setIssue) {
      toast.error("Please tell us about your issue!");
      return
    }

    const payload = {
      appointmentDate: appointmentDate.toISOString(),
      slotTime,
      issue
    }
    
    console.log("Booking payload", payload)

    try {
      await createBooking(payload);
      toast.success("Booking Created Successfully.")
      resetForm();
      navigate("/patient/profile")
    } catch (error) {
      toast.error("Error While Booking a slot !")
      console.log("Error While Booking a slot :", error)
    }finally{
      setLoading(false)
    }

  }

  return (
    <div>
     
    </div>
  )
}

export default PatientBookings;
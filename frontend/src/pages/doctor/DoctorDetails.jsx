import { useState, useEffect } from "react"
import { toast } from "react-toastify"
import { useParams } from "react-router-dom"
import { getSpecificDoctor } from "@/services/doctor.service.js"

const DoctorDetails = () => {
  const {id} = useParams();
  
 const [ doctor, setDoctor] = useState(null);

 // Fetching Specific Doctor
 useEffect(() => {
  const getDoctorDetails = async() => {
    try {
      const res = await getSpecificDoctor(id);
      console.log("SPecific Doctor is : ", res.data.data)
      setDoctor(res.data.data)
    } catch (error) {
      toast.error("Failed to fetch doctor details")
      console.log("Failed to fetch doctor detils:", error)
    }
  }

 if(id) getDoctorDetails() ;
 }, [id]);

 // Fetching all Available SLots for the doctor
 


  return (
    <div>
      Doctor name is : {doctor?.userId?.fullName}
    </div>
  )
}

export default DoctorDetails
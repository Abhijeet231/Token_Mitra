import React from 'react'
import { getPatientDetails } from '@/services/patient.service'
import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'



const PatientProfile = () => {

  const navigate = useNavigate();

  const [patient, setPatient] = useState(null);

useEffect(() => {

  const fetchPatient = async () => {
    try {
      const res = await getPatientDetails();

      console.log("Response of PatientProfile:", res)

      if (res.data.needsProfile) {
         navigate("/patient/profile/complete", {replace: true});
         return;
      }

        setPatient(res.data.data);
      
    } catch{
      console.log("Error wile fetching Patient details")
    }
  };

  fetchPatient();
}, []);


  return (
    <div className='flex  justify-center w-full border border-red-600 mt-8'>
      
      <div className='flex flex-col justify-center mt-9 border border-r-black p-3
       w-[80%] text-center '>
        <h2>Patient Profile rounded
        </h2>

        <div className='text-xl font-semibold'>
          <p>FullName: {patient?.userId.fullName} </p>
          <p>Email: {patient?.userId.email} </p>
          <p>Age: {patient?.age} </p>
          <p>Gender: {patient?.gender}</p>

        </div>


      </div>
    </div>
  )
}

export default PatientProfile
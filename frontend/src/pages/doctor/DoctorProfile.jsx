import React from "react";
import { useEffect, useState } from "react";
import { getLoggedInDoctor } from "@/services/doctor.service";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";


const DoctorProfile = () => {
  const navigate = useNavigate();

  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetching doctors profile
  useEffect(() => {
    let getDoc = async () => {
      try {
        const res = await getLoggedInDoctor();
        if (res.data.needsProfile) {
          navigate("/doctor/profile/edit", { replace: true });
          toast.info("Complete Your Profile!")
          return;
        }
        setDoctor(res.data.data);
        console.log("DOc Data in Profile:", res.data.data)
      } catch (error) {
        toast.error("Failed to load profile");
        console.log("Doctor Profile Error:", error);
      } finally {
        setLoading(false);
      }
    };

    getDoc();
  }, [navigate]);

  if(loading) {
    return (
       <div className="min-h-screen flex items-center justify-center">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* Profile Card*/}
      <div className="bg-purple-50 rounded-2xl shadow-lg p-8 text-center border border-gray-200">
        {/* Profile Image*/}
        <div className="flex justify-center mb-6">
          <div className="w-28 h-28 rounded-full bg-gradient-to-r from-blue-400 to bg-purple-500 flex items-center justify-center text-4xl text-white shadow-md">
                {
                  doctor?.profileImage?.url ? <img src= {doctor?.profileImage?.url} alt="ProfileImgae" className="w-full h-full object-cover rounded-full"/> : doctor?.userId?.fullName.charAt(0) || "U"
                }
          </div>
        </div>

{/* Welcome text*/}
<h1 
 className="text-3xl font-bold mb-2 text-gray-800"
>Welcome, {doctor?.userId?.fullName || "USer"} </h1>

{/* User Info*/}
 <div className="text-center space-y-2 max-w-md mx-auto text-gray-700">
  <p>
    <span className="font-semibold">User Name: </span> {" "}
    {doctor?.userId?.fullName}
  </p>

  <p>
    <span className="font-semibold">Email:</span> {" "}
    {doctor?.userId?.email}
  </p>

  <p>
    <span className="font-semibold">Specialization:</span> {" "}
    {doctor?.specialization}
  </p>

  <p>
    <span className="font-semibold">Experience:</span> {" "}
    {doctor?.experience}
  </p>

  <p>
    <span className="font-semibold">Qualification:</span> {" "}
    {doctor?.qualification}
  </p>

  <p>
    <span className="font-semibold">Slot Duration:</span> {" "}
    {doctor?.slotDuration}
  </p>

  <p>
    <span className="font-semibold">Clinic Address:</span> {" "}
    {doctor?.clinicAddress}
  </p>

 </div>

 {/* Buttons*/}
 <div className="flex justify-center gap-4 mt-8">
 <Link to='/doctor/profile/edit' className="flex items-center gap-2 px-5 py-2 rounded-lg bg-green-500 text-white font-medium shadow-md hover:bg-green-600 transition cursor-pointer"> 
 Edit Profile
 </Link>

 <button className="flex items-center gap-2 px-5 py-2 rounded-lg bg-red-500 text-white font-medium shadow-md hover:bg-red-600 transition cursor-pointer">
  Delete Profile
 </button>

 </div>


  </div >
    
            
    </div>
  );
};

export default DoctorProfile;


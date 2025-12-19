import React from "react";
import { useEffect, useState } from "react";
import { getLoggedInDoctor } from "@/services/doctor.service";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

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
    <div>
      <div>
        <h2>Doctors Profile</h2>
        <img />
      </div>
    </div>
  );
};

export default DoctorProfile;

// specialization;
// qualification;
// experience;
// clinicAddress;
// slotDuration;
// profileImage;

import React, { useEffect, useState } from "react";
import { getPatientDetails } from "@/services/patient.service";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { CalendarDays, UserCircle } from "lucide-react";

const PatientProfile = () => {
  const navigate = useNavigate();

  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const res = await getPatientDetails();

        if (res.data.needsProfile) {
          navigate("/patient/profile/complete", { replace: true });
          return;
        }

        setPatient(res.data.data);
      } catch (error) {
        toast.error("Failed to load profile");
        console.error("Patient profile error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPatient();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-amber-50 via-orange-50 to-amber-50 px-4 py-10">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-amber-100 p-8 flex flex-col items-center text-center">
          <UserCircle className="w-20 h-20 text-amber-600 mb-4" />

          <h2 className="text-2xl font-bold text-gray-900">
            {patient.userId.fullName}
          </h2>
          <p className="text-gray-600">{patient.userId.email}</p>

          <div className="mt-6 grid grid-cols-2 gap-6 text-sm text-gray-700">
            <div>
              <p className="font-medium">Age</p>
              <p>{patient.age}</p>
            </div>
            <div>
              <p className="font-medium">Gender</p>
              <p className="capitalize">{patient.gender}</p>
            </div>
          </div>

          <div>
            <button
              className="mt-3 px-6 py-2.5 font-semibold rounded-lg bg-linear-to-r from-amber-500 to-orange-500 text-white cursor-pointer m-3
  hover:from-amber-600 hover:to-orange-600 transition-all shadow-md hover:shadow-lg transform hover:scale-105"
              onClick={() => navigate("/patient/profile/complete")}
            >
              Edit
            </button>

            <button
              className="mt-3 px-6 py-2.5 font-semibold rounded-lg bg-white text-amber-600 cursor-pointer border-2 border-amber-200
  hover:bg-amber-50 hover:border-amber-400 transition-all shadow-md hover:shadow-lg transform hover:scale-105"
            >
              Delete
            </button>
          </div>
        </div>

        {/* Bookings Section */}
        <div className="bg-white rounded-2xl shadow-lg border border-amber-100 p-8">
          <div className="flex items-center gap-2 mb-4">
            <CalendarDays className="w-5 h-5 text-amber-600" />
            <h3 className="text-lg font-semibold text-gray-900">My Bookings</h3>
          </div>

          {/* Empty state for now */}
          <div className="text-center text-gray-600 py-8">
            <p>You don't have any bookings yet.</p>
            <button
              onClick={() => navigate("/patient")}
              className="mt-4 px-6 py-2 rounded-lg bg-amber-600 text-white font-medium
                         hover:bg-amber-700 transition"
            >
              Book an Appointment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientProfile;

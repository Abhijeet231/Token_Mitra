import { useCallback, useEffect, useState } from "react";
import { getPatientDetails } from "@/services/patient.service.js";
import { getBookingsForPatient } from "@/services/booking.service.js";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { CalendarDays, LoaderCircle } from "lucide-react";
import MyBookingCard from "@/components/patient/MyBookingCard.jsx";
import { deletePatientProfile } from "@/services/patient.service.js";
import PatientProfileDashboard from "@/components/patient/PatientProfileDashboard.jsx";

import CtaPatientProfile from "@/components/patient/CtaPatientProfile.jsx";

const PatientProfile = () => {
  const navigate = useNavigate();

  const [patient, setPatient] = useState(null);
  const [booking, setBookings] = useState([]);

  // Fetcing patient details
  const fetchPatientData = useCallback(async () => {
    const res = await getPatientDetails();
    setPatient(res.data?.data);
  }, []);

  // Delete Patient Profile
  const handleDeleteProfile = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete your profile?",
    );

    if (!confirmed) return;

    try {
      await deletePatientProfile();
      toast.success("Profile deleted successfully");
      navigate("/"); // Redirect to home or login page after deletion
    } catch (error) {
      toast.error("Failed to delete profile");
    }
  };

  // Get Bookings for Patient
  const getBookings = useCallback(async () => {
    const res = await getBookingsForPatient();
    setBookings(res.data.data);
    console.log("ACtive Booking for patinet:", res.data.data);
  }, []);

  // Handle Edit Profile
  const handleEditProfile = () => {
    navigate("/patient/profile/edit");
  };

  // Navigating to Booking page
  const bookNewAppointment = () => {
    navigate("/patient");
  };

  useEffect(() => {
    fetchPatientData();
    getBookings();
  }, [fetchPatientData, getBookings]);

  return (
    <div className="m-3 p-4">
      {/* HEADER SECTION*/}
      <section className="mt-5">
        <h1 className="text-gray-700 font-bold text-6xl">
          Manage Personal Details
        </h1>
        <p className="text-gray-500 mt-2">
          Manage Your personal detials and upcoming bookings.
        </p>
      </section>

      {/* MAIN GRID LAYOUT*/}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-10">
        {/* LEFT SIDE */}
        <div className="lg:col-span-4 space-y-6 ">
          <PatientProfileDashboard
            patientData={patient}
            onDeleteProfile={handleDeleteProfile}
            onEditProfile={handleEditProfile}
          />

          {/* MEMBER STATUS */}
          <div className="bg-gray-100 p-5 rounded-xl shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">
              Member Status
            </h2>

            <div className="flex items-center gap-2">
              {/* Blinking Dot */}
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-600 opacity-80"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
              </span>

              {/* Text */}
              <p className="text-gray-600 text-sm">Standard User Access</p>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE*/}
        <div className="lg:col-span-8 space-y-6">
          {/* Head section*/}
          <section className="flex  justify-between items-center mt-4">
            <h2 className="text-black text-3xl font-semibold">My Bookings</h2>
            <div className="bg-gray-100 px-2 py-1 rounded-md text-gray-950">
              {booking.length === 0 ? (
                <p>No Active Booking.</p>
              ) : (
                <div className="flex items-center justify-between">
                  <p className="text-gray-600 text-md">Lifetime Bookings</p>
                  <span className="font-semibold text-md">
                    {" "}
                    &nbsp;{booking.length}
                  </span>
                </div>
              )}
            </div>
          </section>

          <section>
            {booking.map((el) => (
              <MyBookingCard
                booking={el}
                key={el._id}
                onCancelBooking={getBookings}
              />
            ))}
          </section>

          <section>
            <CtaPatientProfile bookNewAppointment={bookNewAppointment} />
          </section>
        </div>
      </div>
    </div>
  );
};

export default PatientProfile;

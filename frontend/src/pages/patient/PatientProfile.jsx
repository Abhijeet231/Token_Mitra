import React, { useCallback, useEffect, useState } from "react";
import { getPatientDetails } from "@/services/patient.service.js";
import { getBookingsForPatient } from "@/services/booking.service.js";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {  CalendarDays, LoaderCircle  } from "lucide-react";
import MyBookingCard from "@/components/patient/MyBookingCard.jsx";
import { deletePatientProfile } from "@/services/patient.service.js";

const PatientProfile = () => {
  const navigate = useNavigate();

  const [patient, setPatient] = useState(null);
  const [myBookings, setMyBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadBooking, setLoadBooking] = useState(false);

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const res = await getPatientDetails();

        if (res.data?.needsProfile) {
          navigate("/patient/profile/complete", { replace: true });
          return;
        }

        setPatient(res.data?.data);
      } catch (error) {
        toast.error("Failed to load profile");
        console.error("Patient profile error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPatient();
  }, [navigate]);

  const handleDeleteButton = async() => {
    try {
       if(!window.confirm("This will permanently delete your account!")){
        return;
       }
       await deletePatientProfile();
       window.location.href ="/";
    } catch (error) {
      toast.error("Error while deleting User Profile")
      console.log("Error while deleting user profile", error)
    }
  }

  const getMyBookings = useCallback(async () => {
    try {
      setLoadBooking(true);
      let res = await getBookingsForPatient();
      setMyBookings(res.data?.data);
      console.log("My Bookings with Doctors:", res.data);
    } catch (error) {
      console.log("Error while fetching patient bookings with doctors:", error);
    } finally {
      setLoadBooking(false);
    }
  }, []);

  useEffect(() => {
    getMyBookings();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
  <h3 className="text-center font-semibold text-2xl text-gray-700 animate-pulse">
    Loading...
  </h3>

  <LoaderCircle className="w-10 h-10 text-amber-500 animate-spin" />
</div>
    );
  }

  const firstLetter = patient?.userId?.fullName?.charAt(0)?.toUpperCase();

  return (
   <div className="min-h-screen bg-linear-to-br from-amber-50 via-white to-orange-50 px-4 py-12">
  <div className="max-w-4xl mx-auto space-y-8">
    {/* Profile Card */}
    <div className="bg-white border border-amber-100 rounded-3xl shadow-xl p-10 text-center hover:shadow-2xl transition-all duration-300">
      {/* Profile Image */}
      <div className="flex justify-center mb-8">
        <div className="w-32 h-32 rounded-full bg-linear-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg ring-4 ring-white">
          <span className="text-5xl font-bold text-white">
            {firstLetter}
          </span>
        </div>
      </div>

      {/* Welcome text */}
      <h1 className="text-4xl font-bold mb-3 bg-linear-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
        Welcome, {patient?.userId?.fullName}
      </h1>

      {/* User Info */}
      <div className="text-center space-y-3 max-w-lg mx-auto mt-8">
        <div className="flex items-center justify-between py-3 px-6 bg-gray-50 rounded-xl">
          <span className="font-semibold text-gray-600">Full Name</span>
          <span className="text-gray-900">{patient?.userId?.fullName}</span>
        </div>

        <div className="flex items-center justify-between py-3 px-6 bg-gray-50 rounded-xl">
          <span className="font-semibold text-gray-600">Email</span>
          <span className="text-gray-900">{patient?.userId?.email}</span>
        </div>

        <div className="flex items-center justify-between py-3 px-6 bg-gray-50 rounded-xl">
          <span className="font-semibold text-gray-600">Age</span>
          <span className="text-gray-900">{patient?.age}</span>
        </div>

        <div className="flex items-center justify-between py-3 px-6 bg-gray-50 rounded-xl">
          <span className="font-semibold text-gray-600">Gender</span>
          <span className="text-gray-900 capitalize">{patient?.gender}</span>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-center gap-4 mt-10">
        <button
          onClick={() => navigate("/patient/profile/edit")}
          className="px-8 py-3 rounded-xl text-white bg-linear-to-r from-amber-500 to-orange-500 font-semibold shadow-lg hover:shadow-xl hover:from-amber-600 hover:to-orange-600 transition-all duration-200"
        >
          Edit Profile
        </button>

        <button
        onClick={handleDeleteButton}
          className="px-8 py-3 rounded-xl text-red-600 bg-red-50 border-2 border-red-200 font-semibold shadow-md hover:bg-red-100 hover:border-red-300 hover:shadow-lg transition-all duration-200"
        >
          Delete Account
        </button>
      </div>
    </div>

    {/* Bookings Section */}
    {myBookings.length === 0 ? (
      <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-10">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 bg-amber-100 rounded-lg">
            <CalendarDays className="w-6 h-6 text-amber-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">
            My Bookings
          </h3>
        </div>

        {/* Empty state */}
        <div className="text-center py-16">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-linear-to-br from-amber-100 to-orange-100 mb-6">
            <CalendarDays className="w-10 h-10 text-amber-600" />
          </div>
          <p className="text-gray-600 text-lg mb-6">
            You don't have any bookings yet.
          </p>
          <button
            onClick={() => navigate("/patient")}
            className="px-8 py-3 rounded-xl bg-linear-to-r from-amber-500 to-orange-500 text-white font-semibold shadow-lg hover:shadow-xl hover:from-amber-600 hover:to-orange-600 transition-all duration-200"
          >
            Book an Appointment
          </button>
        </div>
      </div>
    ) : (
      <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-10">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 bg-amber-100 rounded-lg">
            <CalendarDays className="w-6 h-6 text-amber-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">
            My Bookings
          </h3>
        </div>

        <div className="space-y-4">
          {myBookings.map((booking) => (
            <MyBookingCard 
              onCancelBooking={getMyBookings}
              booking={booking} 
              key={booking._id}
            />
          ))}
        </div>
      </div>
    )}
  </div>
</div>
  );
};

export default PatientProfile;

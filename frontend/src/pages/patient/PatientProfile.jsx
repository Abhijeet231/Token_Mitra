import React, { useCallback, useEffect, useState } from "react";
import { getPatientDetails } from "@/services/patient.service";
import { getBookingsForPatient } from "@/services/booking.service";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {  CalendarDays, LoaderCircle  } from "lucide-react";
import MyBookingCard from "@/components/patient/MyBookingCard";

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

  const getMyBookings = useCallback(async () => {
    try {
      setLoadBooking(true);
      let res = await getBookingsForPatient();
      setMyBookings(res.data.data);
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

  const firstLetter = patient.userId.fullName.charAt(0).toUpperCase();

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Profile Card */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border-2 border-amber-200  hover:shadow-xl">
          <div className="bg-linear-to-r from-amber-500/70 to-orange-500/70 h-24"></div>

          <div className="px-8 pb-8">
            <div className="flex flex-col items-center -mt-12">
              {/* Profile Image with First Letter */}
              <div className="w-24 h-24 rounded-full bg-white shadow-lg flex items-center justify-center border-4 border-white">
                <span className="text-4xl font-bold text-amber-600">
                  {firstLetter}
                </span>
              </div>

              <h2 className="mt-4 text-2xl font-semibold text-gray-900">
                {patient.userId.fullName}
              </h2>
              <p className="text-gray-500 text-sm mt-1">
                {patient.userId.email}
              </p>

              <div className="mt-6 flex gap-12 text-center">
                <div>
                  <p className="text-xs uppercase tracking-wide text-gray-500 font-medium">
                    Age
                  </p>
                  <p className="mt-1 text-lg font-semibold text-gray-900">
                    {patient.age}
                  </p>
                </div>
                <div className="border-l border-gray-200"></div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-gray-500 font-medium">
                    Gender
                  </p>
                  <p className="mt-1 text-lg font-semibold text-gray-900 capitalize">
                    {patient.gender}
                  </p>
                </div>
              </div>

              <div className="mt-8 flex gap-3">
                <button
                  className="px-6 py-2.5 font-medium rounded-lg bg-linear-to-r from-amber-500 to-orange-500 text-white
                    hover:from-amber-600 hover:to-orange-600 transition-all shadow-sm hover:shadow"
                  onClick={() => navigate("/patient/profile/edit")}
                >
                  Edit Profile
                </button>

                <button
                  className="px-6 py-2.5 font-medium rounded-lg bg-white text-gray-700 border border-gray-300
                    hover:bg-gray-50 hover:border-gray-400 transition-all shadow-sm"
                >
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bookings Section */}
        {myBookings.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <div className="flex items-center gap-2 mb-6">
              <CalendarDays className="w-5 h-5 text-amber-600" />
              <h3 className="text-lg font-semibold text-gray-900">
                My Bookings
              </h3>
            </div>

            {/* Empty state */}
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                <CalendarDays className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-600 mb-4">
                You don't have any bookings yet.
              </p>
              <button
                onClick={() => navigate("/patient")}
                className="px-6 py-2.5 rounded-lg bg-amber-600 text-white font-medium
                hover:bg-amber-700 transition shadow-sm hover:shadow"
              >
                Book an Appointment
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <div className="flex items-center gap-2 mb-6">
              <CalendarDays className="w-5 h-5 text-amber-600" />
              <h3 className="text-lg font-semibold text-gray-900">
                My Bookings
              </h3>
            </div>

            {myBookings.map((booking) => (
              <MyBookingCard booking = {booking} key={booking._id}/>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientProfile;

import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "@/App";
import { lazy } from "react";



// Route guards
import ProtectedRoute from "./ProtectedRoute.jsx";
import PatientRoute from "./PatientRoute.jsx";
import DoctorRoute from "./DoctorRoute.jsx";

// Pages
import Landing from "@/pages/Landing.jsx";
import Login from "@/pages/Login.jsx";
import Register from "@/pages/Register.jsx";

import About from "@/pages/About.jsx";

import PatientHome from "@/pages/patient/PatientHome.jsx";
import PatientProfile from "@/pages/patient/PatientProfile.jsx";
import PatientBookings from "@/pages/patient/PatientBookings.jsx";
import PatientProfileComplete from "@/pages/patient/PatientProfileComplete.jsx";

import DoctorDashboard from "@/pages/doctor/DoctorDashboard.jsx";

const DoctorProfile = lazy(() => import("@/pages/doctor/DoctorProfile.jsx"));
const ScheduledAppointments = lazy(() =>
  import("@/pages/doctor/ScheduledAppointments.jsx")
);
const AvailabilityForm = lazy(() =>
  import("@/pages/doctor/dashboard/AvailabilityForm.jsx")
);
const AvailableSlots = lazy(() => import("@/pages/doctor/AvailableSlots.jsx"));
import DoctorDetails from "@/pages/doctor/DoctorDetails.jsx";

import Unauthorized from "@/pages/Unauthorized.jsx";
import NotFound from "@/pages/NotFound.jsx";
import EditDoctorProfile from "@/pages/doctor/EditDoctorProfile.jsx";
import CreateDoctorProfile from "@/pages/doctor/CreateDoctorProfile.jsx";
import EditPatientProfile from "@/pages/patient/EditPatientProfile.jsx";
import Contact from "@/pages/Contact.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // layout
    children: [
      //  Public
      { index: true, element: <Landing /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
      { path: "doctors/:id", element: <DoctorDetails /> },

      // Protected Routes
      {
        element: <ProtectedRoute />,
        children: [
          // .....................PATIENT ONLY .....................
          {
            element: <PatientRoute />,
            children: [
              { path: "patient", element: <PatientHome /> },
              { path: "patient/profile", element: <PatientProfile /> },
              { path: "patient/booking", element: <PatientBookings /> },
              {
                path: "patient/profile/complete",
                element: <PatientProfileComplete />,
              },
              { path: "patient/profile/edit", element: <EditPatientProfile /> },
            ],
          },

          // ..............DOCTOR ONLY................................
          {
            element: <DoctorRoute />,
            children: [
              {
                path: "doctors",
                element: <DoctorDashboard />,
                children: [
                  { path: "profile", element: <DoctorProfile /> },
                  { path: "open-bookings", element: <AvailabilityForm /> },
                  {
                    path: "scheduled-apppointments",
                    element: <ScheduledAppointments />,
                  },
                  { path: "mySlots", element: <AvailableSlots /> },
                ],
              },
              // Separate doctor routes (outside dashboard)
              {
                path: "doctors/profile/create",
                element: <CreateDoctorProfile />,
              },

              { path: "doctors/profile/edit", element: <EditDoctorProfile /> },
            ],
          },
        ],
      },

      { path: "unauthorized", element: <Unauthorized /> },

      // fallback
      { path: "*", element: <NotFound /> },
    ],
  },
]);

export default router;

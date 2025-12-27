import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "@/App";

// Route guards
import ProtectedRoute from "./ProtectedRoute";
import PatientRoute from "./PatientRoute";
import DoctorRoute from "./DoctorRoute";

// Pages
import Landing from "@/pages/Landing";
import Login from "@/pages/Login";
import Register from "@/pages/Register";

import PatientHome from "@/pages/patient/PatientHome";
import PatientProfile from "@/pages/patient/PatientProfile";
import PatientBookings from "@/pages/patient/PatientBookings";
import PatientProfileComplete from "@/pages/patient/PatientProfileComplete";

import DoctorDashboard from "@/pages/doctor/DoctorDashboard";
import DoctorProfile from "@/pages/doctor/DoctorProfile";
import DoctorDetails from "@/pages/doctor/DoctorDetails";

import Unauthorized from "@/pages/Unauthorized ";
import NotFound from "@/pages/NotFound";
import EditDoctorProfile from "@/pages/doctor/EditDoctorProfile";
import CreateDoctorProfile from "@/pages/doctor/CreateDoctorProfile";
import AvailabilityForm from "@/pages/doctor/dashboard/AvailabilityForm";
import ScheduledAppointments from "@/pages/doctor/ScheduledAppointments";
import AvailableSlots from "@/pages/doctor/AvailableSlots";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // layout
    children: [
      //  Public
      { index: true, element: <Landing /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "doctors/:id", element: <DoctorDetails /> },

      // Protected Routes
      {
        element: <ProtectedRoute />,
        children: [
          { path: "patient", element: <PatientHome /> },
          { path: "patient/profile", element: <PatientProfile /> },
          { path: "patient/booking", element: <PatientBookings /> },
           {
            path: "patient/profile/complete",
            element: <PatientProfileComplete />,
          },

          // Doctor Dashboard with nested routes
           {
            path: "doctors",
            element: <DoctorDashboard />,
            children: [
              { path: "profile", element: <DoctorProfile /> },
              { path: "open-bookings", element: <AvailabilityForm /> },
              { path: "scheduled-apppointments", element: <ScheduledAppointments /> },
              { path: "mySlots", element: <AvailableSlots /> },
            ],
          },


         // Separate doctor routes (outside dashboard)
          { path: "doctors/profile/create", element: <CreateDoctorProfile /> },
        
          { path: "doctors/profile/edit", element: <EditDoctorProfile /> },

          


         
        ],
      },

      { path: "unauthorized", element: <Unauthorized /> },

      // fallback
      { path: "*", element: <NotFound /> },
    ],
  },
]);

export default router;

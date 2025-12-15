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

import DoctorDashboard from "@/pages/doctor/DoctorDashboard";
import DoctorProfile from "@/pages/doctor/DoctorProfile";
import DoctorDetails from "@/pages/doctor/DoctorDetails";

import Unauthorized from "@/pages/Unauthorized ";
import NotFound from "@/pages/NotFound";

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

      //  Patient
      {
        element: <PatientRoute />,
        children: [
          { path: "patient", element: <PatientHome /> },
          { path: "patient/profile", element: <PatientProfile /> },
          { path: "patient/booking", element: <PatientBookings /> },
        ],
      },

      //  Doctor
      {
        element: <DoctorRoute />,
        children: [
          { path: "doctors/dashboard", element: <DoctorDashboard /> },
          { path: "doctors/profile", element: <DoctorProfile /> },
        ],
      },

      { path: "unauthorized", element: <Unauthorized /> },

      // fallback
      { path: "*", element: <NotFound/> },
    ],
  },
]);

export default router;

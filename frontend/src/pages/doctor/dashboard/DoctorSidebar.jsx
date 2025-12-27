import { NavLink } from "react-router-dom";
import { User, CalendarDays, Clock, Users } from "lucide-react";

const navItems = [
  { to: "/doctors/profile", label: "Your Profile", icon: User },
  { to: "/doctors/open-bookings", label: "Open Bookings", icon: CalendarDays },
  { to: "/doctors/scheduled-apppointments", label: "Scheduled Appointments", icon: Users },
  { to: "/doctors/mySlots", label: "My Available Slots", icon: Clock },
];

const DoctorSidebar = () => {
  return (
    <nav className="p-4 space-y-2">
      {navItems.map(({ to, label, icon: Icon }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition
             ${isActive ? "bg-blue-50 text-black" : "text-gray-700 hover:bg-pink-50"}`
          }
        >
          <Icon size={18} />
          {label}
        </NavLink>
      ))}
    </nav>
  );
};

export default DoctorSidebar;

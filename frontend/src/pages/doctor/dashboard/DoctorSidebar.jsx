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
    <nav className="p-6 space-y-3">
      {navItems.map(({ to, label, icon: Icon }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 group
             ${
               isActive 
                 ? "bg-linear-to-r from-amber-100 to-orange-100 text-amber-900 shadow-md border-l-4 border-amber-500" 
                 : "text-gray-700 hover:bg-linear-to-r hover:from-amber-50 hover:to-orange-50 hover:text-amber-800 hover:shadow-sm hover:translate-x-1"
             }`
          }
        >
          <div className={`p-2 rounded-lg transition-all ${
            ({ isActive }) => isActive 
              ? "bg-amber-200/50" 
              : "bg-gray-100 group-hover:bg-amber-200/50"
          }`}>
            <Icon size={18} className="transition-transform group-hover:scale-110" />
          </div>
          {label}
        </NavLink>
      ))}
    </nav>
  );
};

export default DoctorSidebar;
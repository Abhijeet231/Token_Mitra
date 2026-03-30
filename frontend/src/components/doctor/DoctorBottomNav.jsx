import { NavLink } from "react-router-dom";
import { User, CalendarDays, Clock, Users } from "lucide-react";

const navItems = [
  { to: "/doctors/profile", label: "Profile", icon: User },
  { to: "/doctors/open-bookings", label: "Bookings", icon: CalendarDays },
  { to: "/doctors/scheduled-apppointments", label: "Schedules", icon: Users },
  { to: "/doctors/mySlots", label: "Slots", icon: Clock },
];

const DoctorBottomNav = () => {
  return (
    <div className="flex items-center justify-around px-2 py-2">
      {navItems.map(({ to, label, icon: Icon }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 px-3 py-2 rounded-xl text-xs font-medium transition-all
             ${isActive
               ? "bg-amber-50 text-amber-700"
               : "text-gray-500 hover:text-amber-600"
             }`
          }
        >
          {({ isActive }) => (
            <>
              <div className={`p-2 rounded-xl transition-all ${isActive ? "bg-amber-100" : ""}`}>
                <Icon size={20} />
              </div>
              <span>{label}</span>
            </>
          )}
        </NavLink>
      ))}
    </div>
  );
};

export default DoctorBottomNav;
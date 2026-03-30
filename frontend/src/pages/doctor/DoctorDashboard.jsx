import { Outlet } from "react-router-dom";
import DoctorSidebar from "./dashboard/DoctorSidebar.jsx";
import { Suspense } from "react";
import DoctorBottomNav from "@/components/doctor/DoctorBottomNav.jsx";

const DoctorDashboard = () => {
  return (
    <div className="flex flex-row min-h-screen">
      {/* Sidebar - Desktop only (lg+) */}
      <aside className="hidden lg:block w-[30%] max-w-xs bg-white border-r">
        <DoctorSidebar />
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto pb-24 lg:pb-6">
        <Suspense fallback={null}>
          <Outlet />
        </Suspense>
      </main>

      {/* Bottom Nav - Mobile only (< lg) */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t z-50">
        <DoctorBottomNav />
      </nav>
    </div>
  );
};

export default DoctorDashboard;

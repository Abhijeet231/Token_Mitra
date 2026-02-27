import { Outlet } from "react-router-dom";
import DoctorSidebar from "./dashboard/DoctorSidebar";
import { Suspense } from "react";
import DashboardSkeleton from "@/components/skeletons/doctorSkeleton/DashboardSkeleton";

const DoctorDashboard = () => {
  return (
    <div
      className=" flex flex-row 
    
     "
    >
      {/* Sidebar - 30% */}
      <aside className="w-[30%] max-w-xs bg-white border-r">
        <DoctorSidebar />
      </aside>

      {/* Main Content - 70% */}
      <main className="flex-1 p-6 overflow-y-auto">
        <Suspense fallback={null}>
          <Outlet />
        </Suspense>
      </main>
    </div>
  );
};

export default DoctorDashboard;

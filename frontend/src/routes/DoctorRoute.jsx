import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

export default function DoctorRoute() {
    const {status, user} = useAuth();

    if(status === 'loading') {
        return <div>Loading...</div>
    }

    if(status !== "authenticated"){
        return <Navigate to='/login' replace />
    }

    if(user.role !== "doctor") {
        return <Navigate to='/unauthorized' replace/>
    }

    return <Outlet/>

}

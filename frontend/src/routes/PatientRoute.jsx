import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

export default function PatientRoute() {
    const {status, user} = useAuth();

    if(status === 'loading') {
        return <div>Loading...</div>;
    }

    if(status !== "authenticated") {
        return <Navigate to='login/' replace />;
    }

    if(user.role !== 'patient') {
        return <Navigate to='/unauthorized' replace />;
    }

    return <Outlet/>;
}
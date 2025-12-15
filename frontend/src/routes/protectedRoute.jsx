import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/context/AuthContext.jsx";


export default function ProtectedRoute (){
    const {status} = useAuth();

  if(status === 'loading') {
    return <div>Loading...</div>
  }

  if(status !== "authenticated") {
    return <Navigate to='/login' replace />
  }

  return <Outlet/>

}
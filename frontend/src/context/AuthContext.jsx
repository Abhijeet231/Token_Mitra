import { createContext, useContext, useEffect, useState, useCallback } from "react";
import {loginUser as loginService, logout as logoutService, getMe} from '@/services/auth.service.js'
import { toast } from "react-toastify";

const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {

    const [user, setUser] = useState(null);
    const [status, setStatus] = useState("loading")

    // Check existing session (runs on app load / refresh)
    const checkAuth = useCallback(async() => {
        try {
            setStatus("loading");
            const res = await getMe();
            setUser(res.data.data);
            setStatus("authenticated")
            console.log("Response:", res.data.data)
        } catch (error) {
            setUser(null);
            setStatus("unauthenticated")
        }
    }, []);

    useEffect(() => {
        checkAuth();
    }, [checkAuth])

    // LOGIN
    const login = useCallback(async(Credential) => {
        const res = await loginService(Credential);
        setUser(res.data.data);
        setStatus("authenticated");
        return res;
    }, []);

    // LOGOUT
    const logout = useCallback(async () => {
        await logoutService();
        setUser(null);
        setStatus("unauthenticated");
        toast.success("LOgged Out successfully!")
    }, []);

    
    const value = {
        user,
        status,
        isAuthenticated: status === 'authenticated',
        login,
        logout,
        refreshUser: checkAuth,
    };


    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );

};

// CUSTOM HOOK
export const useAuth = () => {
    const context = useContext(AuthContext);
    return context;
};


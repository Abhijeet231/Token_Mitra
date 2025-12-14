import { createContext, useContext, useEffect, useState, useCallback } from "react";
import {login as loginService, logout as logoutService, getMe} from '@/services/auth.service.js'

const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {

    const [user, setUser] = useState(null);
    const [status, setStatus] = useState("loading")

    // Check existing session (runs on app load / refresh)
    const checkAuth = useCallback(async() => {
        try {
            setStatus("loading");
            const res = await getMe();
            setUser(res.data.currUser);
            console.log("Response:", res.data)
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
        setUser(res.data.loggedInUser);
        setStatus("authenticated");
        return res;
    }, []);

    // LOGOUT
    const logout = useCallback(async () => {
        await logoutService();
        setUser(null);
        setStatus("unauthenticated");
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


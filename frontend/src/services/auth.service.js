import api from  "@/services/api.js"

// REGISTER
export const register = (credentials) => {
    return api.post("/auth/register", credentials);
};

// LOGIN
export const login = (credentials) => {
    return api.post("/auth/login", credentials);
};

// LOGOUT
export const logout = () => {
    return api.post("/auth/logout");
};

// GET CURRENT USER
export const getMe = () => {
    return api.get("/auth/me");
};

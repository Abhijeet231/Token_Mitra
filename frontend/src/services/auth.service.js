import api from  "@/services/api.js"

// REGISTER
export const registerUser = (credentials) => {
    return api.post("/users/auth/register", credentials);
};

// LOGIN
export const login = (credentials) => {
    return api.post("/users/auth/login", credentials);
};

// LOGOUT
export const logout = () => {
    return api.post("/users/auth/logout");
};

// GET CURRENT USER
export const getMe = () => {
    return api.get("/users/auth/me");
};

import api from "@/services/api"

// Get all doctors
export const getAllDoctors = () => {
    return api.get("/doctors/all");
}

// Get LoggedIn Doctor
export const getLoggedInDoctor = () => {
    return api.get("/doctors/me");
}

// Create Doctor Profile
export const createDocProfile = (data) => {
    return api.post("/doctors/me", data);
}

// Update Doctor Profile
export const updateDoctorProfile = (data) => {
    return api.patch("/doctors/me", data);
}

// Get Specific Doctor
export const getSpecificDoctor = (doctorId) => {
    return api.get(`/doctors/${doctorId}`)
}
import api from "@/services/api"

// Get all doctors
export const getAllDoctors = () => {
    return api.get("/doctors/all");
}

// Get LoggedIn Doctor
export const getLoggedInDoctor = () => {
    return api.get("/doctors/me");
}

// Update/Create Doctor Profile
export const updateDoctorProfile = () => {
    return api.patch("/doctors/me");
}

// Get Specific Doctor
export const getSpecificDoctor = (doctorId) => {
    return api.get(`/doctors/${doctorId}`)
}
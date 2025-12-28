import api from "@/services/api"

// Get patient details
export const getPatientDetails = () => {
    return api.get("/patients/me");
}

// Create Patient Profile
export const createPatientProfile = (data) => {
    return api.put('/patients/me', data);
}

// Update Patient Profile
export const updatePatientProfile = (data) => {
    return api.patch("/patients/me", data);
}
import api from "@/services/api"

// Get patient details
export const getPatientDetails = () => {
    return api.get("/patients/me");
}

// Create/Update Patient
export const updatePatientDetails = (data) => {
    return api.put('/patients/me', data);
}
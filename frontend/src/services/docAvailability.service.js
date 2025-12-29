import api from "./api";

// Create Availability
export const createAvailability = (credentials) => {
    return api.post("/doctor/me/availability", credentials)
};                                   

// Get Availability for doctor
export const getMyAvailability = () => {
    return api.get("/doctor/me/availability")
};

// Get Availability for patients
export const getDoctorsAvailability = (id) => {
    return api.get(`/doctor/${id}/availability`)
};

// UPdate available slots for doctor
export const updateAvailableSlots = (id , credentials) => {
    return api.patch(`/doctor/me/availability/${id}`, credentials)
};

// Toggle Availability (docs only)
export const toggleAvailabilityStatus = (id, data) => {
      return api.patch(`/doctor/me/availability/${id}/toggle`, data)
};

// Delete Availability (DOcs only)
export const deleteAvailability = (id) => {
    return api.delete(`/doctor/me/availability/${id}`)
};




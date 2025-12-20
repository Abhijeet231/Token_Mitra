import api from "./api";

// Create Availability
export const createAvailability = (data) => {
    return api.post("/doctors/me/availability", data)
};

// Get Availability for doctor
export const getMyAvailability = () => {
    return api.get("/doctors/me/availability")
};

// Get Availability for patients
export const getDoctorsAvailability = () => {
    return api.get(`/${id}/availability`)
}

// Toggle Availability (docs only)
export const toggleAvailabilityStatus = (data) => {
      return api.patch(`/me/availability/${id}/toggle`, data)
}

// Delete Availability (DOcs only)
export const deleteAvailability = () => {
    return api.delete(`/me/availability/${id}`)
}




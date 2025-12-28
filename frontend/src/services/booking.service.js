import api from "./api";

// Create new booking 
export const createBooking = (credentials) => {
    return api.post("/bookings", credentials);
}

// fetch Bookings for user
export const getBookingsForPatient = () => {
    return api.get("/bookings/me");
}

// fetch Bookings for Doctors only
export const getBookingsForDoctor = () => {
    return api.get("/bookings/doctor");
}

// Cancel Booking (Paitent Only)
export const cancelBooking = (bookingId) => {
    return api.patch(`/${bookingId}/cancel`);
}

// Update Booking Status (Doctor Only)
export const updateBookingStatus = (bookingId) => {
    return api.patch(`/${bookingId}/status`)
}
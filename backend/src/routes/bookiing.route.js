import {Router} from "express";
import { createBookings, getMyBookingsD, getMyBookingsP, cancelBooking, updateBookingStatus } from "../controllers/booking.controller.js";
import verifyJWT from "../middleware/auth.middleware.js";
import validate from "../middleware/validate.middleware.js";
import patientOnly from "../middleware/patientOnly.js";
import doctorOnly from "../middleware/doctorOnly.js";
import { createBookingSchema } from "../validations/booking.validate.js";




const router = Router();

// Creating a booking
router.post("/", verifyJWT, patientOnly, validate(createBookingSchema), createBookings);

// fetch bookings for useronly
router.get("/me", verifyJWT, patientOnly, getMyBookingsP);

// fetch bookings for doctorsonly
router.get("/doctor", verifyJWT,doctorOnly, getMyBookingsD );

// cancel bookings for usersonly
router.patch("/:bookingId/cancel", verifyJWT, patientOnly, cancelBooking);

// Update Booking status doctor only
router.patch("/:bookingId/status", verifyJWT, doctorOnly, updateBookingStatus);

export default router;
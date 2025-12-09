import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import Booking from "../models/booking.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import DocAvailability from "../models/docAvailability.model.js";
import User from "../models/user.model.js";
import Doctor from "../models/doctor.model.js";
import DocAvailability from "../models/docAvailability.model.js";
import Patient from "../models/patient.model.js";


// Creating a new appointment booking
export const createBooking = asyncHandler(async(req,res) => {
    const {availabilityId} = req.body;

    if(!availabilityId) {
        throw new ApiError(400, "Availability ID is required")
    }

    // Get the specific slot 
    const slot = await DocAvailability.findById(availabilityId);
    if(!slot) {
        throw new ApiError(404, "Slot not found");
    }

    if(!slot.isActive){
        throw new ApiError(400, "Slot is not active");
    }

    // Date should not be in the past
    if(new Date(slot.date) < new Date()) {
        throw new ApiError(400, "Cannot book a past date!");
    }

    // Check full slot
    if(slot.bookedPatientCount >= slot.maxPatients) {
        throw new ApiError(400, "Slot is fully booked");
    }

    // Check duplicate booking by same user
    const existingBooking = await Booking.findOne({
        patientId: req.user._id,
        availabilityId: availabilityId,
        status: {$in: ["pending"]},
    });

    if(existingBooking) {
        throw new ApiError(409, "You have already booked this slot")
    }

    // Calculate next token number
    const tokenNumber = slot.bookedPatientCount +1;

    // Create booking 
    const newBooking = await Booking.create({
        patientId: req.user._id,
        doctorId: slot.doctorId,
        availabilityId: availabilityId,
        appointmentDate: slot.date,
        slotTime: slot.startTime,
        tokenNumber,
        status: "pending",
    });

    // Update booking count
    slot.bookedPatientCount += 1;

    if(slot.bookedPatientCount >= slot.maxPatients) {
        slot.isActive = false;
    }

    await slot.save();

    return res.status(201).json(
        new ApiResponse(
            201, 
            newBooking,
            "Booking successful ! Token has been allocated"
        )
    );

})





















// Appointment Booking 
// POST /api/v1/doctors/:id/appointments
// GET /api/v1/doctors/me/appointments

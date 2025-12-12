import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import Booking from "../models/booking.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import DocAvailability from "../models/docAvailability.model.js";


// Creating a new appointment booking (api/v1/bookings)
export const createBookings = asyncHandler(async (req, res) => {
  const { availabilityId, issue } = req.body;

  if (!availabilityId) {
    throw new ApiError(400, "Availability ID is required");
  }

  // Get the specific slot
  const slot = await DocAvailability.findById(availabilityId);
  if (!slot) {
    throw new ApiError(404, "Slot not found");
  }

  if (!slot.isActive) {
    throw new ApiError(400, "Slot is not active");
  }

  // Date should not be in the past
  if (new Date(slot.date) < new Date()) {
    throw new ApiError(400, "Cannot book a past date!");
  }

  // Check full slot
  if (slot.bookedPatientCount >= slot.maxPatients) {
    throw new ApiError(400, "Slot is fully booked");
  }

  // Check duplicate booking by same user
  const existingBooking = await Booking.findOne({
    patientId: req.user._id,
    availabilityId: availabilityId,
    status: { $in: ["pending"] },
  });

  if (existingBooking) {
    throw new ApiError(409, "You have already booked this slot");
  }

  // Calculate next token number
  const tokenNumber = slot.bookedPatientCount + 1;

  // Create booking
  const newBooking = await Booking.create({
    patientId: req.user._id,
    doctorId: slot.doctorId,
    availabilityId: availabilityId,
    issue,
    appointmentDate: slot.date,
    slotTime: slot.startTime,
    tokenNumber,
    status: "pending",
  });

  // Update booking count
  slot.bookedPatientCount += 1;

  if (slot.bookedPatientCount >= slot.maxPatients) {
    slot.isActive = false;
  }

  await slot.save();

  return res
    .status(201)
    .json(
      new ApiResponse(
        201,
        newBooking,
        "Booking successful ! Token has been allocated"
      )
    );
});

// Get my bookings (patient) (api/v1/bookings/me)
export const getMyBookingsP = asyncHandler(async (req, res) => {
  // find booking related to patient
  const bookings = await Booking.find({ patientId: req.user._id })
    .populate("doctorId")
    .populate("availabilityId")
    .sort({ createdAt: -1 });

  if (bookings.length === 0) {
    throw new ApiError(404, "No booking found");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, bookings, "all bookings for the patient fetched..")
    );
});

// Get my bookings (doctor) (api/v1/bookings/doctor)
export const getMyBookingsD = asyncHandler(async (req, res) => {
  // find bookings realted to doctor
  const bookings = await Booking.find({ doctorId: req.user._id })
    .populate("patientId", "fullName email phone")
    .populate("availabilityId", "date startTime endTime")
    .sort({ appointmentDate: 1, tokenNumber: 1 });

  if (bookings.length === 0) {
     return res.status(200).json( new ApiResponse(200, [], "No bookings yet"));
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, bookings, "all bookings for the doctor fetched..")
    );
});

// Cancel booking (patient) (api/v1/bookings/:bookingId)
export const cancelBooking = asyncHandler(async(req,res) => {
    // finding booking
    const {bookingId} = req.params;
    const booking = await Booking.findById(bookingId);
    if(!booking) {
        throw new ApiError(404, "Booking not found!")
    }

    // Ownership check
    if(booking.patientId.toString() !== req.user._id.toString()){
        throw new ApiError(403, "Not authorised to cancel this booking");
    }

    // check if canceled before
    if(booking.status === "cancelled"){
        throw new ApiError(400, "Booking Already Cancelled")
    }

    // finding the slot 
    const slot  = await DocAvailability.findById(booking.availabilityId);
    if(!slot) throw new ApiError(404, "Slot not found!!")

        // UPdate booking status
    booking.status = "cancelled";

    // UPdate slot booking count
    slot.bookedPatientCount -= 1;

    if(slot.bookedPatientCount < slot.maxPatients){
        slot.isActive = true
    };
    
    await booking.save();
    await slot.save();

    return res.status(200).json(new ApiResponse(200, null, "Booking cancelled successfully"));

})

// Update Booking status (Doctor) (api/v1/bookings/:bookingId/status)
export const updateBookingStatus = asyncHandler(async(req,res) => {
    const {bookingId} = req.params;
    const {status} = req.body;

    // Validate status 
    if(!['completed'].includes(status)){
        throw new ApiError(400, "Invalid status update");
    }

    const booking = await Booking.findById(bookingId);
    if(!booking){
        throw new ApiError(404, "Booking not found!")
    }

    // checking the doctor 
    if(booking.doctorId.toString() !== req.user._id.toString()){
        throw new ApiError(403, "You are not authorised to perform this action")
    }

    // Prevent double updates
    if(booking.status === "completed") {
        throw new ApiError(400, "Booking already marked as compled!")
    }

    booking.status = status;
    await booking.save();

    return res.status(200).json(new ApiResponse(200, booking, "Booking status updated"))
})
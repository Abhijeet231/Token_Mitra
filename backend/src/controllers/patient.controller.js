import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import Patient from "../models/patient.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import User from "../models/user.model.js";
import Booking from "../models/booking.model.js";

// GET LOGGED IN PATINET (patient only)
export const getPatient = asyncHandler(async (req, res) => {
  const patient = await Patient.findOne({ userId: req.user._id }).populate(
    "userId",
    "fullName email",
  );
  if (!patient) {
    return res.status(200).json({
      message: "Patient Profile Incomplete!",
      needsProfile: true,
    });
  }

  return res
    .status(200)
    .json(new ApiResponse(200, patient, "Patient Profile fetched"));
});

// CREATE PATIENT PROFILE (create patient model)
export const createPatientProfile = asyncHandler(async (req, res) => {
  let patient = await Patient.findOne({ userId: req.user._id });
  if (patient) {
    throw new ApiError(400, "Patient profile already exists.");
  }

  // Create patient profile
  const newPatientProfile = await Patient.create({
    ...req.body,
    userId: req.user._id,
  });

  return res
    .status(201)
    .json(
      new ApiResponse(
        201,
        newPatientProfile,
        "Patient profile created successfully.",
      ),
    );
});

// UPDATE PATIENT PROFILE
export const updatePatientProfile = asyncHandler(async (req, res) => {
  let patient = await Patient.findOne({ userId: req.user._id });
  if (!patient) {
    throw new ApiError(404, "Patient Not found!");
  }

  // Update existing profile
  Object.assign(patient, req.body);

  await patient.save();

  return res
    .status(200)
    .json(
      new ApiResponse(200, patient, "Patient profile updated successfully."),
    );
});

// DELETE PATIENT PROFILE
export const deletePatientProfile = asyncHandler(async (req, res) => {
  // Checking if user exists or not
  const user = await User.findById(req.user._id);
  if (!user) {
    throw new ApiError(404, "User not found to delete!");
  }

  // Checking role
  if (user.role !== "patient") {
    throw new ApiError(403, "Unauthorized to delete Patient Profile");
  }

  // Finding  patient Profile
  const patientProfile = await Patient.findOne({ userId: user._id });
  if (!patientProfile) {
    throw new ApiError(404, "Patient Profile not found to delete");
  }

  // Deleting Bookings made by patient
  await Booking.deleteMany({ patientId: user._id });

  // Deleting Patient Profile
  await Patient.deleteOne({ userId: user._id });

  // Deleting User Profile
  await User.deleteOne({ _id: user._id });

  // Clearing cookies
  const isProd = process.env.NODE_ENV === "production";
  const isCustomDomain = process.env.COOKIE_DOMAIN;

  const options = {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? "None" : "lax",
    ...(isCustomDomain && { domain: isCustomDomain }),
  };

  res.clearCookie("accessToken", options);

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Patient Profile Deleted Successfully"));
});

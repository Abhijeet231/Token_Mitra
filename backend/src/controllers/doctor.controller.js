import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import Doctor from "../models/doctor.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import {
  uploadOnCloudinary,
  deleteFromCloudinary,
} from "../utils/cloudinary.js";

// Get all Doctors (public)
export const getAllDoctors = asyncHandler(async (req, res) => {
  const allDocs = await Doctor.find();
  if (!allDocs) {
    throw new ApiError(404, "No Doctors Found");
  }

  if (allDocs.length < 1) {
    throw new ApiError(404, "No Doctors found !!! yet");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, allDocs, "All Doctors fetched Successfully.."));
});

// Get Specific Doctor (public)
export const getDoctor = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const doctor = await Doctor.findById(id);
  if (!doctor) throw new ApiError(404, "Doctor Not Found!");

  return res
    .status(200)
    .json(new ApiResponse(200, doctor, "Doctor details fetched successfully."));
});

// Get LoggedIn Doctor (protected- only accessible by doc himself)
export const getLoggedInDoctor = asyncHandler(async (req, res) => {
  const doctor = await Doctor.findOne({ userId: req.user._id }).populate(
    "userId",
    "fullName email"
  );

  if (!doctor) {
    return res.status(200).json({
      message: "Doctor Profile Incomplete!",
      needsProfile: true,
    });
  }

  return res
    .status(200)
    .json(new ApiResponse(200, doctor, "Doctor Profile fetched"));
});

// Create Doctors Profile
export const createDoctorProfile = asyncHandler(async (req, res) => {
  const {
    specialization,
    qualification,
    experience,
    clinicAddress,
    slotDuration,
  } = req.body;

  const existingProfile = await Doctor.findOne({ userId: req.user._id });
  if (existingProfile) {
    throw new ApiError(409, "Doctor Profile already Exists!");
  }

  // Creating Doctors profile
  const newDoctor = {
    userId: req.user._id,
    specialization,
    qualification,
    experience,
    clinicAddress,
    slotDuration,
  };

  if(req.file?.path) {
    const uploadImage = await uploadOnCloudinary(req.file.path);
    if(!uploadImage) {
        throw new ApiError(500, "Profile Image Upload Failed");
    }

    newDoctor.profileImage = {
        url: uploadImage.secure_url,
        public_id: uploadImage.public_id,
    };
  }

  
  const newDocProfile = await Doctor.create(newDoctor);

  return res
    .status(201)
    .json(
      new ApiResponse(201, newDocProfile, "Doctor Profile Created Successfully")
    );
});

//  Update Doctor Profile
export const updateDoctorProfile = asyncHandler(async (req, res) => {
  let doctor = await Doctor.findOne({ userId: req.user._id });

  if (!doctor) {
    throw new ApiError(404, "Doctor Profile Not Found");
  }

  const {
    specialization,
    qualification,
    experience,
    clinicAddress,
    slotDuration,
  } = req.body;

if (typeof specialization === "string" && specialization.trim())
  doctor.specialization = specialization;

if (typeof qualification === "string" && qualification.trim()) doctor.qualification = qualification;

if (experience !== undefined) doctor.experience = experience;

if (typeof clinicAddress === "string" && clinicAddress.trim()) doctor.clinicAddress = clinicAddress;

if (slotDuration !== undefined) doctor.slotDuration = slotDuration;

  // Handle Profile Image (optional)
  if (req.file?.path) {
    const uploadImage = await uploadOnCloudinary(req.file.path);
    if(!uploadImage) {
        throw new ApiError(500, "Profile Image Upload failed!");
    }
    //delete old image if exists
    const oldImage = doctor.profileImage?.public_id;

    doctor.profileImage = {
        url: uploadImage.secure_url,
        public_id: uploadImage.public_id,
    };

    await doctor.save({validateBeforeSave: true});

    if(oldImage) {
        try {
            await deleteFromCloudinary(oldImage)
        } catch (error) {
            console.log("cloudinary cleanup failed:", error);
        }
     }
    }
    
    // Save doctor when no image is uploaded 
        await doctor.save({validateBeforeSave: true});
    

  return res
    .status(200)
    .json(new ApiResponse(200, doctor, "Doctor Profile Updated Successfully"))

});
  
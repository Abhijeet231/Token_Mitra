import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import Patient from "../models/patient.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// Get loggedIn patient (patient only)
export const getPatient = asyncHandler(async(req,res) => {
       
    const patient = await Patient.findOne({userId: req.user._id}).populate("userId", "fullName email");
    if(!patient) {
        return res.status(200).json({
            message: "Patient Profile Incomplete!",
            needsProfile: true
        });
    };

    

    return res.status(200).json(new ApiResponse(200, patient, "Patient Profile fetched"));
});

// Create  Patient profile (create patient model)
export const createPatientProfile = asyncHandler(async(req,res) => {
       
    let patient = await Patient.findOne({userId: req.user._id});
    if(patient) {
        throw new ApiError(400, "Patient profile already exists.");
    }

  
        // Create patient profile 
        const newPatientProfile = await Patient.create({
            ...req.body,
            userId: req.user._id,
        });

        return res.status(201).json(new ApiResponse(201, newPatientProfile, "Patient profile created successfully."))
    
});


// Update Patient Profile
export const updatePatientProfile = asyncHandler(async(req,res) => {
    
   let patient = await Patient.findOne({userId: req.user._id});
   if(!patient) {
    throw new ApiError(404, "Patient Not found!")
   }
        
    // Update existing profile
    Object.assign(patient, req.body); 

    await patient.save();

    return res.status(200).json(new ApiResponse(200, patient, "Patient profile updated successfully."))
})



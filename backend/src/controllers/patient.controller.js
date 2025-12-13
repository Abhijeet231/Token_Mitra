import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import Patient from "../models/patient.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// Get loggedIn patient (patient only)
export const getPatient = asyncHandler(async(req,res) => {
       
    const patient = await Patient.findOne({userId: req.user._id});
    if(!patient) {
        return res.status(200).json({
            message: "Patient Profile Incomplete!",
            needsProfile: true
        });
    };

    return res.status(200).json(new ApiResponse(200, patient, "Patient Profile fetched"));
});



// Update / Create  Patient profile (create patient model)
export const updatePatientProfile = asyncHandler(async(req,res) => {
       
    let patient = await Patient.findOne({userId: req.user._id});
    if(!patient) {
        // Create patient profile 
        const newPatientProfile = await Patient.create({
            userId: req.user._id,
            ...req.body,
        });

        return res.status(200).json(new ApiResponse(201, newPatientProfile, "Patient profile created successfully."))
    }
    
    // Update existing profile
    const {age, gender} = req.body;
    if(age) patient.age = age;
    if(gender) patient.gender = gender;

    await patient.save();

    return res.status(200).json(new ApiResponse(200, patient, "Patient profile updated successfully."))

});



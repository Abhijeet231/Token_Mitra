import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import Doctor from "../models/doctor.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary, deleteFromCloudinary } from "../utils/cloudinary.js";


// Get all Doctors (public)
export const getAllDoctors = asyncHandler(async(req,res) => {
    const allDocs = await Doctor.find();
    if(!allDocs){
        throw new ApiError(404, "No Doctors Found");
    }

    if(allDocs.length < 1 ) {
        throw new ApiError(404, "No Doctors found !!! yet")
    }

    return res.status(200)
    .json(new ApiResponse(
        200, 
        allDocs,
        "All Doctors fetched Successfully.."
    ));
});


// Get Specific Doctor (public)
export const getDoctor = asyncHandler(async(req,res) => {
    const {id} = req.params;

    const doctor = await Doctor.findById(id);
    if(!doctor) throw new ApiError(404, "Doctor Not Found!");

    return res.status(200)
    .json(new ApiResponse(
        200, doctor, "Doctor details fetched successfully."
    ))

});


// Get LoggedIn Doctor (protected- only accessible by doc himself)
export const getLoggedInDoctor = asyncHandler(async(req,res) => {

    const doctor = await Doctor.findOne({userId: req.user._id});
    if(!doctor) {
        return res.status(200).json({
            message: "Doctor Profile Incomplete!",
            needsProfile: true
        });
    }

    return res.status(200)
    .json(new ApiResponse(
        200, doctor, "Doctor Profile fetched"
    ));
});


// Update / Create  Doctor Profile 
export const updateDoctorProfile = asyncHandler(async(req,res) => {

  let doctor = await Doctor.findOne({userId: req.user._id});

  if(!doctor) {
    //Create Profile for the first time 
    let profileImageData = {};

    if(req.file?.path) {
        const uploadedImage = await uploadOnCloudinary(req.file.path);

        if(!uploadedImage) {
            throw new ApiError(500, "Profile image upload failed!")
        }

        profileImageData = {
            profileImage: {
                url: uploadedImage.secure_url,
                public_id: uploadedImage.public_id,
            },
        };

    }



   const  newDoctorprofile = await Doctor.create({
        userId: req.user._id,
        ...req.body,
        ...profileImageData
    });

    return res.status(201).json(new ApiResponse(
        201, newDoctorprofile, "Doctor Profile Created Successfully"
    ))
};

// Upate existing profile 
const { specialization, qualification, experience, clinicAddress, slotDuration } = req.body;

if (specialization) doctor.specialization = specialization;
if (qualification) doctor.qualification = qualification;
if (experience !== undefined) doctor.experience = experience;
if (clinicAddress) doctor.clinicAddress = clinicAddress;
if (slotDuration !== undefined) doctor.slotDuration = slotDuration;

// Handle Profile Image (optional)
if(req.file?.path) {
    //delete old image if exists
    if(doctor.profileImage?.public_id) {
        try {
            await deleteFromCloudinary(doctor.profileImage.public_id);
        } catch (error) {
            console.log("Cloudinary Delete failed:", error)
        }
    }

    const uploadedImage = await uploadOnCloudinary(req.file.path);
    if(!uploadedImage) {
        throw new ApiError(500, "Profile Image upload failed");
    }

    doctor.profileImage = {
        url: uploadedImage.secure_url,
        public_id: uploadedImage.public_id,
    };

}

await doctor.save();

return res.status(200).json(new ApiResponse(200, doctor, "Doctor Profile Updated Successfully"))

});












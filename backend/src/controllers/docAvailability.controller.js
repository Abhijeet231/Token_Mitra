import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import DocAvailability from "../models/docAvailability.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import Doctor from "../models/doctor.model.js";



// Creating Availability 
export const addAvailability = asyncHandler(async(req,res) => {
   // extracting the data from request body
   const {date, startTime, endTime, maxPatients} = req.body;
   if(!date || !startTime || !endTime || !maxPatients){
     throw new ApiError(400, "All fields are required");    
   }
   
   //Creating model
   const availability = await DocAvailability.create({
    doctorId: req.user._id,
    date,
    startTime,
    endTime,
    maxPatients: maxPatients ?? 10,
    isActive: true,
   });

   res.status(201).json(new ApiResponse(201, availability, "Availability Created successfully"))
})

// View availability slots (doctor only)
export const getMyAvailability = asyncHandler(async(req,res) => {

    // find doctor related availability slot 
    const doctorAvailability = await DocAvailability.find({
        doctorId: req.user._id,
    }).sort({date:1}); // show nearest dates first 

    if(!doctorAvailability || doctorAvailability.length === 0){
        return res.status(200).json(
            new ApiResponse(200, [], "No availability slot found")
        );
    };

    res.status(200).json(new ApiResponse(200, doctorAvailability, "Doctor availability fetched successfully"))
}) 

// fetching available slots to patient (public)
export const getDoctorAvailability = asyncHandler(async(req,res) => {
   

    // Finding the doctor
    const doctor = await Doctor.findById(req.params.id);
    if(!doctor){
        throw new ApiError(404, "Doctor not found!")
    }

    // finding available slots 
    const slots = await DocAvailability.find({
        doctorId: doctor.userId,
        isActive: true
    }).sort({date:1});

   

    return res.status(200).json(new ApiResponse(200, slots, slots.length === 0 ? "No available slots found" : "Available Slots fetched successfully"))
}) ;
 
// Update a slot (Doctor only) 
export const updateAvailability = asyncHandler(async(req,res) => {
    const {availabilityId} = req.params;

   const slot = await DocAvailability.findById(availabilityId);

   if(!slot) {
    throw new ApiError(404, "Slot not found");
   }
  // Ownership check
if(slot.doctorId.toString() !== req.user._id.toString()){
    throw new ApiError(403, "You are not authorised to modify this slot")
}

// UPdate with validated req.body
   const {date, startTime, endTime, maxPatients} = req.body;
  

  if(date) slot.date = new Date(date);
   if(startTime) slot.startTime = startTime;
   if(endTime) slot.endTime = endTime;
   if(maxPatients !== undefined) slot.maxPatients = maxPatients ?? slot.maxPatients;

    await slot.save();

    res.status(200).json(new ApiResponse(200, slot, "Availability slot updated successfully"))

})

// Delete slots (Doctor only)
export const deleteAvailability = asyncHandler(async(req,res) => {
         const {availabilityId} = req.params;

         const slot = await DocAvailability.findById(availabilityId);
         if(!slot){
            throw new ApiError(404, "slot not found")
         };

         // check ownership
         if(slot.doctorId.toString() !== req.user._id.toString()){
            throw new ApiError(403, "You are not authorised to perform this action!")
         };

         await slot.deleteOne();

         return res.status(200).json(new ApiResponse(200, null, "SLot Deleted Successfully"))
})



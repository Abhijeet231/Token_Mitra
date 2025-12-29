import {Router} from "express";
import { addAvailability, getMyAvailability, getDoctorAvailability, updateAvailability, deleteAvailability, toggleAvailabilityStatus } from "../controllers/docAvailability.controller.js";
import verifyJWT from "../middleware/auth.middleware.js";
import validate from "../middleware/validate.middleware.js";
import doctorOnly from "../middleware/doctorOnly.js";
import { addAvailabilitySchema, updateAvailabilitySchema } from "../validations/docAvailability.validation.js";


const router = Router();

// Creating availability (protected route)
router.post("/me/availability", verifyJWT, doctorOnly, validate(addAvailabilitySchema), addAvailability  );

// Get availability (protected route) doctor only
router.get("/me/availability", verifyJWT, doctorOnly, getMyAvailability );



// Update available slots (protected route > doctor only)
router.patch("/me/availability/:availabilityId", verifyJWT, doctorOnly, validate(updateAvailabilitySchema), updateAvailability);

// Toggle availability status (protected route > doctor only)
router.patch("/me/availability/:availabilityId/toggle", verifyJWT, doctorOnly, toggleAvailabilityStatus);

// Delete available slots (protected route > doctor only)
router.delete("/me/availability/:availabilityId", verifyJWT, doctorOnly, deleteAvailability);

// Get available slots for patients 
router.get("/:doctorId/availability", getDoctorAvailability);




export default router;
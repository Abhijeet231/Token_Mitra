import {Router} from "express";
import { addAvailability, getMyAvailability, getDoctorAvailability, updateAvailability, deleteAvailability } from "../controllers/docAvailability.controller.js";
import verifyJWT from "../middleware/auth.middleware.js";
import validate from "../middleware/validate.middleware.js";
import doctorOnly from "../middleware/doctorOnly.js";
import { addAvailabilitySchema } from "../validations/docAvailability.validation.js";

const router = Router();

// Creating availability (protected route)
router.post("/me/availability", verifyJWT, doctorOnly, validate(addAvailabilitySchema), addAvailability  );

// Get availability (protected route)
router.get("/me/availability", verifyJWT, doctorOnly, getMyAvailability );

// Get available slots for patients 
router.get("/:id/availability", getDoctorAvailability);

// Update available slots (protected route > doctor only)
router.patch("/me/availability/:availabilityId", verifyJWT, doctorOnly, updateAvailability);

// Delete available slots (protected route > doctor only)
router.delete("/me/availability/:availabilityId", verifyJWT, doctorOnly, deleteAvailability);





export default router;
import { Router } from "express";
import verifyJWT from "../middleware/auth.middleware.js";
import validate from "../middleware/validate.middleware.js";
import patientOnly from "../middleware/patientOnly.js";
import { getPatient, updatePatientProfile } from "../controllers/patient.controller.js";
import { updatePatientProfileSchema } from "../validations/patient.validation.js";

const router = Router();

// Get loggedIn patient
router.get('/me', verifyJWT, patientOnly, getPatient);

// Update/Create Patient 
router.patch('/me', verifyJWT, patientOnly, validate(updatePatientProfileSchema), updatePatientProfile);


export default router;
import {Router} from "express";
import { getAllDoctors, getDoctor, getLoggedInDoctor, updateDoctorProfile } from "../controllers/doctor.controller.js";
import verifyJWT from "../middleware/auth.middleware.js";
import validate from "../middleware/validate.middleware.js";
import { updateDocProfileSchema } from "../validations/doctor.validation.js";
import doctorOnly from "../middleware/doctorOnly.js";


const router = Router();

// Get all doctors
router.get("/all", getAllDoctors); // public route 

// Get loggedIn doctor
router.get("/me", verifyJWT,doctorOnly, getLoggedInDoctor);

// Get specific doctor
router.get("/:id", getDoctor); // public route

//Update doctor
router.patch("/me", verifyJWT,doctorOnly, validate(updateDocProfileSchema), updateDoctorProfile);


export default router;
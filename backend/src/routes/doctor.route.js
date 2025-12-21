import {Router} from "express";
import { getAllDoctors, getDoctor, getLoggedInDoctor, updateDoctorProfile, createDoctorProfile } from "../controllers/doctor.controller.js";
import verifyJWT from "../middleware/auth.middleware.js";
import validate from "../middleware/validate.middleware.js";
import { updateDocProfileSchema } from "../validations/doctor.validation.js";
import doctorOnly from "../middleware/doctorOnly.js";
import {upload} from "../middleware/multer.middleware.js" 



const router = Router();

// Get all doctors
router.get("/all", getAllDoctors); // public route 

// Get loggedIn doctor (private route)
router.get("/me", verifyJWT, getLoggedInDoctor);

// Get specific doctor
router.get("/:id", getDoctor); // public route

// Create Doctor Profile
router.post("/me", verifyJWT, upload.single("profileImage"), createDoctorProfile)

// Update doctor (private route)
router.patch("/me", verifyJWT, upload.single("profileImage"),validate(updateDocProfileSchema), updateDoctorProfile);


export default router;
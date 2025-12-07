import {Router} from "express";
import { registerUser, loginUser, logoutUser, getCurrentUser  } from "../controllers/user.controller.js";
import verifyJWT from "../middleware/auth.middleware.js";
import validate from "../middleware/validate.middleware.js";
import { registerSchema, loginSchema } from "../validations/user.validation.js";

const router = Router();

// Register a new user
router.post("/auth/register", validate(registerSchema), registerUser);

// Login User
router.post("/auth/login", validate(loginSchema), loginUser);

// Logout User (Protected User)
router.post("/auth/logout", verifyJWT, logoutUser);

// Get Current User Details
router.get("/auth/me",verifyJWT, getCurrentUser );


export default router;


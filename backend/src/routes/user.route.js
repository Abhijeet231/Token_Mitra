import {Router} from "express";
import { registerUser, loginUser } from "../controllers/user.controller.js";
import verifyJWT from "../middleware/auth.middleware.js";
import validate from "../middleware/validate.middleware.js";
import { registerSchema, loginSchema } from "../validations/user.validation.js";

const router = Router();

// Register a new user
router.post("/register", validate(registerSchema), registerUser);

// Login User
router.post("/login", validate(loginSchema), loginUser);


export default router;
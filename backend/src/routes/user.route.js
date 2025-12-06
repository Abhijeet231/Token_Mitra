import {Router} from "express";
import { registerUser, loginUser } from "../controllers/user.controller.js";
import verifyJWT from "../middleware/auth.middleware.js";
import validate from "../middleware/validate.middleware.js";
import { registerSchema, loginSchema } from "../validations/user.validation.js";

const router = Router();

// Register a new user
router.post("/auth/register", validate(registerSchema), registerUser);

// Login User
router.post("/auth/login", validate(loginSchema), loginUser);


export default router;


// app.use("/api/v1/auth", authRouter);
// app.use("/api/v1/users", userRouter);
// app.use("/api/v1/doctors", doctorRouter);
// app.use("/api/v1/appointments", appointmentRouter);
// app.use("/api/v1/messages", messageRouter);

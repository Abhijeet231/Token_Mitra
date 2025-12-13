import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors(
    {
        origin: process.env.CORS_ORIGIN,
        credentials: true,
    }
));

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));
app.use(cookieParser());

// User Routes
import userRouter from "./routes/user.route.js";
app.use("/api/v1/users", userRouter);

// Doctor Routes
import doctorRouter from "./routes/doctor.route.js"
app.use("/api/v1/doctors", doctorRouter);

// Doctor Availability Routes
import docAvailabilityRouter from "./routes/docAvailability.route.js"
app.use("/api/v1/doctors", docAvailabilityRouter);

// Patient Routes
import patientRouter from "./routes/patient.route.js"
app.use("/api/v1/patients", patientRouter);

// Booking Routes
import bookingRoutes from "./routes/bookiing.route.js";
app.use("/api/v1/bookings", bookingRoutes);


export default app;
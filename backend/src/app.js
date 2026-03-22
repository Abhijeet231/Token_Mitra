import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();

app.set("trust proxy", 1); 

app.use(
  cors({
    origin: function(origin, callback) {
      const allowedOrigins = process.env.CORS_ORIGIN?.split(",").map(o => o.trim());
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, origin);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

// User Routes
import userRouter from "./routes/user.route.js";
app.use("/api/v1/users", userRouter);

// Doctor Routes
import doctorRouter from "./routes/doctor.route.js";
app.use("/api/v1/doctors", doctorRouter);

// Doctor Availability Routes
import docAvailabilityRouter from "./routes/docAvailability.route.js";

app.use("/api/v1/doctor", docAvailabilityRouter);

// Patient Routes
import patientRouter from "./routes/patient.route.js";
app.use("/api/v1/patients", patientRouter);

// Booking Routes
import bookingRoutes from "./routes/bookiing.route.js";
app.use("/api/v1/bookings", bookingRoutes);

app.use(errorHandler);

export default app;

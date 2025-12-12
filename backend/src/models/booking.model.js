import mongoose, {Schema} from "mongoose";

const bookingSchema = new Schema({
    patientId: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    doctorId: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    availabilityId: {
        type: Schema.Types.ObjectId,
        ref: "DocAvailability",
    },
    appointmentDate: {
        type: Date,
        required: [true, "Appointment Date is required!"],
    },
    slotTime: {
        type: String,
        required: [true, "Slot Time is required!"],
    },
    tokenNumber: {
        type: Number
    },
    issue: {
        type: String,
        required: [true, "Issue description is required!"],
        minlength: [3, "Issue description must be at least 3 characters"],
        maxlength: [200, "Issue description must be under 200 characters"]
    },
    status: {
        type: String,
        enum: ['pending', 'cancelled', 'completed'],
        default: 'pending'
    }
}, {timestamps: true});

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;

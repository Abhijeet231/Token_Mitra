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
    status: {
        type: String,
        enum: ['pending', 'cancelled', 'completed'],
        default: 'pending'
    }
}, {timestamps: true});

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;

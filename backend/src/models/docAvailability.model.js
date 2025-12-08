import mongoose, {Schema} from "mongoose";

const docAvailabilitySchema = new Schema({
    doctorId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    date: Date,
    startTime: {
        type: String,
        required: [true, "Start time is required!"],
    },
    endTime: {
        type: String,
        required: [true, "End time is required!"],
    },
    maxPatients: Number,
    isActive: {
        type: Boolean,
    }
}, {timestamps: true})

const DocAvailability = mongoose.model("DocAvailability", docAvailabilitySchema);

export default DocAvailability;
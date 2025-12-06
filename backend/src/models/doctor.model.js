import mongoose, {Schema} from "mongoose";

const doctorSchema = new Schema ({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    specialization: {
        type: String,
        required: [true, "specialization is required!"],
    },
    qualification : {
        type: String,
        required: [true, "Qualification is required!"],
    },
    experience: {
        type: Number,
        required: [true, "Experience is required!"],
    },
    clinicAddress: {
        type: String,
        required: [true, "Clinic Address is required!"],
    },
    slotDuration: {
        type: Number,
        required: [true, "Slot duration is required!"],
    },
    averageRating: Number,
    profileImage: {
        url: {type: String},
        public_id: {type: String}
    },
});

const Doctor = mongoose.model("Doctor", doctorSchema);

export default Doctor
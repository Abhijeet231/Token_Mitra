import mongoose, {Schema} from "mongoose";

const PatientSchema = new Schema ({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    age: {
        type: Number,
        required: [true,"Age is required!"],
    },
    gender: {
        type: String,
        required: [true, "Gender is required!"],
    },

})

const Patient = mongoose.Model("Patient", PatientSchema);

export default Patient;
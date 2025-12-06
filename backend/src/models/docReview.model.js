import mongoose, {Schema} from "mongoose";

const docReviewSchema = new Schema ({
    doctorId: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    patientId: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    rating: {
        type: Number,
        required: [true, "Rating is required!"],
    },
    comment: {
        type: String,
        required: [true, "Tell us about your experience!"],
    },
}, {timestamps: true});

const DocReview = mongoose.model("DocReview", docReviewSchema);

export default DocReview;
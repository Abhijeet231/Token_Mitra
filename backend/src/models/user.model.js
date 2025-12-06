import mongoose, {Schema} from "mongoose";


const userSchema = new Schema ({
    full_name: {
        type: String,
        required: [true, "FullName is required!"],
        trim: true,
    },
    email: {
        type: String,
        unique: true,
        required: [true, "Email is required!"],
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/ , "please use a valid email address"],
    },
    password: {
        type: String,
        required: [true, "Password is required!"],
    },
    role: {
        type: String,
        enum: ["patient", "doctor"]
    },
}, {timestamps: true});


const UserModel = mongoose.Model("User", userSchema);

export default UserModel;

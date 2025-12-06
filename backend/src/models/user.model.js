import mongoose, {Schema} from "mongoose";
import bcrypt from "bcrypt"

const userSchema = new Schema ({
    fullName: {
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
        enum: ["patient", "doctor"],
        required: true,
        default: "patient",
    },
}, {timestamps: true});

//  Password Hashing 
userSchema.pre('save', async function () {
    if(!this.isModified ("password")) return;

    this.password = await bcrypt.hash(this.password, 8)
    
})

// Checking password 
userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
};


const User = mongoose.model("User", userSchema);

export default User;

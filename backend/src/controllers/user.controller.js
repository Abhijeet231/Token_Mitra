import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import User from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import genAccessToken from "../utils/genAccessToken.js";


//Register User
const registerUser = asyncHandler(async(req,res) => {
    console.log("Incoming Body:" , req.body);

    const {fullName, email, password, role} = req.body

    const existingUser = await User.findOne({
        $or: [{fullName}, {email}]
    });

    if(existingUser) {
        throw new ApiError(400, "User Already Exists!")
    };

    //Creating User and saving it in DB
    const user = await User.create({
        fullName,
        email: email.toLowerCase(),
        password,
        role
    });

    const createdUser = await User.findById(user._id).select("-password");
    if(!createdUser){
        throw new ApiError(500, "Something went wrong while Registering the user!")
    }

    const token = genAccessToken(user._id, user.role);

    res.cookie("accessToken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict"
    })
    
    return res.status(201).json(
        new ApiResponse(201,createdUser, "User Registered Successfully" )
    )

}) 
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import User from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import genAccessToken from "../utils/genAccessToken.js";

// Register User
export const registerUser = asyncHandler(async (req, res) => {
  console.log("Incoming Body:", req.body);

  const { fullName, email, password, role } = req.body;

  const existingUser = await User.findOne({
    $or: [{ email }],
  });

  if (existingUser) {
    throw new ApiError(400, "User Already Exists!");
  }

  //Creating User and saving it in DB
  const user = new User({
    fullName,
    email: email.toLowerCase(),
    password,
    role,
  });

  await user.save(); // pre('save') hook runs correctly

  const createdUser = await User.findById(user._id).select("-password");
  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while Registering the user!");
  }

  const token = genAccessToken(user._id, user.role);

  res.cookie("accessToken", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  return res
    .status(201)
    .json(new ApiResponse(201, createdUser, "User Registered Successfully"));
});

// Login User
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  

  //finding user by email
  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(404, "User Not Found");
  }

  //Checking password
  const isPasswordValid = await user.isPasswordCorrect(password);
  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid Credentials");
  }

  const token = genAccessToken(user._id, user.role);

  const loggedInUser = await User.findById(user._id).select("-password");

  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  };


  return res
    .status(200)
    .cookie("accessToken", token, options)
    .json(new ApiResponse(200, loggedInUser, "User LoggedIn Successfully"));
});

// Logout User
export const logoutUser = asyncHandler(async(req,res) => {
  if(!req.user?._id) {
    throw new ApiError(401, "Unauthorised Request!");
  }

  console.log("LOGGED IN USER:", req.user);

  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: "strict"
  }

  return res
         .status(200)
         .clearCookie("accessToken", cookieOptions)
         .json(new ApiResponse(200, null, "Logged Out Successfully!"))

});

// Current User
export const getCurrentUser = asyncHandler(async(req,res) => {
  
    if (!req.user?._id) {
    throw new ApiError(401, "Unauthorized request");
  }

  const currUser = await User.findById(req.user._id).select("-password");

  if(!currUser) {
    throw new ApiError(404, "User not found!");
  }
  
  return res
.status(200)
.json(new ApiResponse(200, currUser, "Current User fetched Successfully"))
             

})


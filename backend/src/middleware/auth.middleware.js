import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const verifyJWT = asyncHandler(async (req, res, next) => {
  //Get token from cookie or header
  const token = req.cookies?.accessToken;
  if (!token) {
    throw new ApiError(401, "Unauthorized request- No Token provided!");
  }

  //Verify token
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  } catch (error) {
    throw new ApiError(401, "Invalid or expired token");
  }

  // Find User
  const user = await User.findById(decodedToken?._id).select("-password");

  if (!user) {
    throw new ApiError(401, "Unauthorized request -User not found ");
  }

  // Attach user to request
  req.user = user;
  next();
});

export default verifyJWT;

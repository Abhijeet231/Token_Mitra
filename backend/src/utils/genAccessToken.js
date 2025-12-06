import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

const genAccessToken = (userId, role) => {
    const payload = {userId, role};

    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn:"1d",
    });
};

export default genAccessToken;
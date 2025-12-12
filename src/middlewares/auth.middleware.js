import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/apiError.js";

export const authMiddleware = async (req, res, next) => {
    try {
        const token = req.cookies?.accessToken;

        if (!token) {
            throw new ApiError(401, "Access token missing. Please login.");
        }

        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        const user = await User.findById(decoded.userId).select("-password -refreshToken");
        if (!user) {
            throw new ApiError(404, "User not found");
        }

        req.user = user; // Attach sanitized user to request
        next();

    } catch (error) {
        next(new ApiError(401, error.message || "Invalid or expired token"));
    }
};

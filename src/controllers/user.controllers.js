import { asyncHandler } from '../utils/asyncHandler.js'
import { User } from "../models/user.model.js"
import { ApiError } from '../utils/apiError.js';
import { response } from 'express';
import { ApiResponse } from '../utils/ApiResponse.js';
import { comparePassword, hashPassword } from '../utils/password.js';
import { generateAccessToken, generateRefreshToken } from '../utils/jwt.js';

const registerUser = asyncHandler(async (req, res) => {
    const { fullName, email, username, password } = req.body || {};

    if (!fullName || !email || !username || !password) {
        throw new ApiError(400, "All fields are required");
    }

    const existedUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existedUser) {
        throw new ApiError(409, "User already exists");
    }

    const hashedPassword = await hashPassword(password);

    const user = await User.create({
        fullName,
        email,
        username,
        password: hashedPassword
    });

    const accessToken = generateAccessToken(user._id);
    console.log("Aceeesss Token",accessToken)
    const refreshToken = generateRefreshToken(user._id);
    console.log("Refresh Token",refreshToken)

    user.refreshToken = refreshToken;
    await user.save();

    // secure http-only cookies
    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 60 * 60 * 1000  // 1 hour
    });

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000  // 7 days
    });

    return res.status(201).json(
        new ApiResponse(201, { user, accessToken }, "User registered successfully")
    );
});

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body || {};

    if (!email || !password) {
        throw new ApiError(400, "All fields are required");
    }

    const user = await User.findOne({ email });
    if (!user) {
        throw new ApiError(404, "User not registered");
    }

    const isPasswordCorrect = await comparePassword(password, user.password);
    if (!isPasswordCorrect) {
        throw new ApiError(401, "Invalid email or password");
    }

    const accessToken = generateAccessToken(user._id);
    console.log(accessToken)
    const refreshToken = generateRefreshToken(user._id);

    user.refreshToken = refreshToken;
    await user.save();

    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 60 * 60 * 1000
    });

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000
    });

    return res.status(200).json(
        new ApiResponse(200, { user, accessToken }, "User logged in successfully")
    );
});
const getProfile = asyncHandler(async (req, res) => {
    const user = req.user; // Already attached by authMiddleware
    return res.status(200).json(
        new ApiResponse(200, user, "Profile fetched successfully")
    );
});

export { registerUser, loginUser, getProfile }
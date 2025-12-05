import { asyncHandler } from '../utils/asyncHandler.js'
import { User } from "../models/user.model.js"
import { ApiError } from '../utils/apiError.js';
import { response } from 'express';
import { ApiResponse } from '../utils/ApiResponse.js';
import { comparePassword, hashPassword } from '../utils/password.js';
//import { use } from 'react';

// const registerUser = asyncHandler(async (req, res) => {
//     // get user details from frontend
//     const { fullName, email, username, password } = req.body 
//     console.log('email', email)

//     //validation - not empty 
//     if ([fullName,email,username,password].some((field) => 
//         field?.trim()==="")
//     ) {
//         throw new ApiError(400,"All fields are required")
//     }

//     //check whether the user already exists
//     const existedUser = User.findOne({
//         // $or:[{username},{email}]
//         email 
//     })
//     console.log('existedUser', existedUser );
//     if (existedUser) {

//         throw new ApiError(409,"User with this username and email is already registed")

//     }
//     // else{
//     //     console.log('User registered successfully'); 
//     // }


// })
const registerUser = asyncHandler(async (req, res) => {
    const { fullName, email, username, password } = req.body || {};

    console.log("email", email);
    console.log("userdetails", username, email, fullName, password);

    if (!fullName || !email || !username || !password) {
        throw new ApiError(400, "All fields are required");
    }

    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    });

    if (existedUser) {
        throw new ApiError(409, "User already exists");
    }
    const hasPassword = await hashPassword(password)
    console.log("Hash password", hasPassword);

    const user = await User.create({ username, email, fullName, password: hasPassword });

    return res.status(201).json(
        new ApiResponse(201, user, "User registered successfully")
    );
});

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body || {};

    console.log("email", email);

    if (!email || !password) {
        throw new ApiError(400, "All fields are required");
    }

    console.log("password", password);

    const existedUser = await User.findOne({ email });
    console.log("Existed user", existedUser)

    if (!existedUser) {
        throw new ApiError(404, "User not registered");
    }
    const isPasswordTrue = await comparePassword(password, existedUser.password)
    console.log("Check Password true", isPasswordTrue);

    // If password verification is not implemented yet, skip this step for now
    // else compare password:
    // const isMatch = await existedUser.comparePassword(password);

    // For now, assume login success:
    if (!isPasswordTrue) {
        throw new ApiError(404, "Email and password not matched");
    }
    return res
        .status(200)
        .json(new ApiResponse(200, existedUser, "User logged in successfully"));
});


export { registerUser, loginUser }
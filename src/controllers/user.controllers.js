import { asyncHandler } from '../utils/asyncHandler.js'
import  {User} from "../models/user.model.js"
import {ApiError} from '../utils/apiError.js' ;
import { response } from 'express';
import { ApiResponse } from '../utils/ApiResponse.js';
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
const registerUser=asyncHandler(async(req,res)=>{ 
    const {fullName,email,username,password}=req.body||{} 
    console.log('email',email) 
    console.log("userdetails",username,email,fullName,password);

    // if([fullName,email,username,password].some((field)=> {
    //     field?.trim()==="" 
    // }))
    if (!fullName||!email||!username||!password){
        throw new ApiError("all fields are required");
    }
    const existeduser = await User.findOne(
        {
           $or:[{username},{email}]
        }
    )
    if(existeduser){
        throw new ApiError("user is already exists");
    }
    const user=await User.create({username,email,fullName,password});
   // const createdUser = await User.findById(user._id).select(
    // Dont want this field
   // "-password")
    // if(!createdUser){
    //     throw new ApiError(500,"something went wrong")
    // }
    return res.status(201)(
    new ApiResponse(200, User, "User register successFully")
  );
    

})
const loginUser=asyncHandler(async(req,res)=>{
   const {email,password}=req.body||{}
 console.log('email',email)
 if (!email||!password){
        throw new ApiError("all fields are required");
    }
    console.log('password',password)
    const existeduser = await User.findOne(
        {
           $or:[{email}]
        }
    )
    if(!existeduser){
        throw new ApiError("user not registered")
    }
    else{
        throw new ApiError("user logged in succesfully!!")
    }


})

export { registerUser, loginUser}
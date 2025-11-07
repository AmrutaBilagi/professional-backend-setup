import {asynchandler} from "../utils/asyncHandler.js"
import { user } from "../models/user.model.js";
const registerUser = asynchandler(async (req, res) => {
   // get user details from frontend
   const { fullName, email, username, password } = req.body || {};

   console.log('email',email);

   //validation -not empty
   if([fullName,email,username,password].some((fields)=>
   field?.trim()==="")
){
   throw new ApiError(400,"All fields are required")
}

//check user already exists or not
const existeduser=user.findOne({
   $or:[{username},{email}]
})
if(existeduser){
   throw new ApiError(409,"user already existes")
}

})



export { registerUser };
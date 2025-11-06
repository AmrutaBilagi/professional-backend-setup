import {asynchandler} from "../utils/asyncHandler.js"

const registerUser=asynchandler(async(req,res)=>{
   res.status(200).json({
    message:"ok"
   })
})

// const Videouser=asynchandler(async(req,res)=>{
//     res.status(200).{
//         message:"the video has uploaded"
//     }
// })

export {registerUser}
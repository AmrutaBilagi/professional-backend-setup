import mongoose from "mongoose";

const commentSchema=new Schema(
    {
       id:{
        type:String,
        required:true
       },
       content:{
        type:String,
        required:true
       },
       vedio:{
        type:Schema.Types,ObjectId,
        ref:"Video"
       },
       owner:{
        type:Schema.Types.ObjectId,
        ref:"User"
       }
    },
    {timeStamp:true})

export const comment=mongoose.model("Comments",commentSchema)
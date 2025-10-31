import mongoose from "mongoose";

const likeSchema=new Schema(
    {

    },
    {timestamp:true})

export const like=mongoose.model("Likes",likeSchema)
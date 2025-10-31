import mongoose from "mongoose";

const tweetSchema=new Schema(
    {
        id:{
            type:String,
            required:true
        },
        content:{
            type:String,
            required:true
        },
        owner:{
            type:Schema.Types.ObjectId,
            ref:"User"
        }
    },
    {
        timestamp:true
    })

export const tweet=mongoose.model("Tweets",tweetSchema)
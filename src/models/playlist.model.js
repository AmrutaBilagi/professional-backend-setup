import mongoose from "mongoose";

const playlistSchema=new Schema(
    {
        id:{
           type: String,
           required:true
        },
        name:{
            type:String,
            required:true
        },
        description:{
            type:String,
            required:true
        },
        videos:{
            type:Schema.Types.ObjectId,
            ref:"Vedio"
        },
        owner:{
            type:Schema.Types.ObjectId,
            ref:"User"
        }


    },
    {timestamp:true})

export const playlist=mongoose.model("Playlist",playlistSchema)
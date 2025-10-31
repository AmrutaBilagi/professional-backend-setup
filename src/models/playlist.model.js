import mongoose from "mongoose";

const playlistSchema=new Schema(
    {

    },
    {timestamp:true})

export const playlist=mongoose.model("Playlist",playlistSchema)
import mongoose from "mongoose";

const subscriptionSchema=new Schema(
    {

    },
    {timestamp:true})

export const subscription=mongoose.model("Subscribe",subscriptionSchema)
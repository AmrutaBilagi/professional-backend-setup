
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
import bcrypt from "bcrypt"
import JsonWebTokenError from "jsonwebtoken";
import mongoose, { Schema } from "mongoose";
//const {Schema}=mongoose;
const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },
        fullName: {
            type: String,
            required: true,
        },
        // avatar: {             //Cloudinary URL
        //     type: String,
        //     required: true
        // },
        // coverImage: {     //Cloudinary URL
        //     type: String,
        //     required: true
        // },
        password: {
            type: String,
            required: [true, "password is required"]
        },
        refreshToken: {
            type: String
        },
        // watchHistory: {
        //     type: Schema.Types.ObjectId,
        //     ref: "Video"
        // }
    },
    {
        timestamps: true
    })


export const User = mongoose.model("User",userSchema)
//module.exports = mongoose.model("User", userSchema)
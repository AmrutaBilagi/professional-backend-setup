import mongoose from 'mongoose';

const videoSchema=new Schema(
    {
        videofile:{  //cloudinary URL
            type:String,
            required:true
        },
        thumbnail:{       //cloudinary URL
            type:String,
            required:true
        },
        title:{
            type:String,
            required:true
        },
        description:{
            type:String,
            required:true
        },
        duration:{
            type:Number,
            required:true
        },
        views:{
            type:Number,
            default:0
        },
        isPublished:{
            type:Boolean,
            required:true
        },
        owner:{
            type:Schema.Types.ObjectId,
            ref:"User"
        }
},

{
    timestamps:true

})


export const Video=mongoose.model("Video",videoSchemaSchema)
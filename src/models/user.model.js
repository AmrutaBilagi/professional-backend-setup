import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2';
import { JsonWebTokenError } from 'jsonwebtoken';

const userSchema=new Schema(
    {
        username:{
            type:String,
            required:true,
            unique:true,
            lowercase:true,
            trim:true,
            index:true
        },
        email:{
            type:String,
            required:true,
            unique:true,
            lowercase:true
        },
        fullname:{
            type:String,
            required:true

        },
        avatar:{   //cloudinary url
            type:String,
            required:true
        },
        coverImage:{        //clodinary url
            type:String,
            required:true
        },
        password:{
            type:String,
            required:[true,"password is required"]
        },
        refreshToken:{
            type:String
        },
        watchhistory:{
            type:Schema.Types,ObjectId,
            ref:"Video"
        }
    },
    {
        timestamps:true
    })

userSchema.pre("save",async function(next){
    if(!this.isModified("password"))
        return next();    
    this.password=bcrypt.hash(this.password) //password->hash code
    next()
})

//checks password is correct then login
userSchema.methods.isPasswordCorrect = async function(password){
   return bcrypt.compare(password,this.password)
}

userSchema.methods.generateAccessToken=function(){
  JsonWebTokenError.sign(
    {
        _id:this._id,
        email:this.email,
        username:this.username
    },
    process.env.ACCESS_TOKEN_SECRET,{
        expiresIn:process.env.ACCESS_TOKEN_SECRET_EXPIRES_IN
    }
  )
}


userSchema.methods.generateRefreshoken=function(){
     JsonWebTokenError.sign(
    {
        _id:this._id,
       
    },
    process.env.REFRESH_TOKEN_SECRET,{
        expiresIn:process.env.REFRESH_TOKEN_SECRET_EXPIRES_IN
    }
  )
}

export const user=mongoose.model("User",userSchema)
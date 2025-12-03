import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDB = async () => {
  
  try {
    console.log("connection of mongodb"+process.env.MONGODB_URI);
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB Connected");
  } catch (err) {
    console.error("MONGODB CONNECTION ERROR:", err);
    process.exit(1);
  }
};

export default connectDB;
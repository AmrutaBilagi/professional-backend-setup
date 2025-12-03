import dotenv from "dotenv";
import connectDB from "./db/db.js";
import { app } from "./app.js";

// Load environment variables from project root `.env`
dotenv.config();

connectDB()
    .then(() => {
        app.listen(process.env.PORT || 8000, () => {
            console.log(`server is starting at port: ${process.env.PORT || 8000}`);
        });
    })
    .catch((error) => {
        console.log("MongoDB Connection Failed!!!", error);
    });
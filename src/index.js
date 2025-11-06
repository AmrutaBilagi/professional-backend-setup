import connectDB from "./db/db.js";
import dotenv from "dotenv";
import { app } from "./app.js";

// Load environment from project root `.env` by default.
dotenv.config();

// connectDB is an async function — call it to get a Promise
connectDB()
    .then(() => {
        app.listen(process.env.PORT || 8000, () => {
            console.log(`server is starting at port: ${process.env.PORT || 8000}`);
        });
    })
    .catch((error) => {
        console.log("MongoDB Connection Failed!!!", error);
    });
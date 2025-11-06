import express from 'express'
import cookieParser from 'cookie-parser'  //dependency imports
import cors from 'cors'

const app=express()

app.use(cors({
    origin:process.env.CORS_ORIGIN || '*',
    Credentials:true
}
   
))
app.use(express.json({limit:'16kb'}))
app.use(express.urlencoded(({extended:true,limit:"16kb"})))
app.use(express.static("public"))
app.use(cookieParser)

//routs import
import UserRoutes from "./routes/user.routes.js"
app.use("/users",UserRoutes)

//http://localhost:8000/users/register/login
export {app}
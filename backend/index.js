 import express from "express";
 import mongoose from "mongoose";
 import bodyparser from "body-parser";
import userRouter from "./routers/userRouter.js";
 import jwt from "jwtwebtoken";
import productRouter from "./routers/productRouter.js";
import dotenv from "dotenv"
dotenv.config()


 const app = express();
 
 app.use(bodyparser.json())
 app.use(
   (req,res,next)=>{
        const value = req.header("Authorization") 
        if(value != null){
             const token = value.replace("Bearer ","")
             jwt.verify(
                    token,
                    process.env.JWT_SECRETS,
                     (err,decoded)=>{
                        if(decoded == null){
                           res.status(403).json({
                              message : "unauthorize"
                           })
                        }else{
                           req.user = decoded
                           next()
                        }
                     
                     }

               )

          }else{
             next() 
          }
        
   }
 )

 const connectingString =  process.env.MONGO_URI
 mongoose.connect(connectingString).then(
    ()=>{
        console.log("Database connected")
    }
 ).catch( ()=>{
    console.log("Fail to connect to the database")
 })

 

 

 app.use("/users",userRouter)
 app.use("/products",productRouter)


app.listen(5000 ,()=>{
    console.log("server started")
} 
    
)
import express,{Application,Request,Response,NextFunction} from "express";
import createHttpError, { HttpError } from "http-errors";
import { config } from "./config/config";

const app:Application=express()


//ROUTES
//Http methods get post put patch delete
app.get('/',(req:Request,res:Response,next:NextFunction)=>{
    const error=createHttpError(400,"Something went wrong")
    throw error;
    res.json({message:'welcome to elib apis'});
})





//Global Error handler

app.use((err:HttpError,req:Request,res:Response,next:NextFunction):object=>{
   const statusCOde=err.statusCOde || 500;
   return res.status(statusCOde).json({
    message:err.message,
    errorStack: config.env==='development'?err.stack:'', //in production process we didnot user err.stack othwerwise it will give all data to hacker why error
   })
})

export default app
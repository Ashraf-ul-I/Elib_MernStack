import express,{Application,Request,Response,NextFunction} from "express";
import globarlErrorHandler from "./middlewares/globalErrorHandlers";

const app:Application=express()


//ROUTES
//Http methods get post put patch delete
app.get('/',(req:Request,res:Response,next:NextFunction)=>{
    res.json({message:'welcome to elib apis'});
})





//Global Error handler
app.use(globarlErrorHandler)


export default app
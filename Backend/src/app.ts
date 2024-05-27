import express,{Application,Request,Response,NextFunction} from "express";
import globarlErrorHandler from "./middlewares/globalErrorHandlers";
import userRouter from "./user/userRouter";

const app:Application=express()


//ROUTES
//Http methods get post put patch delete
app.get('/',(req:Request,res:Response,next:NextFunction)=>{
    res.json({message:'welcome to elib apis'});
})

app.use('/api/users/',userRouter);



//Global Error handler
app.use(globarlErrorHandler)


export default app
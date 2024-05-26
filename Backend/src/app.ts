import express,{Application,Request,Response,NextFunction} from "express";

const app:Application=express()


//ROUTES
//Http methods get post put patch delete
app.get('/',(req:Request,res:Response,next:NextFunction)=>{
  
    res.json({message:'welcome to elib apis'});
})


export default app
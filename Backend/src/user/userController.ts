import { NextFunction,Request,Response } from "express"
import createHttpError from "http-errors"
import User from './userModels'
const createUser=async (
    req:Request,

    res:Response,

    next:NextFunction
):Promise<void>=>{
        
    const {name,email,password}=req.body
    //Validation

    if(!name||!email||!password){
        const error=createHttpError(400,"All Fields are required");
        return next(error);
    }
    //database Call

    const user = await User.findOne({
        email:email,
    })
    if(user){
        const error=createHttpError(404,'User already exist with this email')
        return next(error);
    }
    
    //Process
    //Response
    res.json({ message: "User registered" })
}

export {createUser}
import { NextFunction,Request,Response } from "express"
import createHttpError from "http-errors"
import User from './userModels'
import bcrypt from 'bcrypt'
import { sign } from "jsonwebtoken"
import { config } from "../config/config"

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
        email:email, //means if the email is similiar to email then find
    })
     //Process
    if(user){
        const error=createHttpError(404,'User already exist with this email')
        return next(error);
    }
    ///password not stored as plain
    const hashedPassword=await bcrypt.hash(password,10)
   
    const newUser=await User.create({
       name,
       email,
       password:hashedPassword //in schema we name this as password so if we save like only 
       //hashpassword it will throw error so we save that as password:hashedPassword
    });

    //Token Generation
    const token= sign({sub:newUser._id},config.jwtSecret as string,{expiresIn:'7d'});
    
    //Response
    res.json({accessToken:token});
    res.json({ message: "User registered" })
}

export {createUser}
import { error } from "console";
import { config } from "./config";
import mongoose, { mongo } from "mongoose";

const connectDB=async ()=>{
   try {
    
    mongoose.connection.on('connected',()=>{
        console.log("Connected to database succesfully ");
    })

    mongoose.connection.on('error',(err)=>{
        console.log("Error in connecting to database.",err);
    })

    await mongoose.connect(config.databaseUrl as string);

   } catch (error) {
     
     console.error("Failed to connect to database.",error);
     process.exit(1);
   }
}

export default connectDB;
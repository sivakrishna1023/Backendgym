import jwt from "jsonwebtoken";
import { Members } from "../models/member";
import { Users } from "../models/user";
import ErrorHandler from "../helpers/errorhandle";
import { NextFunction,Response,Request } from "express";
import {sendtoken} from "../helpers/sendtoken";
//Register a New Admin
export const rigisteruser = async(req: Request,res: Response,next :NextFunction)=>{
          const {name,email,password}= req.body;
          const isexist= await Members.findOne({gmail:email});
          if(isexist){
            return next(new ErrorHandler(`The Mail have already used try another`,401));
          }else{
                const user= await Members.create({
                    name:name,
                    gmail:email,
                    Password:password
                })
                await user.save();
            sendtoken(user,200,res);
          }
};
// creating the admin login
export const loginuser=async(req:Request,res:Response,next: NextFunction)=>{
    const {email,password}=req.body;
    if(!email || !password){
        return next(new ErrorHandler(`Please enter the Email and the Password`,401));
    }
    const user=await Members.findOne({gmail:email}).select("+Password");
    if(!user){
        return next(new ErrorHandler(`Please enter a valid email`,401));
    }
    const ispasswordmatch= await user.comparepassword(password);
    if(!ispasswordmatch) {
        return next(new ErrorHandler(`Password doesn't match`,403));
    }
    sendtoken(user,200,res);
}

//create the getting all users
export const getallusers=async(req:Request,res:Response,next:NextFunction)=>{
        const users= await Users.find();
        res.status(200).json({
            success:true,
            users,
        })
}
//create each user update with given data
export const updateuser=async(req:Request,res:Response,next:NextFunction)=>{
           let user=Users.findById(req.params.id);
           if(!user){
            return next(new ErrorHandler(`User Not found to update details`,403));
           }else{
            const data=req.body;
            var updated=await Users.findByIdAndUpdate(req.params.id,req.body);
            res.status(200).json({
                message:`Succefully updated`,
                success:true,
                updated,
            })
           }
          
}
//create a user can be deleted 
export const deleteuser=async(req:Request,res:Response,next:NextFunction)=>{
        let user=Users.findById(req.params.id);
        if(!user){
            return next(new ErrorHandler(`User Not found to delete operations`,403));
        }else{
            await Users.findByIdAndDelete(req.params.id);
            res.status(200).json({
                message:`Sucessfully deleted the user`,
                sucess:true,
            })
        }
}
//create a new user 
export const createuser=async(req:Request,res:Response,next:NextFunction)=>{
        const {email}=req.body;
        const isexisting=await Users.findOne({gmail:email});
        if(isexisting){
            return next(new ErrorHandler(`The user of this mail already exists`,403));
        }else{
            const user=await Users.create(req.body);
            res.status(200).json({
                message:`The User Created successfully`,
                success:true,
            })
        }
}
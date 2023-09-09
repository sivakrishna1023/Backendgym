import jwt from "jsonwebtoken";
import { Users } from "../models/user";
import ErrorHandler from "../helpers/errorhandle";
import { NextFunction,Response,Request } from "express";
import {sendtoken} from "../helpers/sendtoken";
export const rigisternew = async (req:Request,res:Response,next:NextFunction)=>{
      const {email,password}=req.body;
      const isexits=await Users.findOne({gmail:email});
      if(isexits){
             return next(new ErrorHandler(`The User with this email already exists`,401));
      }
      const  newone= await Users.create({
        gmail:email,
        password:password,
      });
      res.status(200).json({
        success:true,
        newone,
      })
}
export const loginusers= async (req:Request,res:Response,next:NextFunction)=>{
    const {email,password}=req.body;
    const user=await Users.findOne({gmail:email});
    if(!user){
        return next(new ErrorHandler(`The User with this email is not exists`,401));
    }
    const istrue=user.comparepassword(password);
    if(!istrue){
        return next(new ErrorHandler(`Entered the wrong Password`,403));
    }
    sendtoken(user,200,res);
}
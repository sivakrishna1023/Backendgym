import { Response } from "express";
import ErrorHandler from "./errorhandle";
export const sendtoken= async (user:any,sendStatus:number,res:Response)=>{
      const token= await user.getJWTToken();
      //options for cookiees
      const time=process.env.EXPIRESIN as string;
      const options={
        expires:( new Date(Date.now()+ parseInt("1")*60*60)),
        httpOnly: true,
      }
      res.status(sendStatus).cookie("token",token,options).json({
        success:true,
        user,
        token,
      }); 
}

import jwt from "jsonwebtoken";
import { Members }  from "../models/member";
import ErrorHandler from "../helpers/errorhandle";
import {NextFunction,Response,Request} from 'express';
import dotenv from 'dotenv';
dotenv.config();

export const isAuthenticatedUser=(req:Request,res:Response,next:NextFunction)=>{
        const token=req.headers.token as string;
        if(!token){
            return next(new ErrorHandler(`Token not found invalid auth`,401));
        }else{
                  const Secret=process.env.SECRET as string;
                  jwt.verify(token,"123", (err:any, payload:any ) => {
                        if (err) {
                          return next(new ErrorHandler(`Error in verifying the token`,403));
                        }
                        if(!payload || typeof payload==="string" ){
                          return next(new ErrorHandler(`Error in verifying the token`,403));
                        }
                        req.headers["userId"]=payload.id; 
                        // req.userId = user.id;
                        next();
                 });
        }    
} 

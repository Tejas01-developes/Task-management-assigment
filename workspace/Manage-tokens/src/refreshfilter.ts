import {Request, Response } from "express"
import jwt, { JwtPayload } from 'jsonwebtoken';
import { accesstoken } from "./generate-token.js";


// interface customreq extends Request{
//     id?:string
// }
export const refreshfilter=(req:Request,resp:Response)=>{
    const token=req.cookies.refresh
   

    if(!token){
       return resp.status(400).json({success:false,message:"refresh token is not there"})
    }
try{
const decode=jwt.verify(token,process.env.REFRESH_KEY as string) as JwtPayload
const id=decode.id
if(!id){
    return resp.status(400).json({success:false,message:"userid is not decoded"})
}
const access=accesstoken(id)
return resp.status(200).json({success:true,access,id})
}catch(err){
    return resp.status(400).json({success:false,message:"refresh filter failed"})
}

}
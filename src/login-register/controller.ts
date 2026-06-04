import { Request, Response } from "express";
import bcrypt from 'bcrypt';
import user_collection from "../schemas/user-schema.js";
import { accesstoken, refreshtoken } from "../../workspace/Manage-tokens/dist/generate-token.js";
import refresh_collection from "../schemas/refresh-schema.js";

export const registeruser=async(req:Request,resp:Response):Promise<void>=>{
    const{name,email,password}=req.body as {
        name:string,
        email:string,
        password:string
    }

    if(!name || !email || !password){
         resp.status(400).json({succes:false,message:"Fields are missing"})
           return
    }
    const hash:string=await bcrypt.hash(password,10)
    const userid:string=crypto.randomUUID()
    try{
    await user_collection.create({id:userid,name,email,password:hash})
    resp.status(200).json({success:true,message:"registration success"})
 return
    }catch(err){
        resp.status(400).json({succes:false,message:"Registration failed"})
        return
    }

}


export const loginuser=async(req:Request,resp:Response)=>{
    const {email,password}=req.body as {
        email:string,
        password:string
    }
    if(!email || !password){
        return resp.status(400).json({success:false,message:"Fields are empty"})
    }
try{
    const res=await user_collection.findOne({email})
    if(!res){
        return resp.status(400).json({success:false,message:"result is empty"})
    }
    const compare=await bcrypt.compare(password,res.password)
    if(!compare){
        return resp.status(400).json({success:false,message:"password is incorrect"})
    }
    const id=res.id;
    const access:string=accesstoken(id)
    let refresh:string;

    const refreshres=await refresh_collection.findOne({userid:id})
    if(!refreshres){
        refresh=refreshtoken(id)
        const refreshid=crypto.randomUUID()
        await refresh_collection.create({id:refreshid,userid:id,token:refresh,added_at:Date.now(),expired_at:new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)})
    }else{
        const now=Date.now()
        const expireddate=refreshres.expired_at
        if(now > expireddate.getTime()){
            refresh=refreshtoken(id)
            await refresh_collection.updateOne({userid:id},{$set:{token:refresh,added_at:Date.now(),expired_at:new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)}})
        }else{
            refresh=refreshres.token
        }
    }
    resp.cookie("refresh",refresh,{
        httpOnly:true,
        sameSite:"lax",
        secure:true,
        path:"/"
    })
    return resp.status(200).json({success:false,message:"Login success"})
}catch(err){
    console.log(err)
    return resp.status(400).json({success:false,message:"login failed"})
}
}
import { Request, Response } from "express";
import bcrypt from 'bcrypt';
import user_collection from "../schemas/user-schema.js";
import { accesstoken, refreshtoken } from "../../workspace/Manage-tokens/dist/generate-token.js";
import refresh_collection from "../schemas/refresh-schema.js";
import task_collection from "../schemas/task-schema.js";

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
    try{
    const res=await user_collection.findOne({email})
    if(!res){
        const hash:string=await bcrypt.hash(password,10)
        const userid:string=crypto.randomUUID()
       
        await user_collection.create({id:userid,name,email,password:hash})
        resp.status(200).json({success:true,message:"registration success"})
     return
    }else{
        resp.status(400).json({succes:false,message:"Email is already registered"})
           return 
    }

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
        return resp.status(400).json({success:false,message:"Email is not registered"})
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
    return resp.status(200).json({success:true,message:"Login success",access})
}catch(err){
    console.log(err)
    return resp.status(400).json({success:false,message:"login failed"})
}
}

interface cutomreq extends Request{
    id?:string
}
export const addtask=async(req:cutomreq,resp:Response)=>{
const{title,description}=req.body as {
    title:string,
    description:string
}
if(!title || !description){
    resp.status(400).json({succes:false,message:"Fields are missing"})
    return
}
try{
    const userid:string=req.id as string
    console.log(userid)
    const taskid:string=crypto.randomUUID()
    await task_collection.insertOne({id:taskid,userid,title,description})
    return resp.status(200).json({success:true,message:"task succesfully added"})
}catch(err){
    resp.status(400).json({succes:false,message:"Task adding failed"})
    return
}
}





export const gettasks=async(req:cutomreq,resp:Response)=>{
const userid=req.id
if(!userid){
    return resp.status(400).json({success:false,message:"userid is not present"})
}

try{
    const page=parseInt(req.query.page as string) || 1
    const limit:number=2
    const skip=(page-1) * limit
const res=await task_collection.aggregate([
    {$match:{userid:userid}},
    {$skip:skip},
    {$limit:limit}
    
])
if(res.length === 0){
    return resp.status(400).json({success:false,message:"No more tasks"})
}
return resp.status(200).json({success:true,result:res})
}catch(err){
    return resp.status(400).json({success:false,message:"Task fetch failed from the server"})
}
}

export const updatestatus=async(req:Request,resp:Response)=>{
const{taskid}=req.query as {
    taskid:string
}
if(!taskid){
    return resp.status(400).json({success:false,message:"no task id recived"})
}
try{
await task_collection.updateOne({id:taskid},{$set:{status:"Complected"}})
return resp.status(200).json({success:true,message:"Task complet"})
}catch(err){
    return resp.status(400).json({success:false,message:"status update failed"})
}
}

export const getfiltertasks=async(req:Request,resp:Response)=>{
const{status,userid}=req.body as{
    status:string,
    userid:string
}
if(!status || !userid){
    return resp.status(400).json({success:false,message:"no status"})
}
try{
const get=await task_collection.aggregate([
    {$match:{userid}},
    {$match:{status}}
])
return resp.status(200).json({success:true,tasks:get})
}catch(err){
    return resp.status(400).json({success:false,message:"filter task fetch failed"})
}
}
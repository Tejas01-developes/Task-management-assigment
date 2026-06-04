import mongoose from "mongoose";

const userschema=new mongoose.Schema({
id:{
type:String,
required:true,
unique:true
},

name:{
    type:String,
    required:true,
},

email:{
    type:String,
    required:[true,"email is required"],
    unique:true
},

password:{
    type:String,
    required:true,
}

},{timestamps:true})

const user_collection=mongoose.model("users",userschema)
export default user_collection
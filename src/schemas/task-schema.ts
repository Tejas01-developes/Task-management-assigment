import mongoose from "mongoose";

const taskschema=new mongoose.Schema({

id:{
    type:String,
    required:true,
    unique:true
},
userid:{
    type:String,
    required:true,
    
},
title:{
    type:String,
    required:true,
   
},
description:{
    type:String,
    required:true
},

status:{
    type:String,
    enum:["Pending","Completed"],
    default:"Pending",
    trim:true
}
})
const task_collection=mongoose.model("tasks",taskschema)
export default task_collection;
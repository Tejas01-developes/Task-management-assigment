import mongoose from "mongoose";

const refreshschema=new mongoose.Schema({

id:{
    type:String,
    required:true,
    unique:true
},

userid:{
    type:String,
    required:true,
    unique:true
},


token:{
    type:String,
    required:true,
    unique:true
},

added_at:{
    type:Date,
    default:Date.now()
},

expired_at:{
    type:Date,
   required:true
}


})

const refresh_collection=mongoose.model("refresh",refreshschema);
export default refresh_collection
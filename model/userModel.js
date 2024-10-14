
const mongoose=require('mongoose')

//schema 
const userSchema=new mongoose.Schema(
    {
    fullname:{type:String},
    email:{type:String},
    password:{type:String},
    mobile:{type:String},

}
,{timestamps:true})

const userModel=mongoose.model("user_tbl",userSchema)

module.exports=userModel
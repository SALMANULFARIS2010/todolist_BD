const main=require('../model/database')
const JWT=require('jsonwebtoken')
main().catch(err=>console.log(err))

const userModel=require("../model/userModel")
// const pModel=require("../model/profilemodel")
const bcrypt=require('bcrypt')
const salt=10;



const login=async(req,res)=>{
    const {email,password}=req.body;
    const record=await  userModel.find({email})
    if(record.length>0){
        const dbpassword=record[0].password;
        bcrypt.compare(password,dbpassword,function(err,result){
            if(result){
                //token create 
                const token =JWT.sign({data:record},'ecome',{expiresIn:'1hr'})
                console.log(token)
                res.json({status:1,msg:'login success',
                    userid:record[0]._id,
                    username:record[0].fullname
                    ,token:token

                })
                res.end()
            }
            else{
                res.json({status:0,msg:"incorrect password"})
            }
        })
    }
    else{
        res.json({status:0,msg:"incorrect email"})
    }
}
const register=async(req,res)=>{
   const {fullname,email,password,mobile}=req.body
   const record=await  userModel.find({email:email})
   if(record.length>0){
    res.json("email already existing")
    res.end()
   }
   else{
    bcrypt.hash(password,salt,function(err,hashpassword){
        const user=new userModel({
            fullname,email,
            password:hashpassword,
            mobile
        })
        user.save()
        res.json("register Successfully")
        res.end()

       
    })
   }
  
}


module.exports={
    register,
    login,
    // uploadimage,
    // profileuser
}
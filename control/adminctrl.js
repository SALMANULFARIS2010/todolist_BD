// const adminModel=require("../model/adminschema")

// const adminReg=async (req,res)=>{
//     const{username,password}=req.body
//    adminModel.create({
//         username,
//         password,
//         status:"1"
//     })
//     res.json({msg:"admin register sucessfully"})
// }

// const adminLogin=async (req,res)=>{
//     const{username,password}=req.body
//    const record=await adminModel.find({
//         username,
//         password,
       
//     })
//     if(record.length>0){
//       res.json({status:1,username:record[0].username})
//     }
//     else{
//         res.json({status:0})
//     }
//     // res.json({msg:"admin register sucessfully"})
// }
// module.exports={
//     adminReg,
//     adminLogin
// }
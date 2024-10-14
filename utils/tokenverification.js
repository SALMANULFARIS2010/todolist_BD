const JWT=require('jsonwebtoken')
const tokenVerification=(req,res,next)=>{
    const token=req.headers.token;
    console.log("token")
    console.log(token)
    JWT.verify(token,'ecome',(err,decoded)=>{
         if(err){
            res.json({status:0,msg:"invalid  Token"})

           
         }
         else{
            return next()
         }
    })


}

module.exports=tokenVerification;
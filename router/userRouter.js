const express=require('express');
const multer=require('multer')


const userrouter = express.Router();

const {register,login}=require("../control/userCtrl")

userrouter.route("/register").post(register) //http://localhost:9000/user/register
userrouter.route("/login").post(login)

module.exports=userrouter
const express=require("express");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");

const {Logmodel}=require("../model/login")

const userRouter=express.Router();

userRouter.post("/signup",async(req,res)=>{
    const {email,password}=req.body;
    const ispresent=await Logmodel.findOne({email})
    if(ispresent?.email){
     res.send({"msg":"user already present"})
    }else{
         try{
             bcrypt.hash(password, 10 ,async function(err, hash) {
                 const user=new Logmodel({email,password:hash})
                 await user.save();
                 res.send({"msg":"user added"})
             });
         }
         catch(err){
             res.send({"msg":"try again"})
             console.log(err)
         }
     }
 })

 userRouter.post("/login",async(req,res)=>{
    const {email,password}=req.body
    try{
        const user=await Logmodel.find({email})
        if(user.length>0){
            const secret=user[0].password
            bcrypt.compare(password, secret, function(err, result) {
                if(result){
                    const token = jwt.sign({ "userID": user[0]._id }, 'eval');
                    res.send({"msg":"login successful","token":token})
                }else{
                    res.send({"msg":"login failed"})
                }
            });
        }else{
            res.send({"msg":"wrong credentials"})
        }
    }
    catch(err){
        res.send({"msg":"invalid request"})
        console.log(err)
    }
})
const {UserModel}=require("../model/User.Model");
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userRouter = express.Router();

userRouter.post("/register",async (req,res)=>{
  const {email,password,name,gender,age,city}=req.body
  try{
      bcrypt.hash(password, 5, async (err, hash) => {
          if(err) res.send({"msg":"Something went wrong","error":err.message})
          else {
              const user=new UserModel({email,password:hash,name,gender,age,city})
              await user.save()
              res.send({"msg":"New Users has been registered"})
          }
      });
        
  }catch(err){
      res.send({"msg":"Something went wrong","error":err.message})
  }
})


  userRouter.post("/login", async (req, res) => {
    const { email,password} = req.body;
    try {
        const user = await UserModel.find({ email});
        if (user.length > 0) {
          bcrypt.compare(password, user[0].password, (err, result)=> {
              console.log(user[0],password)
            
              if(result)
              {
                
                 const token = jwt.sign({ userID:user[0]._id }, "masai");
                  res.send({ "msg": "login successful", "token": token });
                
              }
              else
              {
                  res.send(  {"msg":"wrong credentials"})
              }
            
          });
         
        } else {
          res.send({"msg":"user id not registered"});
        }
      } catch (err) {
        console.log("something went wrong in login");
      }
    
  });

  module.exports={
    userRouter
  }
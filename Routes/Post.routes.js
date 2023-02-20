const express=require("express")
const jwt=require("jsonwebtoken");
const {PostModel}=require("../model/Post.Model")
const postRouter=express.Router()

    postRouter.get("/",async(req,res)=>{
        const token=req.headers.authorization;
        jwt.verify(token,"masai",async(err,decoded)=>{
            if(decoded){
                console.log(decoded)
                try{
                    const notes=await PostModel.find({user:decoded?.userID})
                    res.send(notes)
                    
            }catch(err){
                res.send({"msg":"Something went wrong","error":err.message}) 
            
            }
             
            }else{
                res.send({msg:"You aren't authorized"})
            }
        });
        })

  




postRouter.post("/create",async (req,res)=>{
    const payload=req.body
    try{
        const note= new PostModel(payload)
        await note.save()
        res.send({"msg":"Note Created"})

    }catch(err){
        res.send({"msg":"Something went wrong","error":err.message})  
    }
 
})

postRouter.delete("/delete/:id",async(req,res)=>{
    const noteID=req.params.id
    try{
        await PostModel.findByIdAndDelete({_id:noteID})
        res.send({"msg":`Note with id: ${noteID} has been deleted`})

    }catch(err){
        res.send({"msg":"Something went wrong","error":err.message})  
    }
 
})


postRouter.patch("/update/:id",async(req,res)=>{

    const noteID=req.params.id
    const payload = req.body;
  console.log(noteID)
    try{
    
            await PostModel.findByIdAndUpdate({_id:noteID},payload)
            res.send(`id ${noteID} has been updated`)

        }catch(err){
        res.send({"msg":"Something went wrong","error":err.message})  
    }
  
  
})

module.exports={
    postRouter
}
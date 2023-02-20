const {connection}=require("./config/db");
const express=require("express")
const {userRouter}=require("./Routes/User.routes")
const {postRouter}=require("./Routes/Post.routes")
const {authenticate}=require("./middlewares/authenticate")

const cors=require("cors")
require("dotenv").config()

const app=express()
app.use(express.json())
app.use(cors())


app.get("/",(req,res)=>{
    res.send("Home Page")
})

app.use("/users",userRouter)
app.use(authenticate)
app.use("/post",postRouter)


app.listen(process.env.port, async()=>{ 
    try{
    await connection
    console.log("connected to DB")

        }
        catch{
    console.log("not connected to DB")
        }
   
    console.log("server running at port 8080")
})
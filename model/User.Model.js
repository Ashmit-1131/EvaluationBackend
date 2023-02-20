const mongoose=require("mongoose")

userSchema=mongoose.Schema({
    name : String,
    email :String,
    gender :String,
    password :String,
    age : Number,
    city : String
})

const UserModel=mongoose.model("user",userSchema)


module.exports={
    UserModel
}
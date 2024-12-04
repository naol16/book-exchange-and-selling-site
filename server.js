const express= require('express')
const dotenv= require('dotenv')
const mongoose=require("mongoose")
const port =process.env.port ||3421
const app =new express()
//mongodb+srv://lemesanaol93:onlinedatabase@cluster0.thhz3.mongodb.net/
dotenv.config();
app.use(express.json())
const connection= async()=>{
    try{
        await mongoose.connect(
            process.env.mongodbdburl,{
            useNewUrlParser:true,
            useUnifiedTopology:true
        }
    )
    console.log("connected to the  database successfully")
    }
    catch(error){
        console.error("there is error ",error)
    }
}
connection();
app.listen(
    port,()=>{
        console.log("listeing to port http:localhost:3421"
        )
    }

)
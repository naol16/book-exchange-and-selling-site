const mongoose=require("mongoose")


const BookSchema=mongoose.Schema(
    {
        name:String,
        image:{
            data:Buffer,
            contentType:String

        },
        cost:String,
        transferbook:String,
        genera:String
    }
)
const UserSchema= mongoose.Schema(
  { name:String,
    username:String,
    email:String,
    password:String,
    books:[BookSchema]
}

)
const  User=mongoose.model("User",UserSchema)
const  Books=mongoose.model("Books",BookSchema)
module.exports={User,Books}
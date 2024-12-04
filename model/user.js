const mongoose=require("mongoose")


const BookSchema=mongoose.Schema(
    {
        name:String,
        image:String,
        cost:String,
        transferbook:String
    }
)
const UserSchema= mongoose.Schema(
  { name:String,
    username:String,
    email:String,
    books:[BookSchema]

  }

)
const usermodel=UserSchema.createmodel("user",UserSchema)
module.exports=usermodel
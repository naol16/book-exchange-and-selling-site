const mongoose=require("mongoose")


const BookSchema=mongoose.Schema(
    {
        name:String,
        image:String,
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
const  User=UserSchema.model("User",UserSchema)
module.exports=User
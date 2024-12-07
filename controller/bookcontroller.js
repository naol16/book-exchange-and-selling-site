const{User,Books}=require("../model/user");

async function updating(req,res){
    const userid= req.params.id
    const {bookid, name,image, cost, transferbook,genera}=req.body
    try{
    const user= await User.find({_id,userid})
    const books=user.books
    for (let i=0; i<=books.length;i++){
        if(books[i]._id===bookid){
            const books= await Books.findById(bookid);
           await books.set({
                name:name,
                image:image,
                cost:cost,
                transferdbook:transferbook,
                genera:genera})
        }
         const newbook=books.save();
        books[i]=newbook
        res.status(201).json({messge:'updated successfully'})
    }
}
catch(error){
    console.error("message error",error)
}
    }


async function deleting(req,res){
const userid =req.params.id
const {bookid, name,image, cost, transferbook,genera}=req.body
const user = User.findById(userid);
const books=user.books;
for(let i=0; i<books.length;i++){
  if(books._id===bookid){
    const deletedobject= await Books.findByIdAndRemove(bookid)
  }
}

}
async function adding(req,res){
 const userid=req.params.id
 const user= await User.find({_id:userid})
 const { name,image, cost, transferbook,genera}=req.body
 const newbook= new Books({
    name:name,
    image:image,
    cost:cost,
    transferbook:transferbook,
    genera:genera
 })
 try{
const booksaved= await newbook.save() 
user.books.push(booksaved)
}
catch(error){
    console.log("there is error",error)
}

}

module.exports={updating,deleting,adding}
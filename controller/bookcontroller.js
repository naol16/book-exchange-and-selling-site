const{User,Books}=require("../model/user");
const mongoose=require("mongoose")

async function updating(req,res){
    const userid=req.params.id;
    const bookid=req.params.bookid;
    const {name,image, cost, transferbook,genera}=req.body
    try{
    console.log(userid)
    console.log(bookid)
    const user= await User.findById(userid)
    console.log(user)
    let books=user.books
    for (let i=0; i<books.length;i++){
        if(books[i]._id.toString()==bookid){
        const book= await Books.findById(bookid);
        console.log(book);
           await book.set({
                name:name,
                image:image,
                cost:cost,
                transferbook:transferbook,
                genera:genera})
            const newbook = await book.save();
            books[i]=newbook
            console.log(newbook)
        }
         }
    user.books=books
   const  newuser = await user.save()
    res.status(201).json({messge:'updated successfully',newuser:newuser})
// here we can use filter find the  element which matchs with our choice 

}
catch(error){
    console.error("message error",error)
}
    }


async function deleting(req,res){
// I am at deleteing part
const userid =req.params.id
console.log(userid);
const {bookid}=req.body
console.log(bookid);
try{
const user = await User.findById(userid);
const books=user.books;
console.log(books)
// used filter function to find an element and deleted the element,
user.books=user.books.filter(function checker (book){
    console.log(book._id)
    return book._id.toString()!==bookid})
// here deleting the book from the  Books
const deleteobject = await Books.findByIdAndDelete(bookid);
//findByIdAndRemove
console.log(deleteobject);

const newuser = await user.save()
console.log(newuser);
res.status(200).send({message:`we deleted ${deleteobject}`})

}
catch(error){
    console.error("there is error",error)
}
}
async function listofuserbook(req,res){
    const userid = req.params.id
    try{
    const user= await User.findById(userid);
    const books=user.books
    // here the book wil contain the id 
    res.status(200).json({books:books});
    

    }
    catch(error){
        console.error("there is error",error)
    }

}
async function adding(req,res){
// here we use params and the backend can get it from the  localstorage.
try{
 const userid=req.params.id
 console.log(userid);
 const user= await User.findById(userid)
 console.log(user);
 const { name,image, cost, transferbook,genera}=req.body
 const newbook= new Books({
    name:name,
    image:image,
    cost:cost,
    transferbook:transferbook,
    genera:genera
 })
 
const booksaved= await newbook.save() 
user.books.push(booksaved)
const newuser=await user.save();
res.status(201).json({message:"book saved successfully",newuser:newuser})
}
catch(error){
    console.log("there is error",error)
}

}

module.exports={updating,deleting,adding,listofuserbook}
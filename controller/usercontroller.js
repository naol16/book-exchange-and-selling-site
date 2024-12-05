const User= require('../model/user')

function emailvalidation(email){
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email)

}
function passwordvalidation(password){
    const hasCapitalLetter = /[A-Z]/.test(password); 
    const hasSmallLetter = /[a-z]/.test(password); 
    const hasDigit = /\d/.test(password); 
    const hasSpecialChar = /[\W_]/.test(password);
    const lengthtruevalue= password.length>8;
    return hasCapitalLetter && hasSmallLetter && hasDigit && hasSpecialChar && lengthtruevalue;
    

}
async function signup(req,res){
    const{name,username,email,password}=req.body;
    if (!name || typeof name !== 'string' || !username || typeof username !== 'string' ||  !email || typeof email !== 'string' || !emailvalidation(email) || !passwordvalidation(password)){
       return res.status(400).send("you have not entered  the correct the data type or there is null value")
    }
    try{
    const newvalue=new User({
    name:name,
    username:username,
    email:email,
    password:password,
 })
   const saveduser=await newvalue.save();
   console.log("saveduser",saveduser);
    }
    catch(error){
        console.error("here is the error");
}

}
function signin(req,res){
    const{email,password}=req.body;
    if(!email || !emailvalidation(email) || !password || !passwordvalidation(password)){
        return res.status(400).send("check out you password or the email address")
}


}
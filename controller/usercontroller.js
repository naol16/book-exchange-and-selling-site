const {User,Books}= require('../model/user')
const bcrypt= require('bcrypt')
const saltround=10
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
function id(object){
    if (object){
        return res.status(200).json({id:object})
    }
    else{
        return res.status(409).json({unauthorized:'unauthorized user'})
    }
}
async function signup(req,res){
    const{name,username,email,password}=req.body;
    if (!name || typeof name !== 'string' || !username || typeof username !== 'string' ||  !email || typeof email !== 'string' || !emailvalidation(email) || !passwordvalidation(password)){
       return res.status(400).send("you have  entered  incorrect data type or there is null value")
    }
    const value= await User.find({email:email})
    console.log(value)
    if(value.length>=1){
         return res.status(409).json({error:'the user exists'})
     }
    try{
    const hashedpassword=await bcrypt.hash(password,saltround);
    const newvalue=new User({
    name:name,
    username:username,
    email:email,
    password:hashedpassword,
 })
   const saveduser=await newvalue.save();
   console.log("saveduser",saveduser);
   res.status(201).json({message:'user registetered successfully'})
    }
    catch(error){
        console.error("here is the error");
}

}
async function signin(req,res){
    const{email,password}=req.body;
    if(!email || !emailvalidation(email) || !password || !passwordvalidation(password)){
        return res.status(400).send("check out you password or the email address")
}
try{
    const hashed= await bcrypt.hash(password,saltround);
    const answer = await User.find({ email:email })
    if(answer.length<1){
        console.log(answer)
       return  res.status(401).send("user does not exist")
    }
    const bcryptvalue= await bcrypt.compare(password,answer[0].password)
    if (!bcryptvalue){
        return res.status(401).json({message:'incorrect password'})
    }
    const objectid=answer[0]._id;
    
    return res.status(200).json({welcome:answer[0].name,userId:objectid})
}

catch(error){
    console.error("there is error",error);
    
}

}
module.exports={signin,signup}

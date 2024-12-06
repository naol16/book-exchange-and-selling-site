const express=require("express")
const {signin,signup}=require("../controller/usercontroller")
const router=express.Router()
router.post('/login',signin)
router.post('/signup',signup)
module.exports=router
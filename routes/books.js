const express= require('express')
const router= express.Router()
const {addingbook,deletingbook,updatingbook}=require('../controller/bookcontroller')
//  router.post('/add',addingbook);
//  router.delete('/delete',deletingbook)
//  router.put('/updating',updatingbook)
module.exports=router
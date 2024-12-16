const express= require("express")
const router= express.Router()
const uploader=require('../middleware/multer')

const {updating,deleting,adding,listofuserbook}=require('../controller/bookcontroller')
router.post('/:id/add',uploader('image'),adding);
router.delete('/:id/delete',deleting);
router.put('/:id/updating/:bookid',updating);
router.get('/:id/allbooks',listofuserbook);

module.exports=router
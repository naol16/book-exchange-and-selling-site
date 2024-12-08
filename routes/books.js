const express= require("express")
const router= express.Router()

const {updating,deleting,adding,listofuserbook}=require('../controller/bookcontroller')
router.post('/:id/add',adding);
router.delete('/:id/delete',deleting);
router.put('/:id/updating',updating);
router.get('/:id/allbooks',listofuserbook);

module.exports=router
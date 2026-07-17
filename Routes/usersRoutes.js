const express=require("express");
const router=express.Router();

const authMiddleWare =require("../middleWare/auth")
const signController=require('../controllers/users/signup');
const loginController= require("../controllers/users/login")
const updateController= require ("../controllers/users/update")
const deletedController=require ("../controllers/users/deleted")
const getAllUserController=require ("../controllers/users/getAllUsers")



router.post('/signup',signController.createUser);
router.post('/login',loginController.signUser)
router.patch('/update',authMiddleWare,updateController.updateUser)
router.delete('/delete',authMiddleWare,deletedController.deleteUser)
router.get('/getUser',authMiddleWare,getAllUserController.allUser)

module.exports=router;
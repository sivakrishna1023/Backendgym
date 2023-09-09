import express from "express";
const router=express.Router();
import { isAuthenticatedUser } from "../middleware/auth";
import { 
    rigisteruser,
    loginuser,
    getallusers,
    updateuser,
    deleteuser,
    createuser, } from "../controllers/admin";
router.route('/rigister').post(rigisteruser);
router.route('/login').post(loginuser);
router.route('/allusers').get(isAuthenticatedUser,getallusers);
router.route('/update/:id').post(isAuthenticatedUser,updateuser);
router.route('/delete/:id').delete(isAuthenticatedUser,deleteuser);
router.route('/create/:id').post(isAuthenticatedUser,createuser);
export default router;
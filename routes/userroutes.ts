import express from "express";
const router=express.Router();
import { isAuthenticatedUser } from "../middleware/auth";
import {
    rigisternew,
    loginusers,
} from "../controllers/user"
router.route('/registeruser').post(rigisternew);
router.route('/loginuser').post(loginusers);
export default router;
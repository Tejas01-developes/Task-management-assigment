import express from 'express'
import { addtask, gettasks, loginuser, registeruser } from '../login-register/controller.js';
import { accessfilter } from '@workspace/Manage-tokens';
import { refreshfilter } from '@workspace/Manage-tokens';


const router=express.Router();

router.post("/register",registeruser)
router.post("/login",loginuser)
router.post("/posttask",accessfilter,addtask)
router.post("/refresh",refreshfilter)
router.get("/fetch",accessfilter,gettasks)

export default router
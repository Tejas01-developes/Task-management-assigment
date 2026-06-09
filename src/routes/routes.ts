import express from 'express'
import { addtask,deletetask,gettasks, loginuser, registeruser, updatestatus, updatetask } from '../login-register/controller.js';
import { accessfilter } from '@workspace/Manage-tokens';
import { refreshfilter } from '@workspace/Manage-tokens';


const router=express.Router();

router.post("/register",registeruser)
router.post("/login",loginuser)
router.post("/posttask",accessfilter,addtask)
router.post("/refresh",refreshfilter)
router.post("/delete-task",accessfilter,deletetask)
router.get("/fetch",accessfilter,gettasks)
router.patch("/status",accessfilter,updatestatus)
router.patch("/update-task",accessfilter,updatetask)
// router.patch("/filter",accessfilter,getfiltertasks)

export default router
import express from 'express';
import { addtask, getfiltertasks, gettasks, loginuser, registeruser, updatestatus } from '../login-register/controller.js';
import { accessfilter } from '@workspace/Manage-tokens';
import { refreshfilter } from '@workspace/Manage-tokens';
const router = express.Router();
router.post("/register", registeruser);
router.post("/login", loginuser);
router.post("/posttask", accessfilter, addtask);
router.post("/refresh", refreshfilter);
router.get("/fetch", accessfilter, gettasks);
router.patch("/status", accessfilter, updatestatus);
router.patch("/filter", getfiltertasks);
export default router;
//# sourceMappingURL=routes.js.map
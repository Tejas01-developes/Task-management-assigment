import express from 'express';
import { addtask, loginuser, registeruser } from '../login-register/controller.js';
import { refreshfilter } from '@workspace/Manage-tokens';
const router = express.Router();
router.post("/register", registeruser);
router.post("/login", loginuser);
router.post("/posttask", refreshfilter, addtask);
export default router;
//# sourceMappingURL=routes.js.map
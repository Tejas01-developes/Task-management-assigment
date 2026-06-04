import express from 'express';
import { loginuser, registeruser } from '../login-register/controller.js';
const router = express.Router();
router.post("/register", registeruser);
router.post("/login", loginuser);
export default router;
//# sourceMappingURL=routes.js.map
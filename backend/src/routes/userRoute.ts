import { Router } from "express";
import { register, doLogin } from "../controller/userController";
const router = Router();


router.post("/register", register);
router.post("/login",doLogin);


export default router;

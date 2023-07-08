import { Router } from "express";
import { register } from "../controller/userController";
const router = Router();



router.post("/register", register);


export default router;

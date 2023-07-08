import { Router } from "express";
import {
  register,
  doLogin,
  sendOtp,
  verifyOtp,
} from "../controller/userController";
import { addTodos, getTodos, updateTodos,deleteTodo} from "../controller/todoController";
const authChecker = require("../middleware/authHandler");

const router = Router();


router.post("/register", register);
router.post("/login",doLogin);
router.post("/todos",authChecker, addTodos);
router.get("/todo", authChecker, getTodos);
router.patch('/todo/:id',authChecker,updateTodos);
router.delete("/todo/:id",authChecker,deleteTodo);
router.post("/send-otp", sendOtp);
router.post("/verify-otp",verifyOtp);


export default router;

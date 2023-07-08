import { Router } from "express";
import { register, doLogin } from "../controller/userController";
import { addTodos, getTodos, updateTodos } from "../controller/todoController";
const authChecker = require("../middleware/authHandler");

const router = Router();


router.post("/register", register);
router.post("/login",doLogin);
router.post("/todos",authChecker, addTodos);
router.get("/todo", authChecker, getTodos);
router.patch('/todo/:id',authChecker,updateTodos)


export default router;

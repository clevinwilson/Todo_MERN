import asyncHandler from "express-async-handler";
import userModel from "../models/userModel";
import todoModel from "../models/todoModel";
import AppError from "../utils/errors";

export const addTodos = asyncHandler(async (req, res) => {
  const { text, status }: { text: string; status: boolean } = req.body;

  if (!text) throw new AppError(400, "all Fields required");

  const todo = new todoModel({
    userId: req.userId,
    text,
    status,
  });
  const newTodo = await todo.save();
  res.json({ success: true, newTodo });
});

export const getTodos = asyncHandler(async (req, res) => {
  let todos = await todoModel.find({ userId: req.userId });
  res.json({ success: true, todos });
});

export const updateTodos = asyncHandler(async (req, res) => {
  const { text }: { text: string } = req.body;
  if (!text) throw new AppError(400, "all Fields required");
  let updateTodo = await todoModel.updateOne(
    { _id: req.params.id },
    {
      $set: {
        text: text,
      },
    }
  );
  res.json({ status: true });
});

export const deleteTodo=asyncHandler(async(req,res)=>{
  if (!req.params.id) throw new AppError(400, "all Fields required");

  let deleteTodo = await todoModel.deleteOne({ _id: req.params.id });
  if(deleteTodo) res.json({ status: true, message: "Todo deleted successfully" });
})

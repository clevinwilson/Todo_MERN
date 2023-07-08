import asyncHandler from "express-async-handler";
import userModel from "../models/userModel";
const AppError = require('../utils/errors');
const bcrypt = require("bcrypt");


export const register = asyncHandler(async (req, res) => {
    const {email,password}:{email:string, password:string}=req.body;
    
    //checking the user exist
    if (!email || !password) throw new AppError(400, "all Fields required");
    const userExist = await userModel.findOne({ email: email });
    if (userExist) throw new AppError(409, "user already exists");

    //hashing the password
    const hashPass = await bcrypt.hash(password, 8);
    if (!hashPass) throw new Error("password hashing failed");

    const user = new userModel({
      email: email,
      password: hashPass,
    });
    await user.save();
    res.json({ success: true });
});

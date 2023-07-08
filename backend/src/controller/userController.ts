import asyncHandler from "express-async-handler";
import userModel from "../models/userModel";
import AppError from "../utils/errors";
const bcrypt = require("bcrypt");
const jwt = require("../utils/jwt");
const { sendVerificationCode } = require("../utils/sendOtp");

//user signup
export const register = asyncHandler(async (req, res) => {
  const { email, password }: { email: string; password: string } = req.body;

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

//user login
export const doLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  //checking the input
  if (!email || !password) throw new AppError(400, "all Fields required");

  //checking the user exist
  const userExist = await userModel.findOne({ email: email });
  if (!userExist) throw new AppError(400, "invalid email or password");

  //comparing the user password
  const match = await bcrypt.compare(password, userExist.password);
  if (!match) throw new AppError(400, "invalid email or password");
  const token = jwt.createToken(userExist._id);
  res.json({
    success: true,
    token,
  });
});

export const sendOtp = asyncHandler(async (req, res) => {
  const { email }: { email: string } = req.body;
  if (!email) throw new AppError(400, "Email required");
  let user = await userModel.findOne({ email: email });

  if (user) {
    sendVerificationCode(email)
      .then(async (response: object) => {
        let setOtp = await userModel.updateOne(
          { email: email },
          { $set: { otp: response.otp } }
        );
        res.json({ status: true, message: "OTP successfully send", email });
      })
      .catch((error: object) => {
        res.status(404).json({ status: false, message: "OTP not send" });
      });
  } else {
    res.json({ status: false, message: "User not exist" });
  }
});

export const verifyOtp = asyncHandler(async (req, res) => {
  const { otp, email }: { otp: string; email: string } = req.body;
  if (!email || !otp) throw new AppError(400, "all Fields required");
  let user = await userModel.findOne({ email: email });
  if (user) {
    if (otp == user.otp) {
      res.json({ verify: true });
    } else {
      res.status(404).json({ status: false, message: "OTP not match" });
    }
  } else {
    res.status(404).json({ status: false, message: "User not exist" });
  }
});

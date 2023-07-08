"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePassword = exports.verifyOtp = exports.sendOtp = exports.doLogin = exports.register = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const userModel_1 = __importDefault(require("../models/userModel"));
const errors_1 = __importDefault(require("../utils/errors"));
const bcrypt = require("bcrypt");
const jwt = require("../utils/jwt");
const { sendVerificationCode } = require("../utils/sendOtp");
//user signup
exports.register = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    //checking the user exist
    if (!email || !password)
        throw new errors_1.default(400, "all Fields required");
    const userExist = yield userModel_1.default.findOne({ email: email });
    if (userExist)
        throw new errors_1.default(409, "user already exists");
    //hashing the password
    const hashPass = yield bcrypt.hash(password, 8);
    if (!hashPass)
        throw new Error("password hashing failed");
    const user = new userModel_1.default({
        email: email,
        password: hashPass,
    });
    yield user.save();
    res.json({ success: true });
}));
//user login
exports.doLogin = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    //checking the input
    if (!email || !password)
        throw new errors_1.default(400, "all Fields required");
    //checking the user exist
    const userExist = yield userModel_1.default.findOne({ email: email });
    if (!userExist)
        throw new errors_1.default(400, "invalid email or password");
    //comparing the user password
    const match = yield bcrypt.compare(password, userExist.password);
    if (!match)
        throw new errors_1.default(400, "invalid email or password");
    const token = jwt.createToken(userExist._id);
    res.json({
        success: true,
        token,
    });
}));
exports.sendOtp = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    if (!email)
        throw new errors_1.default(400, "Email required");
    let user = yield userModel_1.default.findOne({ email: email });
    if (user) {
        sendVerificationCode(email)
            .then((response) => __awaiter(void 0, void 0, void 0, function* () {
            let setOtp = yield userModel_1.default.updateOne({ email: email }, { $set: { otp: response.otp } });
            res.json({ status: true, message: "OTP successfully send", email });
        }))
            .catch((error) => {
            res.status(404).json({ status: false, message: "OTP not send" });
        });
    }
    else {
        res.json({ status: false, message: "User not exist" });
    }
}));
exports.verifyOtp = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { otp, email } = req.body;
    if (!email || !otp)
        throw new errors_1.default(400, "all Fields required");
    let user = yield userModel_1.default.findOne({ email: email });
    if (user) {
        if (otp == user.otp) {
            res.json({ verify: true });
        }
        else {
            res.status(404).json({ status: false, message: "OTP not match" });
        }
    }
    else {
        res.status(404).json({ status: false, message: "User not exist" });
    }
}));
exports.updatePassword = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { newPassword, email } = req.body;
    if (!newPassword)
        throw new errors_1.default(400, "all Fields required");
    let user = yield userModel_1.default.findOne({ email: email });
    if (user) {
        //hashing the password
        const hashPass = yield bcrypt.hash(newPassword, 8);
        if (!hashPass)
            throw new Error("password hashing failed");
        let updatePassword = yield userModel_1.default.updateOne({ email: email }, { $set: { password: hashPass } });
    }
    else {
        res.status(404).json({ status: false, message: "User not exist" });
    }
}));

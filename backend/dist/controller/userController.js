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
exports.register = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const userModel_1 = __importDefault(require("../models/userModel"));
const AppError = require('../utils/errors');
const bcrypt = require("bcrypt");
exports.register = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    //checking the user exist
    if (!email || !password)
        throw new AppError(400, "all Fields required");
    const userExist = yield userModel_1.default.findOne({ email: email });
    if (userExist)
        throw new AppError(409, "user already exists");
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

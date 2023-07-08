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
exports.deleteTodo = exports.updateTodos = exports.getTodos = exports.addTodos = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const todoModel_1 = __importDefault(require("../models/todoModel"));
const errors_1 = __importDefault(require("../utils/errors"));
exports.addTodos = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { text, status } = req.body;
    if (!text)
        throw new errors_1.default(400, "all Fields required");
    const todo = new todoModel_1.default({
        userId: req.userId,
        text,
        status,
    });
    const newTodo = yield todo.save();
    res.json({ success: true, newTodo });
}));
exports.getTodos = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let todos = yield todoModel_1.default.find({ userId: req.userId });
    res.json({ success: true, todos });
}));
exports.updateTodos = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { text } = req.body;
    if (!text)
        throw new errors_1.default(400, "all Fields required");
    let updateTodo = yield todoModel_1.default.updateOne({ _id: req.params.id }, {
        $set: {
            text: text,
        },
    });
    res.json({ status: true });
}));
exports.deleteTodo = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.params.id)
        throw new errors_1.default(400, "all Fields required");
    let deleteTodo = yield todoModel_1.default.deleteOne({ _id: req.params.id });
    if (deleteTodo)
        res.json({ status: true, message: "Todo deleted successfully" });
}));

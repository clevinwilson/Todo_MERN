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
const jwt = require("jsonwebtoken");
const AppError = require("../utils/errors");
const authChecker = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { authorization } = req.headers;
        if (!authorization) {
            throw new AppError(401, "Authorization token required");
        }
        const token = authorization.split(" ")[1];
        jwt.verify(token, process.env.SECRET, (err, decodedToken) => {
            if (err) {
                res.json({ error: "Invalid Authorization token" }).status(401);
            }
            req.userId = decodedToken.id;
            next();
        });
    }
    catch (error) {
        next(error);
    }
});
module.exports = authChecker;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_mongo_sanitize_1 = __importDefault(require("express-mongo-sanitize"));
const userRoute_1 = __importDefault(require("./routes/userRoute"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, express_mongo_sanitize_1.default)({
    allowDots: true,
}));
app.use("/api/v1/user", userRoute_1.default);
const server = app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

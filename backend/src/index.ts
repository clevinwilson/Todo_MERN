import express from "express";
import dotenv from "dotenv";
import mongoSanitize from "express-mongo-sanitize";
import errorHandler from "./middleware/errorHandler";
import cors from "cors";
import dbConnection from "./config/database";
import userRoute from "./routes/userRoute";

dotenv.config();


const app = express();
const port = process.env.PORT;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  mongoSanitize({
    allowDots: true,
  })
);

//cors
app.use(
  cors({
    origin: [process.env.ORIGIN_URL as string],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);

app.use("/api/v1/user", userRoute);

// golbal error handler
app.use(errorHandler);

// connecting to database
dbConnection();

const server = app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

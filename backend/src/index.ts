import express from "express";
import dotenv from "dotenv";
import mongoSanitize from "express-mongo-sanitize";
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

app.use("/api/v1/user", userRoute);



const server = app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

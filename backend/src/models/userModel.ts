import mongoose from "mongoose";
import { IUser } from "../interface/interface";


const userSchema = new mongoose.Schema<IUser>({
  email: {
    type: String,
    required: [true, "Name cannot be empty"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
});


export default mongoose.model<IUser>("user", userSchema);

import mongoose from "mongoose";
import { ITodos } from "../interface/interface";

const userSchema = new mongoose.Schema<ITodos>({
  userId: {
    type: String,
    ref: "user",
  },
  text: {
    type: String,
  },
  status: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model<ITodos>("todos", userSchema);

import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // Hashed with bcrypt
    subscriptionId: { type: String, default: "" },
    plan: { type: String, default: "free" }, // free | starter | premium (used for access control)
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);

import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  image: { type: String },
  role: { type: String, default: "user" }, // "user" or "admin"
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  tel: { type: Number, required: true, unique: true },
});

const User = new mongoose.model("user", userSchema);

export default User;

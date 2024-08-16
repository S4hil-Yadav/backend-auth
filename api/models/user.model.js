import mongoose from "mongoose";
import validator from "validator";

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: "Username is required",
      unique: true,
      validate: [(v) => /^[A-Za-z\d_]{4,30}$/.test(v), "invalid username"],
    },
    email: {
      type: String,
      required: "Email is required",
      unique: true,
      validate: [validator.isEmail, "invalid email"],
    },
    password: {
      type: String,
      required: "Password is required",
    },
    profilePic: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema); // Name of collection will be "users" ("User" --> "users")

export default User;

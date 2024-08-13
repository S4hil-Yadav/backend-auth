import mongoose from "mongoose";
import validator from "validator";

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: "Username is required",
      unique: true,
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

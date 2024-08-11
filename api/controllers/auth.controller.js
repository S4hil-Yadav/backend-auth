import bcryptjs from "bcryptjs";
import User from "../models/user.model.js";

const login = (req, res) => {
  res.json({ yo: "API workig" });
};

const signup = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json("All fields are required");
  }

  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });

  try {
    await newUser.save();
    res.status(201).json("Signup successful");
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export { login, signup };

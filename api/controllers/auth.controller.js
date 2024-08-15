import bcryptjs from "bcryptjs";
import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

const signup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return next(errorHandler(400, "All fields reqiuired"));
    }

    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    const { password: pass, ...rest } = newUser._doc;
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);

    res
      .status(201)
      .cookie("access_token", token, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
      })
      .json(rest);
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(errorHandler(400, "All fields reqiuired"));
    }

    const validUser = await User.findOne({ email });

    if (!validUser) {
      return next(errorHandler(404, "User not found"));
    }

    const validPassword = bcryptjs.compareSync(password, validUser.password);

    if (!validPassword) {
      return next(errorHandler(400, "Invalid password"));
    }

    const { password: pass, ...rest } = validUser._doc;
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);

    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
      })
      .json(rest);
  } catch (error) {
    next(error);
  }
};

const google = async (req, res, next) => {
  try {
    const { email, name, profilePic } = req.body;

    const user = await User.findOne({ email });

    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = user._doc;

      res
        .status(200)
        .cookie("access_token", token, {
          httpOnly: true,
          sameSite: "none",
          secure: true,
        })
        .json(rest);
    } else {
      const randomPassword = Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(randomPassword, 10);

      const usernameInitial = name.toLowerCase().replace(/ /g, "_");
      let username = usernameInitial;

      while (await User.findOne({ username })) {
        username = usernameInitial + Math.random().toString(9).slice(-4);
      }

      const newUser = new User({
        username,
        email,
        password: hashedPassword,
        profilePic,
      });

      await newUser.save();

      const { password: pass, ...rest } = newUser._doc;
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);

      res
        .status(201)
        .cookie("access_token", token, {
          httpOnly: true,
          sameSite: "none",
          secure: true,
        })
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};

export { login, signup, google };

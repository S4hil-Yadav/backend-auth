import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import auth from "./routes/auth.route.js";

const port = process.env.PORT || 5173;
const app = express();

app.use(express.json()); // allows json input to be used in backend
dotenv.config();

mongoose.connect(process.env.MONGO).then(console.log("database connected"));

app.use("/api/auth", auth);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

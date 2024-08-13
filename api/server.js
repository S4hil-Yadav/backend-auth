import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import auth from "./routes/auth.route.js";

const app = express();
app.use(express.json()); // allows json input to be used in backend

dotenv.config();
const port = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO).then(console.log("database connected"));

app.use("/api/auth", auth);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error!";
  res.status(statusCode).json({ success: false, statusCode, message });
});

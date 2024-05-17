import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config";
import { register } from "./controllers/auth.controller.js";

const { PORT, DB_URL } = process.env;

const app = express();
const port = PORT || 8080;

app.use(cors());
app.use(express.json());

app.post("/auth/register", register);

const start = async () => {
  try {
    await mongoose.connect(DB_URL);
    console.log("Connected to MongoDB Atlas");

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.error(error);
  }
};

start();

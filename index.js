import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { setupRoutes } from "./routes/routes.js";
import "dotenv/config";

const { PORT, DB_URL } = process.env;

const app = express();
const port = PORT || 8080;

app.use(cors());
app.use(express.json());

const start = async () => {
  try {
    await mongoose.connect(DB_URL);
    console.log("Connected to MongoDB Atlas");

    setupRoutes(app);

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.error(error);
  }
};

start();

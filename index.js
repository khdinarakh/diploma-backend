import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { setupRoutes } from "./routes/routes.js";
import "dotenv/config";
import { upload, uploadFile, uploadFiles } from "./services/google-file-storage.js";

const { PORT, DB_URL } = process.env;

const app = express();
const port = PORT || 8080;

app.use(cors());
app.use(express.json());

app.post(
  "/test",
  upload.fields([{ name: "preview", maxCount: 1 }, { name: "images" }]),
  async (req, res) => {
    try {
      const folderName = "dorms";
      const previewImageUrl = await uploadFile(req.files.preview[0], folderName);
      const imageUrls = await uploadFiles(req.files.images, folderName);
      res.status(200).send({ previewImageUrl, imageUrls });
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  }
);

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

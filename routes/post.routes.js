import { Router } from "express";
import { authUser } from "../middlewares/auth.middleware.js";
import {
  createNewPost,
  deletePost,
  editPost,
  getAllPosts,
  getPostById
} from "../controllers/post.controller.js";
import { upload } from "../services/google-file-storage.js";

const router = Router();

router.post("/", authUser, upload.single("image"), createNewPost);
router.get("/", getAllPosts);
router.get("/:id", getPostById);
router.patch("/:id", editPost);
router.delete("/:id", deletePost);

export default router;

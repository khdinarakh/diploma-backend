import { Router } from "express";
import { authUser } from "../middlewares/auth.middleware.js";
import {
  startChat,
  getChatById,
  getAllChatsOfUser,
  getAllChatsOfManager,
  addMessageToChat
} from "../controllers/chat.controller.js";
import { upload } from "../services/google-file-storage.js";

const router = Router();

router.get("/:chatId", authUser, getChatById);
router.post("/create/:dormId", authUser, upload.single("file"), startChat);
router.post("/:chatId", authUser, upload.single("file"), addMessageToChat);
router.get("/user/:userId", authUser, getAllChatsOfUser);
router.get("/manager/:dormId", authUser, getAllChatsOfManager);

export default router;

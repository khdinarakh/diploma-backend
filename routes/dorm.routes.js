import { Router } from "express";
import {
  createDorm,
  deleteDorm,
  getAllDorms,
  getComparedDorms,
  getDormById,
  updateDorm
} from "../controllers/dorm.controller.js";
import { authUser, checkIsAdmin } from "../middlewares/auth.middleware.js";
import { upload } from "../services/google-file-storage.js";

const router = Router();

router.post(
  "/",
  authUser,
  checkIsAdmin,
  upload.fields([{ name: "preview", maxCount: 1 }, { name: "images" }]),
  createDorm
);
router.patch("/:id", authUser, checkIsAdmin, updateDorm);
router.delete("/:id", authUser, checkIsAdmin, deleteDorm);
router.get("/", getAllDorms);
router.get("/:id", getDormById);
router.post("/compare", getComparedDorms);

export default router;

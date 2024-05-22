import { Router } from "express";
import {
  createDorm,
  deleteDorm,
  getAllDorms,
  getComparedDorms,
  getDormBySlug,
  getUniqueCities,
  updateDorm
} from "../controllers/dorm.controller.js";
import { authUser, checkIsAdmin } from "../middlewares/auth.middleware.js";
import { upload } from "../services/google-file-storage.js";
import { updateDormValidator } from "../validators/dorm.validator.js";

const router = Router();

router.post(
  "/",
  authUser,
  checkIsAdmin,
  upload.fields([{ name: "preview", maxCount: 1 }, { name: "images" }]),
  createDorm
);
router.patch("/:id", authUser, checkIsAdmin, updateDormValidator, updateDorm);
router.delete("/:id", authUser, checkIsAdmin, deleteDorm);
router.get("/", getAllDorms);
router.get("/:slug", getDormBySlug);
router.get("/cities", getUniqueCities);
router.post("/compare", getComparedDorms);

export default router;

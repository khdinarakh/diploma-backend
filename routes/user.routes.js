import { Router } from "express";
import {
  deleteById,
  deleteMyAccount,
  fillUserDetails,
  getAllUsers,
  getMe,
  updateMyAccount
} from "../controllers/user.controller.js";
import { authUser, checkIsAdmin } from "../middlewares/auth.middleware.js";
import { fillDetailsValidator, updateUserValidator } from "../validators/user.validator.js";

const router = Router();

router.get("/", authUser, getAllUsers);
router.get("/me", authUser, getMe);
router.patch("/fill", authUser, fillDetailsValidator, fillUserDetails);
router.patch("/", authUser, updateUserValidator, updateMyAccount);
router.delete("/", authUser, deleteMyAccount);
router.delete("/:id", authUser, checkIsAdmin, deleteById);

export default router;

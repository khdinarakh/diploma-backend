import { Router } from "express";
import { register, login, activate, addNewManager } from "../controllers/auth.controller.js";
import {
  activateUserValidator,
  addManagerValidator,
  loginValidator,
  registerValidator
} from "../validators/user.validator.js";
import { authUser, checkIsAdmin } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/register", registerValidator, register);
router.post("/login", loginValidator, login);
router.post("/activate", activateUserValidator, activate);
router.post("/manager/:id", authUser, checkIsAdmin, addManagerValidator, addNewManager);

export default router;

import { Router } from "express";
import { register, login, activate } from "../controllers/auth.controller.js";
import {
  activateUserValidator,
  loginValidator,
  registerValidator
} from "../validators/user.validator.js";

const router = Router();

router.post("/register", registerValidator, register);
router.post("/login", loginValidator, login);
router.post("/activate", activateUserValidator, activate);

export default router;

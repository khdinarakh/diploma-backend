import { Router } from "express";
import { register, login, activate } from "../controllers/auth.controller.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/activate", activate);

export default router;

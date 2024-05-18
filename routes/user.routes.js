import { Router } from "express";
import { getMe } from "../controllers/user.controller.js";
import { authUser } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/me", authUser, getMe);

export default router;

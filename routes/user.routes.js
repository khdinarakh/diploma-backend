import { Router } from "express";
import { fillUserDetails, getMe } from "../controllers/user.controller.js";
import { authUser } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/me", authUser, getMe);
router.patch("/fill", authUser, fillUserDetails);

export default router;

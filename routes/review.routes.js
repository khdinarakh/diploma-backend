import { Router } from "express";
import { authUser } from "../middlewares/auth.middleware.js";
import { createReview, deleteReview, updateReview } from "../controllers/review.controller.js";
import { createReviewValidator, updateReviewValidator } from "../validators/review.validator.js";
import { checkIdParamValidator } from "../validators/general.validator.js";

const router = Router();

router.post("/:id", authUser, createReviewValidator, createReview);
router.patch("/:id", authUser, updateReviewValidator, updateReview);
router.delete("/:id", authUser, checkIdParamValidator, deleteReview);

export default router;

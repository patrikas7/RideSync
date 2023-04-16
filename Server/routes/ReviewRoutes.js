import express from "express";
import controller from "../controllers/ReviewController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import Schemas from "../middleware/Schemas.js";
import {
  ValidateSchema,
  ValidateQuerySchema,
} from "../middleware/SchemaValidator.js";

const ReviewRouter = express.Router();

ReviewRouter.route("/").post(
  authMiddleware,
  ValidateSchema(Schemas.review.create),
  controller.createReview
);

ReviewRouter.route("/check-review-existence").get(
  authMiddleware,
  ValidateQuerySchema(Schemas.review.existence),
  controller.canReviewBeDone
);

export default ReviewRouter;

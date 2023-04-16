import express from "express";
import controller from "../controllers/ReviewController";
import authMiddleware from "../middleware/authMiddleware.js";
import Schemas from "../middleware/Schemas.js";
import { ValidateSchema } from "../middleware/SchemaValidator.js";

const ReviewRouter = express.Router();

ReviewRouter.route("/").post(
  authMiddleware,
  ValidateSchema(Schemas.review.create),
  controller.createReview
);

export default ReviewRouter;

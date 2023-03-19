import express from "express";
import controller from "../controllers/TripSubscriptionsController.js";
import userCheckMiddleware from "../middleware/userCheckMIddleware.js";
import validateIdMiddleware from "../middleware/validateIdMiddleware.js";
import authMiddleware from "../middleware/authMiddleware.js";
import { ValidateSchema } from "../middleware/SchemaValidator.js";
import Schemas from "../middleware/Schemas.js";

const TripSubscriptionRouter = express.Router();

TripSubscriptionRouter.route("/").post(
  authMiddleware,
  validateIdMiddleware,
  userCheckMiddleware,
  ValidateSchema(Schemas.tripSubscription.create),
  controller.postTripSubscription
);

export default TripSubscriptionRouter;

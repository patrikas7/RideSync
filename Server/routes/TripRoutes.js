import express from "express";
import controller from "../controllers/TripController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import Schemas from "../middleware/Schemas.js";
import {
  ValidateQuerySchema,
  ValidateSchema,
} from "../middleware/SchemaValidator.js";

const TripRouter = express.Router();

TripRouter.route("/").get(
  authMiddleware,
  ValidateQuerySchema(Schemas.trip.get),
  controller.getTrips
);

export default TripRouter;

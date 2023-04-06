import express from "express";
import controller from "../controllers/TripSearchRequest.js";
import authMiddleware from "../middleware/authMiddleware.js";
import Schemas from "../middleware/Schemas.js";
import { ValidateSchema } from "../middleware/SchemaValidator.js";

const TripSearchRequestRouter = express.Router();

TripSearchRequestRouter.route("/").post(
  authMiddleware,
  ValidateSchema(Schemas.tripSearchRequest.create),
  controller.postTripSearchRequest
);

export default TripSearchRequestRouter;

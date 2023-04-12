import express from "express";
import controller from "../controllers/TripSearchRequestController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import Schemas from "../middleware/Schemas.js";
import { ValidateSchema } from "../middleware/SchemaValidator.js";

const TripSearchRequestRouter = express.Router();

TripSearchRequestRouter.route("/")
  .get(authMiddleware, controller.getTripSearchRequests)
  .post(
    authMiddleware,
    ValidateSchema(Schemas.tripSearchRequest.create),
    controller.postTripSearchRequest
  );

TripSearchRequestRouter.route("/:id")
  .get(authMiddleware, controller.getTripSearchRequest)
  .delete(authMiddleware, controller.deleteTripSearchRequest);

export default TripSearchRequestRouter;

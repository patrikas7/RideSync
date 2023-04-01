import express from "express";
import controller from "../controllers/TripController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import Schemas from "../middleware/Schemas.js";
import {
  ValidateQuerySchema,
  ValidateSchema,
} from "../middleware/SchemaValidator.js";
import validateIdMiddleware from "../middleware/validateIdMiddleware.js";
import userCheckMiddleware from "../middleware/userCheckMIddleware.js";

const TripRouter = express.Router();

TripRouter.route("/")
  .get(
    authMiddleware,
    ValidateQuerySchema(Schemas.trip.get),
    controller.getTrips
  )
  .post(
    authMiddleware,
    validateIdMiddleware,
    userCheckMiddleware,
    ValidateSchema(Schemas.trip.create),
    controller.postTrip
  );

TripRouter.route("/information")
  .get(authMiddleware, validateIdMiddleware, controller.getTripInformation)
  .delete(authMiddleware, validateIdMiddleware, controller.deleteTrip);

TripRouter.route("/my-trips/future-trips").get(
  authMiddleware,
  validateIdMiddleware,
  controller.getUsersFutureTrips
);

TripRouter.route("/bookings")
  .post(
    authMiddleware,
    ValidateSchema(Schemas.booking.create),
    controller.seatBooking
  )
  .delete(authMiddleware, controller.cancelBooking);

export default TripRouter;

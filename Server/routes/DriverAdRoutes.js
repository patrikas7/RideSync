import express from "express";
import controller from "../controllers/DriverAdController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import Schemas from "../middleware/Schemas.js";
import { ValidateSchema } from "../middleware/SchemaValidator.js";

const DriverAdRouter = express.Router();

DriverAdRouter.route("/")
  .get(authMiddleware, controller.getDriverAds)
  .post(
    authMiddleware,
    ValidateSchema(Schemas.driverAd.create),
    controller.postDriverAd
  );

export default DriverAdRouter;

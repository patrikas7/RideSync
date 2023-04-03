import express from "express";
import controller from "../controllers/CarController.js";
import Schemas from "../middleware/Schemas.js";
import authMiddleware from "../middleware/authMiddleware.js";
import { ValidateSchema } from "../middleware/SchemaValidator.js";

const CarRouter = express.Router();

CarRouter.route("/")
  .post(authMiddleware, ValidateSchema(Schemas.car.create), controller.postCar)
  .put(authMiddleware, controller.updateCar)
  .delete(authMiddleware, controller.deleteCar);

export default CarRouter;

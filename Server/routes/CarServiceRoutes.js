import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import carService from "../services/CarsService.js";

const CarServiceRouter = express.Router();

CarServiceRouter.route("/data").get(authMiddleware, carService.getCarsData);

export default CarServiceRouter;

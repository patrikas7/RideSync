import express from "express";
import carService from "../services/CarsService.js";

const CarServiceRouter = express.Router();

CarServiceRouter.route("/manufacturers").get(carService.getManufacturers);

export default CarServiceRouter;

import express from "express";
import controller from "../controllers/DriverAdController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const DriverAdRouter = express.Router();

DriverAdRouter.route("/").get(authMiddleware, controller.getDriverAds);

export default DriverAdRouter;

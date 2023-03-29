import express from "express";
import controller from "../controllers/UserController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import userCheckMiddleware from "../middleware/userCheckMIddleware.js";
import validateIdMiddleware from "../middleware/validateIdMiddleware.js";

const UserRouter = express.Router();

UserRouter.route("/").get(authMiddleware, controller.getUserDetails);
UserRouter.route("/checkByEmail").get(controller.checkUserByEmail);
UserRouter.route("/car").get(
  authMiddleware,
  validateIdMiddleware,
  userCheckMiddleware,
  controller.getUserCars
);

export default UserRouter;

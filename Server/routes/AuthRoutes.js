import express from "express";
import Schemas from "../middleware/Schemas.js";
import { ValidateSchema } from "../middleware/SchemaValidator.js";
import controller from "../controllers/AuthController.js";

const AuthRouter = express.Router();

AuthRouter.route("/register").post(
  ValidateSchema(Schemas.user.create),
  controller.registerUser
);

AuthRouter.route("/login").post(
  ValidateSchema(Schemas.login),
  controller.login
);

AuthRouter.route("/forgot-password").post(controller.sendPassowrdResetCode);
AuthRouter.route("/change-password").post(controller.changePassword);

export default AuthRouter;

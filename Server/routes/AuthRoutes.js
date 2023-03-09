import express from "express";
import Schemas from "../middleware/Schemas.js";
import { ValidateSchema } from "../middleware/SchemaValidator.js";
import controller from "../controllers/AuthController.js";

const AuthRouter = express.Router();

AuthRouter.route("/register/basicUser").post(
  ValidateSchema(Schemas.basicUser.create),
  controller.registerBasicUser
);

AuthRouter.route("/login").post(
  ValidateSchema(Schemas.login),
  controller.login
);

export default AuthRouter;

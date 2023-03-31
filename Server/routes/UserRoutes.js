import express from "express";
import controller from "../controllers/UserController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import userCheckMiddleware from "../middleware/userCheckMIddleware.js";
import validateIdMiddleware from "../middleware/validateIdMiddleware.js";
import { ValidateSchema } from "../middleware/SchemaValidator.js";
import Schemas from "../middleware/Schemas.js";

const UserRouter = express.Router();

UserRouter.route("/")
  .get(authMiddleware, controller.getUserDetails)
  .put(
    authMiddleware,
    ValidateSchema(Schemas.basicUser.update),
    controller.updateUser
  );
UserRouter.route("/checkByEmail").get(controller.checkUserByEmail);
UserRouter.route("/car").get(
  authMiddleware,
  validateIdMiddleware,
  userCheckMiddleware,
  controller.getUserCars
);
UserRouter.route("/password").put(
  authMiddleware,
  ValidateSchema(Schemas.basicUser.password),
  controller.changePassword
);

UserRouter.route("/profilePicture").post(
  authMiddleware,
  controller.uploadPicture
);

export default UserRouter;

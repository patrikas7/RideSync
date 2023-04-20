import express from "express";
import controller from "../controllers/User/UserController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import { ValidateSchema } from "../middleware/SchemaValidator.js";
import Schemas from "../middleware/Schemas.js";

const UserRouter = express.Router();

UserRouter.route("/")
  .get(authMiddleware, controller.getUserDetails)
  .put(
    authMiddleware,
    ValidateSchema(Schemas.basicUser.update),
    controller.updateUser
  )
  .delete(authMiddleware, controller.deleteUser);

UserRouter.route("/checkByEmail").get(controller.checkUserByEmail);

UserRouter.route("/car").get(authMiddleware, controller.getUserCars);
UserRouter.route("/password").put(
  authMiddleware,
  ValidateSchema(Schemas.basicUser.password),
  controller.changePassword
);

UserRouter.route("/profilePicture").post(
  authMiddleware,
  controller.uploadPicture
);

UserRouter.route("/my-trips").get(authMiddleware, controller.getUserTrips);
UserRouter.route("/my-chats").get(authMiddleware, controller.getUserChat);
UserRouter.route("/my-driver-ad").get(
  authMiddleware,
  controller.getUserDriverAd
);

export default UserRouter;

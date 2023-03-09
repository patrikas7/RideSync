import express from "express";
import controller from "../controllers/UserController.js";

const UserRouter = express.Router();

UserRouter.route("/checkByEmail").get(controller.checkUserByEmail);

export default UserRouter;

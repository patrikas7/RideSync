import express from "express";
import controller from "../controllers/NotificationController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const NotificationRouter = express.Router();

NotificationRouter.route("/user").get(
  authMiddleware,
  controller.getUsersNotification
);

NotificationRouter.route("/user/unread").get(
  authMiddleware,
  controller.getUsersUnreadNotificationsCount
);

NotificationRouter.route("/:id").get(
  authMiddleware,
  controller.getNotification
);

export default NotificationRouter;

import express from "express";
import controller from "../controllers/TripBookmarkController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const TripBookmarkRouter = express.Router();

TripBookmarkRouter.route("/").delete(authMiddleware, controller.deleteBookmark);
TripBookmarkRouter.route("/user").get(
  authMiddleware,
  controller.getUserBookmarks
);

export default TripBookmarkRouter;

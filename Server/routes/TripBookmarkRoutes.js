import express from "express";
import controller from "../controllers/TripBookmarkController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import Schemas from "../middleware/Schemas.js";
import { ValidateSchema } from "../middleware/SchemaValidator.js";

const TripBookmarkRouter = express.Router();

TripBookmarkRouter.route("/")
  .put(
    authMiddleware,
    ValidateSchema(Schemas.bookmark.update),
    controller.updateBookmark
  )
  .delete(authMiddleware, controller.deleteBookmark);

TripBookmarkRouter.route("/user").get(
  authMiddleware,
  controller.getUserBookmarks
);

export default TripBookmarkRouter;

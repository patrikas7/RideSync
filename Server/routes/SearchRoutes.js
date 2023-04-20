import express from "express";
import controller from "../controllers/SearchController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import Schemas from "../middleware/Schemas.js";
import {
  ValidateQuerySchema,
  ValidateSchema,
} from "../middleware/SchemaValidator.js";
import userCheckMiddleware from "../middleware/userCheckMIddleware.js";
import validateIdMiddleware from "../middleware/validateIdMiddleware.js";

const SearchRouter = express.Router();

SearchRouter.route("/").get(authMiddleware, controller.getSuggestions);
SearchRouter.route("/cities").get(
  authMiddleware,
  controller.getCitySuggestions
);

SearchRouter.route("/history")
  .get(
    authMiddleware,
    validateIdMiddleware,
    ValidateQuerySchema(Schemas.searchHistory.get),
    userCheckMiddleware,
    controller.getSearchHistory
  )
  .post(
    authMiddleware,
    userCheckMiddleware,
    ValidateSchema(Schemas.searchHistory.create),
    controller.saveSearch
  );

SearchRouter.route("/history/trips")
  .get(
    authMiddleware,
    validateIdMiddleware,
    userCheckMiddleware,
    controller.getTripsSearchHistory
  )
  .post(
    authMiddleware,
    validateIdMiddleware,
    userCheckMiddleware,
    ValidateSchema(Schemas.tripSearchHistory.create),
    controller.saveTripSearch
  );

SearchRouter.route("/bookmarks").post(
  authMiddleware,
  validateIdMiddleware,
  userCheckMiddleware,
  ValidateSchema(Schemas.bookmark.create),
  controller.bookmarkTripSearch
);

export default SearchRouter;

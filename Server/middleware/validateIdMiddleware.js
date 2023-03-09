import StatusCodes from "../enums/statusCodes.js";
import mongoose from "mongoose";

const validateIdMiddleware = (req, res, next) => {
  const id = req.body.id || req.query?.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(StatusCodes.BAD_REQUEST).json({ error: "Invalid ID" });
  }

  next();
};

export default validateIdMiddleware;

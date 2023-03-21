import StatusCodes from "../enums/statusCodes.js";

import jwt from "jsonwebtoken";
import Logging from "../library/Logging.js";

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ error: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    Logging.info(decoded);
    req.user = decoded.user;
    next();
  } catch (err) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ error: "Unauthorized" });
  }
};

export default authMiddleware;

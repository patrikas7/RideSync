import ErrorMessages from "../enums/errorMessages.js";
import StatusCodes from "../enums/statusCodes.js";
import BasicUser from "../models/BasicUser.js";

const userCheckMiddleware = async (req, res, next) => {
  const id = req.body.id || req.query?.id;

  try {
    const user = await BasicUser.findById(id);
    if (!user)
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: ErrorMessages.USER_NOT_FOUND });

    req.user = user;
    next();
  } catch (error) {
    return res
      .status(StatusCodes.UNEXPECTED_ERROR)
      .send(ErrorMessages.UNEXPECTED_ERROR);
  }
};

export default userCheckMiddleware;

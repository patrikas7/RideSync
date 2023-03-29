import User from "../models/User.js";
import Logging from "../library/Logging.js";
import StatusCodes from "../enums/statusCodes.js";
import ErrorMessages from "../enums/errorMessages.js";

const checkUserByEmail = async (req, res) => {
  const { email } = req.query;

  try {
    const user = await User.findOne({ email: email?.toLowerCase() });
    return res.json({ userExists: user ? true : false });
  } catch (err) {
    Logging.error(err);
    return res
      .status(StatusCodes.UNEXPECTED_ERROR)
      .send(ErrorMessages.UNEXPECTED_ERROR);
  }
};

const getUserCars = async (req, res) => {
  const user = req.user;
  res.status(StatusCodes.OK).json({ carsList: user.cars });
};

const getUserDetails = async (req, res) => {
  const userId = req.userId;

  try {
    const user = await User.findById(userId);
    res.status(StatusCodes.OK).json({ user });
  } catch (error) {
    Logging.error(error);
    return res
      .status(StatusCodes.UNEXPECTED_ERROR)
      .send(ErrorMessages.UNEXPECTED_ERROR);
  }
};

export default {
  checkUserByEmail,
  getUserCars,
  getUserDetails,
};

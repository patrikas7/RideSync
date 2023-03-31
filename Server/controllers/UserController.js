import User from "../models/User.js";
import Logging from "../library/Logging.js";
import StatusCodes from "../enums/statusCodes.js";
import ErrorMessages from "../enums/errorMessages.js";
import bcrypt from "bcryptjs";

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

const updateUser = async (req, res) => {
  const userId = req.userId;
  const { field, value } = req.body;

  try {
    const user = await User.findById(userId);
    if (field === "email") {
      const userWithSameEmail = await User.find({
        email: email?.toLowerCase(),
      });
      if (userWithSameEmail.length > 1)
        return res.status(
          StatusCodes.BAD_REQUEST,
          json({ message: ErrorMessages.EMAIL_IS_UNAVAILABLE })
        );
    }

    user[field] = value;
    await user.save();

    res.status(StatusCodes.OK).json({ user });
  } catch (error) {
    Logging.error(error);
    return res
      .status(StatusCodes.UNEXPECTED_ERROR)
      .send(ErrorMessages.UNEXPECTED_ERROR);
  }
};

const changePassword = async (req, res) => {
  const userId = req.userId;
  const { password, newPassword } = req.body;

  try {
    const user = await User.findById(userId);
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: ErrorMessages.WRONG_PASSWORD });

    const isNewPasswordSame = await bcrypt.compare(password, newPassword);
    if (isNewPasswordSame)
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: ErrorMessages.SAME_NEW_PASSWORD });

    user.password = newPassword;
    await user.save();

    res.status(StatusCodes.OK).json({ user });
  } catch (error) {
    Logging.error(error);
    return res
      .status(StatusCodes.UNEXPECTED_ERROR)
      .send(ErrorMessages.UNEXPECTED_ERROR);
  }
};

const uploadPicture = async (req, res) => {
  const userId = req.userId;
  const { file } = req.body;

  try {
    const user = await User.findById(userId);
    const decodedFile = Buffer.from(file, "base64");
    user.profilePicture = decodedFile;

    await user.save();

    delete user.password;
    delete user.profilePicture;
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
  updateUser,
  changePassword,
  uploadPicture,
};

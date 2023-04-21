import User from "../../models/User.js";
import Logging from "../../library/Logging.js";
import StatusCodes from "../../enums/statusCodes.js";
import ErrorMessages from "../../enums/errorMessages.js";
import bcrypt from "bcryptjs";
import BasicUser from "../../models/BasicUser.js";
import BusinessUser from "../../models/BusinessUser.js";
import { parseUserProfilePicture } from "../Trip/TripControllerUtils.js";
import { initChat } from "../../services/ChatService.js";
import {
  getDateFilter,
  getTripSearchRequestPopulation,
  findUserById,
  buildUserTripsResponse,
} from "./UserControllerUtils.js";

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
  const { userId } = req;
  const user = await User.findById(userId).populate("cars");

  res.status(StatusCodes.OK).json({ carsList: user.cars });
};

const getUserDetails = async (req, res) => {
  const userId = req.userId;

  try {
    const { user } = await findUserById(userId);

    res.status(StatusCodes.OK).json({
      user,
    });
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
  const { buffer, type } = req.body;

  try {
    const user = await User.findById(userId);
    const decodedFile = Buffer.from(buffer, "base64");
    user.profilePicture = {
      buffer: decodedFile,
      type,
    };

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

const deleteUser = async (req, res) => {
  const userId = req.userId;

  try {
    await User.findByIdAndDelete(userId);
    res.status(StatusCodes.OK).json({ message: "deleted" });
  } catch (error) {
    Logging.error(error);
    return res
      .status(StatusCodes.UNEXPECTED_ERROR)
      .send(ErrorMessages.UNEXPECTED_ERROR);
  }
};

const getUserTrips = async (req, res) => {
  const { userId } = req;
  const { type } = req.query;
  const dateFilter = getDateFilter(type);

  try {
    const user = await BasicUser.findById(userId)
      .populate({
        path: "trips",
        populate: {
          path: "driver",
          model: "BasicUser",
          select: "name profilePicture",
        },
        match: dateFilter,
      })
      .populate(getTripSearchRequestPopulation(type))
      .lean();

    user.trips.forEach((trip) => [
      (trip.driver = parseUserProfilePicture(trip.driver)),
    ]);

    user?.tripSearchRequests?.forEach((trip) => {
      trip.user = parseUserProfilePicture(trip.user);
    });

    res.status(StatusCodes.OK).json(buildUserTripsResponse(type, user, userId));
  } catch (error) {
    Logging.error(error);
    return res
      .status(StatusCodes.UNEXPECTED_ERROR)
      .send(ErrorMessages.UNEXPECTED_ERROR);
  }
};

const getUserChat = async (req, res) => {
  const { userId } = req;
  const { receiver } = req.query;

  try {
    const chat = await initChat([userId, receiver]);
    const { user } = await findUserById(userId);

    res.status(StatusCodes.OK).json({
      user: {
        id: user._id,
        name: user.name,
        surname: user.surname,
        profilePicture: user.profilePicture,
      },
      chat: {
        ...chat,
        messages: chat.messages.map((message) => ({
          ...message,
          user: { _id: message.user._id },
        })),
      },
    });
  } catch (error) {
    Logging.error(error);
    return res
      .status(StatusCodes.UNEXPECTED_ERROR)
      .send(ErrorMessages.UNEXPECTED_ERROR);
  }
};

const getUserDriverAd = async (req, res) => {
  const { userId } = req;

  try {
    const user = await BusinessUser.findById(userId).populate({
      path: "driverAds",
      populate: { path: "car" },
    });

    res.status(StatusCodes.OK).json({ driverAds: user.driverAds });
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
  deleteUser,
  getUserTrips,
  getUserChat,
  getUserDriverAd,
};

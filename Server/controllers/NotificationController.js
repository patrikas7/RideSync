import Logging from "../library/Logging.js";
import StatusCodes from "../enums/statusCodes.js";
import ErrorMessages from "../enums/errorMessages.js";
import User from "../models/User.js";

const getUsersNotification = async (req, res) => {
  const { userId } = req;

  try {
    const user = await User.findById(userId);

    res.status(StatusCodes.OK).json({ notifications: user.notifications });
  } catch (error) {
    Logging.error(error);
    return res
      .status(StatusCodes.UNEXPECTED_ERROR)
      .send(ErrorMessages.UNEXPECTED_ERROR);
  }
};

const getUsersUnreadNotificationsCount = async (req, res) => {
  const { userId } = req;

  try {
    const user = await User.findById(userId);
    const unreadNotificationsCount = user.notifications.filter(
      ({ isRead }) => !isRead
    ).length;

    res.status(StatusCodes.OK).json({ unreadNotificationsCount });
  } catch (error) {
    Logging.error(error);
    return res
      .status(StatusCodes.UNEXPECTED_ERROR)
      .send(ErrorMessages.UNEXPECTED_ERROR);
  }
};

export default { getUsersNotification, getUsersUnreadNotificationsCount };

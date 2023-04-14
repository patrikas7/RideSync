import Logging from "../library/Logging.js";
import StatusCodes from "../enums/statusCodes.js";
import ErrorMessages from "../enums/errorMessages.js";
import User from "../models/User.js";
import Notification from "../models/Notification.js";

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

export const sendNotificationsForPassengers = async (
  passengers,
  notificationType,
  sender,
  trip
) => {
  await Promise.all(
    passengers.map(async ({ passenger }) => {
      const notification = new Notification({
        user: passenger,
        sender,
        trip,
        notificationType,
      });

      await notification.save();
    })
  );
};

export default { getUsersNotification, getUsersUnreadNotificationsCount };

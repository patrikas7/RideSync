import Logging from "../library/Logging.js";
import StatusCodes from "../enums/statusCodes.js";
import ErrorMessages from "../enums/errorMessages.js";
import User from "../models/User.js";
import Notification from "../models/Notification.js";
import { parseUserProfilePicture } from "./Trip/TripControllerUtils.js";
import { NotificationTypes } from "../enums/enums.js";

const getUsersNotification = async (req, res) => {
  const { userId } = req;

  try {
    const { notifications } = await User.findById(userId)
      .populate({
        path: "notifications",
        populate: {
          path: "sender",
          select: "profilePicture",
        },
      })
      .lean();

    notifications.forEach((notification) => {
      notification.sender = parseUserProfilePicture(notification.sender);
    });
    const todaysNotifications = filterNotificationsByDate(notifications);
    const yesterdaysNotifications = filterNotificationsByDate(notifications, 1);
    const olderNotifications = filterOldNotifications(notifications);

    res.status(StatusCodes.OK).json({
      todaysNotifications,
      yesterdaysNotifications,
      olderNotifications,
      resultsCount: notifications.length,
    });
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

export const sendNotificationForRemovedUser = async (user, sender, trip) => {
  const notification = new Notification(
    user,
    sender,
    trip,
    NotificationTypes.I_WAS_REMOVED_FROM_TRIP
  );
  await notification.save();
};

const filterNotificationsByDate = (notifications, daysAgo = 0) => {
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() - daysAgo);
  return notifications.filter(({ createdAt }) => {
    const createAt = new Date(createdAt);
    return (
      createAt.getFullYear() === targetDate.getFullYear() &&
      createAt.getMonth() === targetDate.getMonth() &&
      createAt.getDate() === targetDate.getDate()
    );
  });
};

const filterOldNotifications = (notifications) => {
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 2);
  return notifications.filter((notification) => {
    const createdAt = new Date(notification.createdAt);
    return createdAt < yesterday || createdAt > today;
  });
};

export default { getUsersNotification, getUsersUnreadNotificationsCount };

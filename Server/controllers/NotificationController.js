import StatusCodes from "../enums/statusCodes.js";
import ErrorMessages from "../enums/errorMessages.js";
import User from "../models/User.js";
import Notification from "../models/Notification.js";
import { parseUserProfilePicture } from "./Trip/TripControllerUtils.js";
import { NotificationTypes } from "../enums/enums.js";

const getUsersNotification = async (req, res) => {
  const { userId } = req;

  try {
    const { notifications, chats } = await User.findById(userId)
      .populate({
        path: "notifications",
        populate: {
          path: "sender",
          select: "profilePicture",
        },
        options: { sort: { createdAt: -1 } },
      })
      .populate({
        path: "chats",
        populate: [
          {
            path: "users",
            select: "name profilePicture",
          },
          {
            path: "messages",
            options: { sort: { createdAt: -1 }, limit: 1 },
          },
        ],
      })
      .lean();

    notifications.forEach((notification) => {
      notification.sender = parseUserProfilePicture(notification.sender);
    });

    chats.forEach((chat) => {
      chat.users.forEach((user) => {
        user = parseUserProfilePicture(user);
      });
    });

    const todaysNotifications = filterNotificationsByDate([
      ...notifications,
      ...chats,
    ]);
    const yesterdaysNotifications = filterNotificationsByDate(
      [...notifications, ...chats],
      1
    );
    const olderNotifications = filterOldNotifications([
      ...notifications,
      ...chats,
    ]);

    res.status(StatusCodes.OK).json({
      todaysNotifications,
      yesterdaysNotifications,
      olderNotifications,
      resultsCount:
        todaysNotifications.length +
        yesterdaysNotifications.length +
        olderNotifications.length,
    });
  } catch (error) {
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

const createNotification = (user, sender, trip, notificationType, rating) => {
  const notification = new Notification({
    user,
    sender,
    trip,
    notificationType,
    rating,
  });
  return notification.save();
};

export const sendNotificationForRemovedUser = async (user, sender, trip) => {
  await createNotification(
    user,
    sender,
    trip,
    NotificationTypes.I_WAS_REMOVED_FROM_TRIP
  );
};

export const sendReviewNotification = async (user, sender, trip, rating) => {
  await createNotification(
    user,
    sender,
    trip,
    NotificationTypes.TRIP_REVIEW,
    rating
  );
};

const filterNotificationsByDate = (notifications, daysAgo = 0) => {
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() - daysAgo);

  return notifications.filter((notification) => {
    const createdAt = notification.notificationType
      ? notification.createdAt
      : notification.messages[0]?.createdAt;

    const createAt = new Date(createdAt);

    return createAt.toDateString() === targetDate.toDateString();
  });
};

const filterOldNotifications = (notifications) => {
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 2);
  return notifications.filter((notification) => {
    const date = notification.notificationType
      ? notification.createdAt
      : notification.messages[0]?.createdAt;

    const createdAt = new Date(date);
    return createdAt < yesterday || createdAt > today;
  });
};

const getNotification = async (req, res) => {
  const { id } = req.params;

  try {
    const notification = await Notification.findById(id).populate(
      "trip",
      "departure destination time stops"
    );
    if (!notification)
      return res
        .status(StatusCodes.NOT_FOUND)
        .send(ErrorMessages.NOTIFICATION_NOT_FOUND);

    if (!notification.isRead) {
      notification.isRead = true;
      await notification.save();
    }

    res.status(StatusCodes.OK).json({ notification });
  } catch (error) {
    return res
      .status(StatusCodes.UNEXPECTED_ERROR)
      .send(ErrorMessages.UNEXPECTED_ERROR);
  }
};

export default {
  getUsersNotification,
  getUsersUnreadNotificationsCount,
  getNotification,
  filterNotificationsByDate,
  filterOldNotifications,
};

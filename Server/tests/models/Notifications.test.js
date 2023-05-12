import mongoose from "mongoose";
import User from "../../models/User";
import Notification from "../../models/Notification";
import { NotificationTypes } from "../../enums/enums";

jest.mock("../../models/User");

const notificationId = new mongoose.Types.ObjectId();

describe("Notification Model Test", () => {
  const notificationData = {
    _id: notificationId,
    user: new mongoose.Types.ObjectId(),
    sender: new mongoose.Types.ObjectId(),
    trip: new mongoose.Types.ObjectId(),
    notificationType: NotificationTypes.TRIP_REVIEW,
    isRead: false,
    createdAt: Date.now(),
    rating: 4,
  };

  it("create & save notification successfully", async () => {
    jest
      .spyOn(Notification.prototype, "save")
      .mockImplementation(() => Promise.resolve(notificationData));

    const validNotification = new Notification(notificationData);
    const spy = jest.spyOn(validNotification, "save");
    const savedNotification = await validNotification.save();

    // Object Id should be defined when successfully saved to MongoDB.
    expect(savedNotification._id).toBeDefined();
    expect(savedNotification.user.toString()).toBe(
      notificationData.user.toString()
    );
    expect(savedNotification.sender.toString()).toBe(
      notificationData.sender.toString()
    );
    expect(savedNotification.trip.toString()).toBe(
      notificationData.trip.toString()
    );
    expect(savedNotification.notificationType).toBe(
      notificationData.notificationType
    );
    expect(savedNotification.isRead).toBe(notificationData.isRead);
    expect(savedNotification.createdAt).toBeDefined();
    expect(savedNotification.rating).toBe(notificationData.rating);

    // ensure the save() function was called
    expect(spy).toHaveBeenCalled();
  });

  it("should add notification id to user notifications on save", async () => {
    jest
      .spyOn(Notification.prototype, "save")
      .mockImplementation(() => Promise.resolve(notificationData));
    const userId = new mongoose.Types.ObjectId();
    const senderId = new mongoose.Types.ObjectId();
    const userMock = {
      _id: userId,
      notifications: [notificationId],
      save: jest.fn(),
    };

    User.findById = jest.fn().mockImplementation((id) => {
      if (
        id.toString() === userId.toString() ||
        id.toString() === senderId.toString()
      ) {
        return userMock;
      }
    });

    const notification = new Notification({
      ...notificationData,
      user: userId,
      sender: senderId,
    });
    await notification.save();

    expect(userMock.notifications[0].toString()).toBe(
      notification._id.toString()
    );
  });
});

afterEach(() => {
  jest.clearAllMocks();
});

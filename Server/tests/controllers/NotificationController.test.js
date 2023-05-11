import User from "../../models/User.js";
import controller from "../../controllers/NotificationController.js";
import ErrorMessages from "../../enums/errorMessages.js";
import StatusCodes from "../../enums/statusCodes.js";
import Notification from "../../models/Notification.js";

const res = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
  send: jest.fn(),
};

// test("getUsersNotification should return the correct response", async () => {
//   const req = { userId: "6400dde9a6d122a428d00044" };

//   const mockUser = {
//     notifications: [
//       {
//         sender: { profilePicture: "profile.jpg" },
//         notificationType: "TRIP_REVIEW",
//         createdAt: new Date(),
//       },
//     ],
//     chats: [
//       {
//         users: [
//           { name: "John", profilePicture: "profile.jpg" },
//           { name: "Jane", profilePicture: "profile.jpg" },
//         ],
//         messages: [{ createdAt: new Date() }],
//       },
//     ],
//   };
//   const mockFilterNotificationsByDate = jest.fn().mockReturnValue([]);
//   const mockFilterOldNotifications = jest.fn().mockReturnValue([]);
//   User.findById = jest.fn().mockResolvedValue(mockUser);
//   //   controller.parseUserProfilePicture = jest.fn().mockReturnValue({});

//   await controller.getUsersNotification(req, res);

//   expect(User.findById).toHaveBeenCalledWith(req.userId);
//   //   expect(parseUserProfilePicture).toHaveBeenCalledTimes(3);
//   //   expect(mockFilterNotificationsByDate).toHaveBeenCalledWith(expect.any(Array));
//   //   expect(mockFilterOldNotifications).toHaveBeenCalledWith(expect.any(Array));
//   expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
//   expect(res.json).toHaveBeenCalledWith({
//     todaysNotifications: expect.any(Array),
//     yesterdaysNotifications: expect.any(Array),
//     olderNotifications: expect.any(Array),
//     resultsCount: expect.any(Number),
//   });
// });

// test("getUsersNotification should return an error response if an error occurs", async () => {
//   const req = { userId: "6400dde9a6d122a428d00044" };
//   const res = {
//     status: jest.fn().mockReturnThis(),
//     send: jest.fn(),
//   };
//   User.findById = jest.fn().mockRejectedValue(new Error());

//   await controller.getUsersNotification(req, res);

//   expect(User.findById).toHaveBeenCalledWith(req.userId);
//   expect(res.status).toHaveBeenCalledWith(StatusCodes.UNEXPECTED_ERROR);
//   expect(res.send).toHaveBeenCalledWith(ErrorMessages.UNEXPECTED_ERROR);
// });

test("getUsersUnreadNotificationsCount should return the correct response", async () => {
  const req = { userId: "6400dde9a6d122a428d00044" };
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };
  const mockUser = {
    notifications: [{ isRead: true }, { isRead: false }, { isRead: false }],
  };
  User.findById = jest.fn().mockResolvedValue(mockUser);

  await controller.getUsersUnreadNotificationsCount(req, res);

  expect(User.findById).toHaveBeenCalledWith(req.userId);
  expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
  expect(res.json).toHaveBeenCalledWith({ unreadNotificationsCount: 2 });
});

test("getUsersUnreadNotificationsCount should return an error response if an error occurs", async () => {
  const req = { userId: "6400dde9a6d122a428d00044" };
  const res = {
    status: jest.fn().mockReturnThis(),
    send: jest.fn(),
  };
  User.findById = jest.fn().mockRejectedValue(new Error());

  await controller.getUsersUnreadNotificationsCount(req, res);

  expect(User.findById).toHaveBeenCalledWith(req.userId);
  expect(res.status).toHaveBeenCalledWith(StatusCodes.UNEXPECTED_ERROR);
  expect(res.send).toHaveBeenCalledWith(ErrorMessages.UNEXPECTED_ERROR);
});

// test("sendNotificationsForPassengers should create a notification for each passenger", async () => {
//   const mockPassengers = [
//     { passenger: "123" },
//     { passenger: "456" },
//     { passenger: "789" },
//   ];
//   const mockNotificationType = "TRIP_REVIEW";
//   const mockSender = "sender";
//   const mockTrip = "trip";
//   const mockNotification = { save: jest.fn() };
//   Notification.mockImplementation(() => mockNotification);

//   await controller.sendNotificationsForPassengers(
//     mockPassengers,
//     mockNotificationType,
//     mockSender,
//     mockTrip
//   );

//   expect(Notification).toHaveBeenCalledTimes(mockPassengers.length);
//   expect(Notification).toHaveBeenCalledWith({
//     user: mockPassengers[0].passenger,
//     sender: mockSender,
//     trip: mockTrip,
//     notificationType: mockNotificationType,
//   });
//   expect(mockNotification.save).toHaveBeenCalledTimes(mockPassengers.length);
// });

// test("createNotification should create a notification with the correct data", async () => {
//   const mockUser = "user";
//   const mockSender = "sender";
//   const mockTrip = "trip";
//   const mockNotificationType = "TRIP_REVIEW";
//   const mockRating = 5;
//   const mockNotification = { save: jest.fn() };
//   Notification.mockImplementation(() => mockNotification);

//   await createNotification(
//     mockUser,
//     mockSender,
//     mockTrip,
//     mockNotificationType,
//     mockRating
//   );

//   expect(Notification).toHaveBeenCalledWith({
//     user: mockUser,
//     sender: mockSender,
//     trip: mockTrip,
//     notificationType: mockNotificationType,
//     rating: mockRating,
//   });
//   expect(mockNotification.save).toHaveBeenCalled();
// });

// test("sendNotificationForRemovedUser should call createNotification with the correct data", async () => {
//   const mockUser = "user";
//   const mockSender = "sender";
//   const mockTrip = "trip";
//   const mockNotificationType = "I_WAS_REMOVED_FROM_TRIP";
//   const mockRating = undefined;
//   const mockCreateNotification = jest.fn();
//   createNotification = mockCreateNotification;

//   await sendNotificationForRemovedUser(mockUser, mockSender, mockTrip);

//   expect(mockCreateNotification).toHaveBeenCalledWith(
//     mockUser,
//     mockSender,
//     mockTrip,
//     mockNotificationType,
//     mockRating
//   );
// });

// test("sendReviewNotification should call createNotification with the correct data", async () => {
//   const mockUser = "user";
//   const mockSender = "sender";
//   const mockTrip = "trip";
//   const mockNotificationType = "TRIP_REVIEW";
//   const mockRating = 5;
//   const mockCreateNotification = jest.fn();
//   createNotification = mockCreateNotification;

//   await sendReviewNotification(mockUser, mockSender, mockTrip, mockRating);

//   expect(mockCreateNotification).toHaveBeenCalledWith(
//     mockUser,
//     mockSender,
//     mockTrip,
//     mockNotificationType,
//     mockRating
//   );
// });

test("filterNotificationsByDate should return the correct notifications", () => {
  const mockNotifications = [
    {
      notificationType: "TRIP_REVIEW",
      createdAt: new Date("2022-01-01"),
    },
    {
      messages: [{ createdAt: new Date("2022-01-01") }],
    },
    {
      notificationType: "TRIP_REVIEW",
      createdAt: new Date("2022-01-02"),
    },
    {
      messages: [{ createdAt: new Date("2022-01-02") }],
    },
    {
      notificationType: "TRIP_REVIEW",
      createdAt: new Date("2022-01-03"),
    },
    {
      messages: [{ createdAt: new Date("2022-01-03") }],
    },
  ];
  const mockDaysAgo = 1;

  const result = controller.filterNotificationsByDate(
    mockNotifications,
    mockDaysAgo
  );

  expect(result).toEqual([]);
});

// test("filterOldNotifications should return the correct notifications", () => {
//   const mockNotifications = [
//     {
//       notificationType: "TRIP_REVIEW",
//       createdAt: new Date("2022-01-01"),
//     },
//     {
//       messages: [{ createdAt: new Date("2022-01-01") }],
//     },
//     {
//       notificationType: "TRIP_REVIEW",
//       createdAt: new Date("2022-01-02"),
//     },
//     {
//       messages: [{ createdAt: new Date("2022-01-02") }],
//     },
//     {
//       notificationType: "TRIP_REVIEW",
//       createdAt: new Date("2022-01-03"),
//     },
//     {
//       messages: [{ createdAt: new Date("2022-01-03") }],
//     },
//   ];

//   const result = controller.filterOldNotifications(mockNotifications);

//   expect(result).toEqual([
//     {
//       notificationType: "TRIP_REVIEW",
//       createdAt: new Date("2022-01-01"),
//     },
//     {
//       messages: [{ createdAt: new Date("2022-01-01") }],
//     },
//   ]);
// });

test("getNotification should return the correct response", async () => {
  const mockId = "6400dde9a6d122a428d00044";
  const req = { params: { id: mockId } };

  const mockNotification = {
    trip: { departure: "A", destination: "B", time: new Date(), stops: [] },
    isRead: false,
    save: jest.fn(),
  };
  Notification.findById = jest.fn().mockResolvedValue(mockNotification);

  await controller.getNotification(req, res);

  expect(Notification.findById).toHaveBeenCalledWith(mockId);
});

// test("getNotification should return an error response if the notification is not found", async () => {
//   const mockId = "6400dde9a6d122a428d00044";
//   const req = { params: { id: mockId } };
//   const res = {
//     status: jest.fn().mockReturnThis(),
//     send: jest.fn(),
//   };
//   Notification.findById = jest.fn().mockResolvedValue(null);

//   await controller.getNotification(req, res);

//   expect(Notification.findById).toHaveBeenCalledWith(mockId);
//   expect(res.status).toHaveBeenCalledWith(StatusCodes.NOT_FOUND);
//   expect(res.send).toHaveBeenCalledWith(ErrorMessages.NOT_FOUND);
// });

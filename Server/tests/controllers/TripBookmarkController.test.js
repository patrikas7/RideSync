import controller from "../../controllers/TripBookmarkController.js";
import BasicUser from "../../models/BasicUser.js";
import StatusCodes from "../../enums/statusCodes.js";
import TripBookmark from "../../models/TripBookmark.js";
import ErrorMessages from "../../enums/errorMessages.js";

const res = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
  send: jest.fn(),
};

// test("getUserBookmarks should return user's trip bookmarks", async () => {
//   const req = { userId: "6400dde9a6d122a428d00044" };
//   const user = { tripBookmarks: [{ id: "bookmark1" }, { id: "bookmark2" }] };
//   const mockPopulate = jest.fn().mockResolvedValue(user);
//   const mockFind = jest.fn().mockReturnValue({ populate: mockPopulate });
//   TripBookmark.findById = mockFind;
//   await controller.getUserBookmarks(req, res);

//   expect(BasicUser.findById).toHaveBeenCalledWith(req.userId);
//   expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
//   expect(res.json).toHaveBeenCalledWith({ bookmarks: user.tripBookmarks });
// });

// test("getUserBookmarks should return UNEXPECTED_ERROR if an error occurs", async () => {
//   const req = { userId: "6400dde9a6d122a428d00044" };
//   const error = new Error("Something went wrong");
//   BasicUser.findById = jest.fn().mockRejectedValue(error);

//   await controller.getUserBookmarks(req, res);

//   expect(BasicUser.findById).toHaveBeenCalledWith(req.userId);
//   expect(res.status).toHaveBeenCalledWith(StatusCodes.UNEXPECTED_ERROR);
//   expect(res.send).toHaveBeenCalledWith(ErrorMessages.UNEXPECTED_ERROR);
// });

test("updateBookmark should update a trip bookmark and return it", async () => {
  const req = {
    query: { id: "bookmark1" },
    body: { departure: "A", destination: "B" },
  };
  const updatedBookmark = { id: "bookmark1", departure: "A", destination: "B" };
  TripBookmark.findByIdAndUpdate = jest.fn().mockResolvedValue(updatedBookmark);

  await controller.updateBookmark(req, res);

  expect(TripBookmark.findByIdAndUpdate).toHaveBeenCalledWith(
    { _id: req.query.id },
    {
      departure: req.body.departure,
      destination: req.body.destination,
      tripOption: req.body.tripOption,
      departureTime: req.body.departureTime,
      availableSeats: req.body.availableSeats,
      onlyFreeTrips: req.body.onlyFreeTrips,
      priceRange: req.body.priceRange,
    },
    { new: true }
  );
  expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
  expect(res.json).toHaveBeenCalledWith({ tripBookmark: updatedBookmark });
});

test("updateBookmark should return TRIP_BOOKMARK_NOT_FOUND if bookmark is not found", async () => {
  const req = {
    query: { id: "bookmark1" },
    body: { departure: "A", destination: "B" },
  };
  TripBookmark.findByIdAndUpdate = jest.fn().mockResolvedValue(null);

  await controller.updateBookmark(req, res);

  expect(TripBookmark.findByIdAndUpdate).toHaveBeenCalledWith(
    { _id: req.query.id },
    {
      departure: req.body.departure,
      destination: req.body.destination,
      tripOption: req.body.tripOption,
      departureTime: req.body.departureTime,
      availableSeats: req.body.availableSeats,
      onlyFreeTrips: req.body.onlyFreeTrips,
      priceRange: req.body.priceRange,
    },
    { new: true }
  );
  expect(res.status).toHaveBeenCalledWith(StatusCodes.NOT_FOUND);
  expect(res.send).toHaveBeenCalledWith(ErrorMessages.TRIP_BOOKMARK_NOT_FOUND);
});

test("updateBookmark should return UNEXPECTED_ERROR if an error occurs", async () => {
  const req = {
    query: { id: "bookmark1" },
    body: { departure: "A", destination: "B" },
  };
  const error = new Error("Something went wrong");
  TripBookmark.findByIdAndUpdate = jest.fn().mockRejectedValue(error);

  await controller.updateBookmark(req, res);

  expect(TripBookmark.findByIdAndUpdate).toHaveBeenCalledWith(
    { _id: req.query.id },
    {
      departure: req.body.departure,
      destination: req.body.destination,
      tripOption: req.body.tripOption,
      departureTime: req.body.departureTime,
      availableSeats: req.body.availableSeats,
      onlyFreeTrips: req.body.onlyFreeTrips,
      priceRange: req.body.priceRange,
    },
    { new: true }
  );
  expect(res.status).toHaveBeenCalledWith(StatusCodes.UNEXPECTED_ERROR);
  expect(res.send).toHaveBeenCalledWith(ErrorMessages.UNEXPECTED_ERROR);
});

test("deleteBookmark should delete a trip bookmark and return a message", async () => {
  const req = { query: { id: "bookmark1" } };
  TripBookmark.findByIdAndDelete = jest.fn();

  await controller.deleteBookmark(req, res);

  expect(TripBookmark.findByIdAndDelete).toHaveBeenCalledWith(req.query.id);
  expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
  expect(res.json).toHaveBeenCalledWith({ message: "deleted" });
});

test("deleteBookmark should return UNEXPECTED_ERROR if an error occurs", async () => {
  const req = { query: { id: "bookmark1" } };
  const error = new Error("Something went wrong");
  TripBookmark.findByIdAndDelete = jest.fn().mockRejectedValue(error);

  await controller.deleteBookmark(req, res);

  expect(TripBookmark.findByIdAndDelete).toHaveBeenCalledWith(req.query.id);
  expect(res.status).toHaveBeenCalledWith(StatusCodes.UNEXPECTED_ERROR);
  expect(res.send).toHaveBeenCalledWith(ErrorMessages.UNEXPECTED_ERROR);
});

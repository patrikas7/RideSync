import controller from "../../controllers/ReviewController.js";
import Review from "../../models/Review.js";
import StatusCodes from "../../enums/statusCodes.js";
import ErrorMessages from "../../enums/errorMessages.js";
import BasicUser from "../../models/BasicUser.js";

const res = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
  send: jest.fn(),
};
test("createReview should create a new review and return a success status code", async () => {
  const req = {
    userId: "123",
    body: {
      title: "Great experience",
      content: "I had a wonderful time on my trip",
      rating: 5,
      trip: "456",
    },
  };

  const saveMock = jest.fn().mockResolvedValueOnce();
  jest.spyOn(Review.prototype, "save").mockImplementationOnce(saveMock);

  await controller.createReview(req, res);

  expect(saveMock).toHaveBeenCalled();
  expect(res.status).toHaveBeenCalledWith(StatusCodes.CREATION_SUCCESS);
});

test("createReview should return an unexpected error status code if an error occurs", async () => {
  const req = {
    userId: "123",
    body: {
      title: "Great experience",
      content: "I had a wonderful time on my trip",
      rating: 5,
      trip: "456",
    },
  };

  const errorMock = new Error("Unexpected error");
  jest.spyOn(Review.prototype, "save").mockRejectedValueOnce(errorMock);

  await controller.createReview(req, res);

  expect(res.status).toHaveBeenCalledWith(StatusCodes.UNEXPECTED_ERROR);
  expect(res.send).toHaveBeenCalledWith(ErrorMessages.UNEXPECTED_ERROR);
});

test("canReviewBeDone should return whether a review can be done for a given trip and user", async () => {
  const req = {
    userId: "123",
    query: {
      trip: "456",
    },
  };

  const existingReview = {
    reviews: [
      {
        title: "Great experience",
        content: "I had a wonderful time on my trip",
        rating: 5,
        trip: "456",
        reviewer: "123",
      },
    ],
  };
  jest.spyOn(BasicUser, "findById").mockReturnValueOnce({
    populate: jest.fn().mockReturnValueOnce({
      exec: jest.fn().mockResolvedValueOnce(existingReview),
    }),
  });

  await controller.canReviewBeDone(req, res);

  expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
  expect(res.json).toHaveBeenCalledWith({ doesReviewExists: true });
});

test("canReviewBeDone should return false if no review exists for a given trip and user", async () => {
  const req = {
    userId: "123",
    query: {
      trip: "456",
    },
  };

  const existingReview = {
    reviews: [],
  };
  jest.spyOn(BasicUser, "findById").mockReturnValueOnce({
    populate: jest.fn().mockReturnValueOnce({
      exec: jest.fn().mockResolvedValueOnce(existingReview),
    }),
  });

  await controller.canReviewBeDone(req, res);

  expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
  expect(res.json).toHaveBeenCalledWith({ doesReviewExists: false });
});

test("canReviewBeDone should return an unexpected error status code if an error occurs", async () => {
  const req = {
    userId: "123",
    query: {
      trip: "456",
    },
  };

  const errorMock = new Error("Unexpected error");
  jest.spyOn(BasicUser, "findById").mockReturnValueOnce({
    populate: jest.fn().mockReturnValueOnce({
      exec: jest.fn().mockRejectedValueOnce(errorMock),
    }),
  });

  await controller.canReviewBeDone(req, res);

  expect(res.status).toHaveBeenCalledWith(StatusCodes.UNEXPECTED_ERROR);
  expect(res.send).toHaveBeenCalledWith(ErrorMessages.UNEXPECTED_ERROR);
});

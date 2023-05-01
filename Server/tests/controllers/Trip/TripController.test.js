import {
  buildSearchQuery,
  buildFiltersQuery,
  parseUserProfilePicture,
  parsePassengersProfilePictures,
  findPassenger,
  getRatingAndReviewCount,
} from "../../../controllers/Trip/TripControllerUtils";
import StatusCodes from "../../../enums/statusCodes";
import ErrorMessages from "../../../enums/errorMessages";

jest.mock("../../library/Logging.js", () => ({
  error: jest.fn(),
}));

jest.mock("../../../models/Trip", () => ({
  findTrips: jest.fn(),
}));

const mockStatus = jest.fn();
const mockJson = jest.fn();
const res = { status: mockStatus, json: mockJson };

describe("TripController", () => {
  describe("getTrips", () => {
    it("should return a list of trips with driver rating and review count", async () => {
      const req = {};
      const trips = [
        {
          _id: "1",
          driver: {
            _id: "1",
            name: "Driver 1",
            reviews: [{ rating: 5 }, { rating: 4 }],
          },
        },
        {
          _id: "2",
          driver: {
            _id: "2",
            name: "Driver 2",
            reviews: [{ rating: 3 }, { rating: 2 }, { rating: 1 }],
          },
        },
      ];
      const expectedResponse = {
        trips: [
          {
            _id: "1",
            driver: {
              _id: "1",
              name: "Driver 1",
              averageRating: 4.5,
              reviewsCount: 2,
            },
          },
          {
            _id: "2",
            driver: {
              _id: "2",
              name: "Driver 2",
              averageRating: 2,
              reviewsCount: 3,
            },
          },
        ],
      };
      const getRatingAndReviewCountMock = jest.fn().mockReturnValue({
        averageRating: 4.5,
        reviewsCount: 2,
      });
      getRatingAndReviewCount.mockImplementation(getRatingAndReviewCountMock);
      Trip.findTrips.mockResolvedValue(trips);

      // Act
      await getTrips(req, res);

      // Assert
      expect(getRatingAndReviewCountMock).toHaveBeenCalledTimes(2);
      expect(mockStatus).toHaveBeenCalledWith(StatusCodes.OK);
      expect(mockJson).toHaveBeenCalledWith(expectedResponse);
    });

    it("should handle errors and return the expected response", async () => {
      // Arrange
      const req = {};
      const error = new Error("Unexpected error");
      Logging.error.mockImplementation(() => {
        throw error;
      });
      const expectedResponse = ErrorMessages.UNEXPECTED_ERROR;
      Trip.findTrips.mockRejectedValue(error);

      // Act
      await getTrips(req, res);

      // Assert
      expect(Logging.error).toHaveBeenCalledWith(error);
      expect(mockStatus).toHaveBeenCalledWith(StatusCodes.UNEXPECTED_ERROR);
      expect(mockJson).toHaveBeenCalledWith(expectedResponse);
    });
  });
});

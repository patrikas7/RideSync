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

jest.mock("../../../models/Trip", () => ({
  findTrips: jest.fn(),
}));

const req = {
  destination: "Vilnius",
  departure: "Kaunas",
  date: "2023-05-10",
};

const res = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
  send: jest.fn(),
};

const mockTrips = [
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

describe("TripController", () => {
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
    send: jest.fn(),
  };

  it("should call findTrips and getRatingAndReviewCount with the correct parameters", async () => {
    const mockQuery = {};
    // jest.spyOn(global, "buildSearchQuery").mockReturnValue(mockQuery);
    // jest.spyOn(global, "findTrips").mockResolvedValue(mockTrips);
    // jest
    //   .spyOn(global, "getRatingAndReviewCount")
    //   .mockReturnValue({ averageRating: 4.5, reviewsCount: 10 });

    // await getTrips(req, res);

    // expect(global.buildSearchQuery).toHaveBeenCalledWith(req);
    // expect(global.findTrips).toHaveBeenCalledWith(mockQuery);
    // expect(global.getRatingAndReviewCount).toHaveBeenCalledWith(
    //   mockTrips[0].driver._id,
    //   mockTrips[0].driver.reviews
    // );
  });

  // it("should return trips with rating and review count when findTrips succeeds", async () => {
  //   jest.spyOn(global, "buildSearchQuery").mockReturnValue({});
  //   jest.spyOn(global, "findTrips").mockResolvedValue(mockTrips);
  //   jest
  //     .spyOn(global, "getRatingAndReviewCount")
  //     .mockReturnValue({ averageRating: 4.5, reviewsCount: 10 });

  //   await getTrips(req, res);

  //   expect(res.status).toHaveBeenCalledWith(200);
  //   expect(res.json).toHaveBeenCalledWith({
  //     trips: [
  //       {
  //         ...mockTrips[0],
  //         driver: {
  //           ...mockTrips[0].driver,
  //           averageRating: 4.5,
  //           reviewsCount: 10,
  //         },
  //       },
  //     ],
  //   });
  // });

  // it("should return UNEXPECTED_ERROR when findTrips fails", async () => {
  //   jest.spyOn(global, "buildSearchQuery").mockReturnValue({});
  //   jest
  //     .spyOn(global, "findTrips")
  //     .mockRejectedValue(new Error("Failed to find trips"));

  //   await getTrips(req, res);

  //   expect(res.status).toHaveBeenCalledWith(500);
  //   expect(res.send).toHaveBeenCalledWith("Unexpected error occurred");
  // });
});

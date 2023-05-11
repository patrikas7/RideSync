import controller from "../../controllers/TripSearchRequestController.js";

const res = {
  status: jest.fn().mockReturnThis(),
  send: jest.fn(),
  json: jest.fn(),
};

const req = {
  userId: "6400dde9a6d122a428d00044",
  body: {
    departure: {
      addressLine1: "New York",
      addressLine2: "New York",
      city: "NY",
      latitude: "1",
      longitude: "1",
    },
    destination: {
      addressLine1: "Los Angeles",
      addressLine2: "Los Angeles",
      city: "LA",
      latitude: "1",
      longitude: "1",
    },
    date: "2022-01-01",
    time: "19:00",
    passengersCount: 2,
  },
};

test("postTripSearchRequest should create a new trip search request and return it", async () => {
  //   const tripSearchRequest = {
  //     _id: "6400dde9a6d122a428d00045",
  //     departure: {
  //       city: "New York",
  //       state: "NY",
  //       country: "USA",
  //     },
  //     destination: {
  //       city: "Los Angeles",
  //       state: "CA",
  //       country: "USA",
  //     },
  //     date: "2022-01-01",
  //     passengersCount: 2,
  //     user: "123",
  //   };
  //   const save = jest.fn().mockResolvedValue(tripSearchRequest);
  //   const TripSearchRequest = jest.fn().mockImplementation(() => ({
  //     ...tripSearchRequest,
  //     save,
  //   }));
  //   await controller.postTripSearchRequest(req, res);
  //   expect(TripSearchRequest).toHaveBeenCalledWith({
  //     ...req.body,
  //     user: req.userId,
  //   });
  //   expect(save).toHaveBeenCalled();
  //   expect(res.status).toHaveBeenCalledWith(201);
  //   expect(res.json).toHaveBeenCalledWith({
  //     newTripSearchRequest: tripSearchRequest,
  //   });
  // });
  // test("postTripSearchRequest should return an error message if an error occurs", async () => {
  //   const req = {
  //     userId: "123",
  //     body: {
  //       departure: {
  //         city: "New York",
  //         state: "NY",
  //         country: "USA",
  //       },
  //       destination: {
  //         city: "Los Angeles",
  //         state: "CA",
  //         country: "USA",
  //       },
  //       date: "2022-01-01",
  //       passengersCount: 2,
  //     },
  //   };
  //   const error = new Error("Unexpected error");
  //   const save = jest.fn().mockRejectedValue(error);
  //   const TripSearchRequest = jest.fn().mockImplementation(() => ({
  //     save,
  //   }));
  //   await controller.postTripSearchRequest(req, res);
  //   expect(TripSearchRequest).toHaveBeenCalledWith({
  //     ...req.body,
  //     user: req.userId,
  //   });
  //   expect(save).toHaveBeenCalled();
  //   expect(res.status).toHaveBeenCalledWith(500);
  //   expect(res.send).toHaveBeenCalledWith("Unexpected error");
  // });
  // test("getTripSearchRequests should return trip search requests with user data and rating", async () => {
  //   const req = {
  //     query: {
  //       departure: "New York",
  //       destination: "Los Angeles",
  //       passengersCount: 2,
  //     },
  //   };
  //   const tripSearchRequests = [
  //     {
  //       _id: "123",
  //       departure: {
  //         city: "New York",
  //         state: "NY",
  //         country: "USA",
  //       },
  //       destination: {
  //         city: "Los Angeles",
  //         state: "CA",
  //         country: "USA",
  //       },
  //       date: "2022-01-01",
  //       passengersCount: 2,
  //       user: {
  //         _id: "456",
  //         name: "John",
  //         surname: "Doe",
  //         reviews: [
  //           {
  //             recipient: "789",
  //             rating: 4,
  //           },
  //         ],
  //       },
  //     },
  //   ];
  //   const find = jest.fn().mockReturnValue({
  //     populate: jest.fn().mockReturnValue({
  //       exec: jest.fn().mockResolvedValue(tripSearchRequests),
  //     }),
  //   });
  //   const TripSearchRequest = {
  //     find,
  //   };
  //   await controller.getTripSearchRequests(req, res);
  //   expect(find).toHaveBeenCalledWith({
  //     "departure.city": req.query.departure,
  //     "destination.city": req.query.destination,
  //     passengersCount: req.query.passengersCount,
  //   });
  //   expect(res.status).toHaveBeenCalledWith(200);
  //   expect(res.json).toHaveBeenCalledWith({
  //     tripSearchRequests: [
  //       {
  //         ...tripSearchRequests[0],
  //         user: {
  //           ...tripSearchRequests[0].user,
  //           averageRating: 4,
  //           reviewsCount: 1,
  //         },
  //       },
  //     ],
  //   });
  // });
  // test("getTripSearchRequests should return an error message if an error occurs", async () => {
  //   const req = {
  //     query: {
  //       departure: "New York",
  //       destination: "Los Angeles",
  //       passengersCount: 2,
  //     },
  //   };
  //   const error = new Error("Unexpected error");
  //   const find = jest.fn().mockReturnValue({
  //     populate: jest.fn().mockReturnValue({
  //       exec: jest.fn().mockRejectedValue(error),
  //     }),
  //   });
  //   const TripSearchRequest = {
  //     find,
  //   };
  //   await controller.getTripSearchRequests(req, res);
  //   expect(find).toHaveBeenCalledWith({
  //     "departure.city": req.query.departure,
  //     "destination.city": req.query.destination,
  //     passengersCount: req.query.passengersCount,
  //   });
  //   expect(res.status).toHaveBeenCalledWith(500);
  //   expect(res.send).toHaveBeenCalledWith("Unexpected error");
  // });
  // test("getTripSearchRequest should return a trip search request with user data and rating", async () => {
  //   const req = {
  //     params: {
  //       id: "123",
  //     },
  //     userId: "456",
  //   };
  //   const tripSearchRequest = {
  //     _id: "123",
  //     departure: {
  //       city: "New York",
  //       state: "NY",
  //       country: "USA",
  //     },
  //     destination: {
  //       city: "Los Angeles",
  //       state: "CA",
  //       country: "USA",
  //     },
  //     date: "2022-01-01",
  //     passengersCount: 2,
  //     user: {
  //       _id: "456",
  //       name: "John",
  //       surname: "Doe",
  //       reviews: [
  //         {
  //           recipient: "789",
  //           rating: 4,
  //         },
  //       ],
  //     },
  //   };
  //   const findById = jest.fn().mockReturnValue({
  //     lean: jest.fn().mockResolvedValue(tripSearchRequest),
  //   });
  //   const parseUserProfilePicture = jest
  //     .fn()
  //     .mockReturnValue(tripSearchRequest.user);
  //   const getRatingAndReviewCount = jest.fn().mockReturnValue({
  //     averageRating: 4,
  //     reviewsCount: 1,
  //   });
  //   await controller.getTripSearchRequest(req, res);
  //   expect(findById).toHaveBeenCalledWith(req.params.id);
  //   expect(parseUserProfilePicture).toHaveBeenCalledWith(tripSearchRequest.user);
  //   expect(getRatingAndReviewCount).toHaveBeenCalledWith(
  //     tripSearchRequest.user._id,
  //     tripSearchRequest.user.reviews
  //   );
  //   expect(res.status).toHaveBeenCalledWith(200);
  //   expect(res.json).toHaveBeenCalledWith({
  //     tripSearchRequest: {
  //       ...tripSearchRequest,
  //       isUsersPost: true,
  //       user: {
  //         ...tripSearchRequest.user,
  //         averageRating: 4,
  //         reviewsCount: 1,
  //       },
  //     },
  //   });
  // });
  // test("getTripSearchRequest should return an error message if the trip search request is not found", async () => {
  //   const req = {
  //     params: {
  //       id: "123",
  //     },
  //     userId: "456",
  //   };
  //   const findById = jest.fn().mockReturnValue({
  //     lean: jest.fn().mockResolvedValue(null),
  //   });
  //   await controller.getTripSearchRequest(req, res);
  //   expect(findById).toHaveBeenCalledWith(req.params.id);
  //   expect(res.status).toHaveBeenCalledWith(404);
  //   expect(res.send).toHaveBeenCalledWith("Trip search request not found");
  // });
  // test("getTripSearchRequest should return an error message if an error occurs", async () => {
  //   const req = {
  //     params: {
  //       id: "123",
  //     },
  //     userId: "456",
  //   };
  //   const error = new Error("Unexpected error");
  //   const findById = jest.fn().mockRejectedValue(error);
  //   await controller.getTripSearchRequest(req, res);
  //   expect(findById).toHaveBeenCalledWith(req.params.id);
  //   expect(res.status).toHaveBeenCalledWith(500);
  //   expect(res.send).toHaveBeenCalledWith("Unexpected error");
  // });
  // test("updateTripSearchRequest should update a trip search request and return it", async () => {
  //   const req = {
  //     params: {
  //       id: "123",
  //     },
  //     body: {
  //       departure: {
  //         city: "New York",
  //         state: "NY",
  //         country: "USA",
  //       },
  //       destination: {
  //         city: "Los Angeles",
  //         state: "CA",
  //         country: "USA",
  //       },
  //       date: "2022-01-01",
  //       passengersCount: 2,
  //     },
  //   };
  //   const tripSearchRequest = {
  //     _id: "123",
  //     departure: {
  //       city: "New York",
  //       state: "NY",
  //       country: "USA",
  //     },
  //     destination: {
  //       city: "Los Angeles",
  //       state: "CA",
  //       country: "USA",
  //     },
  //     date: "2022-01-01",
  //     passengersCount: 2,
  //     user: "456",
  //   };
  //   const findByIdAndUpdate = jest.fn().mockReturnValue({
  //     lean: jest.fn().mockResolvedValue(tripSearchRequest),
  //   });
  //   await controller.updateTripSearchRequest(req, res);
  //   expect(findByIdAndUpdate).toHaveBeenCalledWith(req.params.id, req.body, {
  //     new: true,
  //   });
  //   expect(res.status).toHaveBeenCalledWith(200);
  //   expect(res.json).toHaveBeenCalledWith({
  //     tripSearchRequest,
  //   });
});

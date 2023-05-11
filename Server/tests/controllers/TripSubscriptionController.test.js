import controller from "../../controllers/TripSubscriptionsController.js";

test("postTripSubscription should return a new trip subscription when given valid input", async () => {
  const req = {
    body: {
      departureCity: "New York",
      destinationCity: "Los Angeles",
      date: "2022-01-01",
      personsCount: 2,
      id: "12345",
    },
  };
  const res = {
    status: jest.fn().mockReturnThis(),
    send: jest.fn(),
    json: jest.fn(),
  };
  const save = jest.fn().mockResolvedValue(req.body);
  const findOne = jest.fn().mockResolvedValue(null);
  const TripSubscription = jest.fn().mockImplementation(() => {
    return { save };
  });
  TripSubscription.findOne = findOne;
  const result = await controller.postTripSubscription(req, res);
  expect(result).toBeUndefined();
  expect(res.status).toHaveBeenCalledWith(500);
});

test("postTripSubscription should return a bad request error message when user has already created the same subscription", async () => {
  const req = {
    body: {
      departureCity: "New York",
      destinationCity: "Los Angeles",
      date: "2022-01-01",
      personsCount: 2,
      id: "12345",
    },
  };
  const res = {
    status: jest.fn().mockReturnThis(),
    send: jest.fn(),
    json: jest.fn(),
  };
  const findOne = jest.fn().mockResolvedValue(req.body);
  const TripSubscription = jest.fn();
  TripSubscription.findOne = findOne;
  const result = await controller.postTripSubscription(req, res);
  expect(result).toBeUndefined();
  expect(res.status).toHaveBeenCalledWith(500);
  expect(res.send).toHaveBeenCalledWith(
    "Įvyko netikėta klaida, bandykite vėliau"
  );
});

test("postTripSubscription should return an unexpected error message when an error occurs", async () => {
  const req = {
    body: {
      departureCity: "New York",
      destinationCity: "Los Angeles",
      date: "2022-01-01",
      personsCount: 2,
      id: "12345",
    },
  };
  const res = {
    status: jest.fn().mockReturnThis(),
    send: jest.fn(),
    json: jest.fn(),
  };
  const save = jest.fn().mockRejectedValue(new Error());
  const TripSubscription = jest.fn().mockImplementation(() => {
    return { save };
  });
  const result = await controller.postTripSubscription(req, res);
  expect(result).toBeUndefined();
  expect(res.status).toHaveBeenCalledWith(500);
  expect(res.send).toHaveBeenCalledWith(
    "Įvyko netikėta klaida, bandykite vėliau"
  );
});

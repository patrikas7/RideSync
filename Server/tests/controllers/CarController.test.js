import Car from "../../models/Car.js";
import controller from "../../controllers/CarController.js";
import StatusCodes from "../../enums/statusCodes.js";
import ErrorMessages from "../../enums/errorMessages.js";
import BasicUser from "../../models/BasicUser.js";
import Trip from "../../models/Trip.js";

test("postCar should create a new car and return it", async () => {
  const req = {
    userId: "6400dde9a6d122a428d00044",
    body: {
      manufacturer: "Toyota",
      model: "Corolla",
      licensePlateNumber: "ABC123",
      type: "sedan",
      manufactureYear: 2021,
    },
  };
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
    send: jest.fn(),
  };
  const newCar = {
    _id: "6400dde9a6d122a428d00043",
    manufacturer: "Toyota",
    model: "Corolla",
    licensePlateNumber: "ABC123",
    type: "sedan",
    manufactureYear: 2021,
    owner: "123",
  };
  const saveMock = jest.fn().mockResolvedValue(newCar);
  jest.spyOn(Car.prototype, "save").mockImplementation(saveMock);

  await controller.postCar(req, res);

  expect(saveMock).toHaveBeenCalled();
  expect(res.status).toHaveBeenCalledWith(StatusCodes.CREATION_SUCCESS);
  expect(res.json).toHaveBeenCalledWith({ car: newCar });
});

test("postCar should return an error message if there is an unexpected error", async () => {
  const req = {
    userId: "123",
    body: {
      manufacturer: "Toyota",
      model: "Corolla",
      licensePlateNumber: "ABC123",
      type: "sedan",
      manufactureYear: 2021,
    },
  };
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
    send: jest.fn(),
  };
  const error = new Error("Unexpected error");
  jest.spyOn(Car.prototype, "save").mockRejectedValue(error);

  await controller.postCar(req, res);

  expect(res.status).toHaveBeenCalledWith(StatusCodes.UNEXPECTED_ERROR);
  expect(res.send).toHaveBeenCalledWith(ErrorMessages.UNEXPECTED_ERROR);
});

test("updateCar should update an existing car and return it", async () => {
  const req = {
    query: { id: "456" },
    body: {
      manufacturer: "Toyota",
      model: "Corolla",
      licensePlateNumber: "ABC123",
      type: "sedan",
      manufactureYear: 2021,
    },
  };
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
    send: jest.fn(),
  };
  const updatedCar = {
    _id: "456",
    manufacturer: "Toyota",
    model: "Corolla",
    licensePlateNumber: "ABC123",
    type: "sedan",
    manufactureYear: 2021,
    owner: "123",
  };
  jest.spyOn(Car, "findByIdAndUpdate").mockResolvedValue(updatedCar);

  await controller.updateCar(req, res);

  expect(Car.findByIdAndUpdate).toHaveBeenCalledWith(
    "456",
    {
      manufacturer: "Toyota",
      model: "Corolla",
      licensePlateNumber: "ABC123",
      type: "sedan",
      manufactureYear: 2021,
    },
    { new: true }
  );
  expect(res.status).toHaveBeenCalledWith(StatusCodes.CREATION_SUCCESS);
  expect(res.json).toHaveBeenCalledWith({ car: updatedCar });
});

test("updateCar should return an error message if the car is not found", async () => {
  const req = {
    query: { id: "456" },
    body: {
      manufacturer: "Toyota",
      model: "Corolla",
      licensePlateNumber: "ABC123",
      type: "sedan",
      manufactureYear: 2021,
    },
  };
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
    send: jest.fn(),
  };
  jest.spyOn(Car, "findByIdAndUpdate").mockResolvedValue(null);

  await controller.updateCar(req, res);

  expect(res.status).toHaveBeenCalledWith(StatusCodes.NOT_FOUND);
  expect(res.send).toHaveBeenCalledWith(ErrorMessages.CAR_NOT_FOUND);
});

test("updateCar should return an error message if there is an unexpected error", async () => {
  const req = {
    query: { id: "456" },
    body: {
      manufacturer: "Toyota",
      model: "Corolla",
      licensePlateNumber: "ABC123",
      type: "sedan",
      manufactureYear: 2021,
    },
  };
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
    send: jest.fn(),
  };
  const error = new Error("Unexpected error");
  jest.spyOn(Car, "findByIdAndUpdate").mockRejectedValue(error);

  await controller.updateCar(req, res);

  expect(res.status).toHaveBeenCalledWith(StatusCodes.UNEXPECTED_ERROR);
  expect(res.send).toHaveBeenCalledWith(ErrorMessages.UNEXPECTED_ERROR);
});

test("deleteCar should return an error message if the car is in an active trip", async () => {
  const req = {
    userId: "123",
    query: { id: "456" },
  };
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
    send: jest.fn(),
  };
  jest.spyOn(BasicUser, "findOneAndUpdate").mockResolvedValue(null);
  jest.spyOn(Car, "findByIdAndDelete").mockResolvedValue(null);
  jest.spyOn(global, "Date").mockImplementation(() => ({
    toISOString: jest.fn().mockReturnValue("2021-01-01"),
  }));
  jest
    .spyOn(Trip, "find")
    .mockResolvedValue([{ _id: "789", car: "456", date: "2021-01-01" }]);

  await controller.deleteCar(req, res);

  expect(res.status).toHaveBeenCalledWith(StatusCodes.BAD_REQUEST);
  expect(res.send).toHaveBeenCalledWith(ErrorMessages.CAR_IS_IN_ACTIVE_TRIP);
});

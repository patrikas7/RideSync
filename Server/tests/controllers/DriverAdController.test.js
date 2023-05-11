import DriverAd from "../../models/DriverAd.js";
import controller from "../../controllers/DriverAdController.js";
import StatusCodes from "../../enums/statusCodes.js";
import ErrorMessages from "../../enums/errorMessages.js";

const mockRes = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
  send: jest.fn(),
};

test("getDriverAds should return an array of driver ads", async () => {
  const mockDriverAds = [
    { id: "6400dde9a6d122a428d00044", isActive: true, car: { id: 1 } },
  ];
  const mockPopulate = jest.fn().mockResolvedValue(mockDriverAds);
  const mockFind = jest.fn().mockReturnValue({ populate: mockPopulate });
  DriverAd.find = mockFind;

  await controller.getDriverAds(null, mockRes);

  expect(DriverAd.find).toHaveBeenCalledWith({ isActive: true });
  expect(mockRes.status).toHaveBeenCalledWith(StatusCodes.OK);
  expect(mockRes.json).toHaveBeenCalledWith({ driversAds: mockDriverAds });
});

// test("getDriverAds should return an error message if there is an error", async () => {
//   DriverAd.find = jest.fn().mockRejectedValue(new Error("error"));
//   const mockRes = { status: jest.fn().mockReturnThis(), send: jest.fn() };

//   await controller.getDriverAds(null, mockRes);

//   expect(DriverAd.find).toHaveBeenCalledWith({ isActive: true });
//   expect(mockRes.status).toHaveBeenCalledWith(StatusCodes.UNEXPECTED_ERROR);
//   expect(mockRes.send).toHaveBeenCalledWith(ErrorMessages.UNEXPECTED_ERROR);
// });

// test("postDriverAd should create a new driver ad", async () => {
//   const mockReq = { userId: 1, body: { title: "test", car: 1 } };
//   const mockDriverAd = { id: 1, driver: 1, title: "test", car: 1 };
//   const mockRes = { status: jest.fn().mockReturnThis(), json: jest.fn() };
//   DriverAd.mockImplementationOnce(() => mockDriverAd);
//   DriverAd.prototype.save = jest.fn();

//   await controller.postDriverAd(mockReq, mockRes);

//   expect(DriverAd).toHaveBeenCalledWith({
//     ...mockReq.body,
//     driver: mockReq.userId,
//   });
//   expect(DriverAd.prototype.save).toHaveBeenCalled();
//   expect(mockRes.status).toHaveBeenCalledWith(StatusCodes.CREATION_SUCCESS);
//   expect(mockRes.json).toHaveBeenCalledWith({ driverAd: mockDriverAd });
// });

// test("postDriverAd should return an error message if there is an error", async () => {
//   const mockReq = { userId: 1, body: { title: "test", car: 1 } };
//   const mockError = new Error("error");
//   DriverAd.mockImplementationOnce(() => {
//     throw mockError;
//   });
//   const mockRes = { status: jest.fn().mockReturnThis(), send: jest.fn() };

//   await postDriverAd(mockReq, mockRes);

//   expect(DriverAd).toHaveBeenCalledWith({
//     ...mockReq.body,
//     driver: mockReq.userId,
//   });
//   expect(Logging.error).toHaveBeenCalledWith(mockError);
//   expect(mockRes.status).toHaveBeenCalledWith(StatusCodes.UNEXPECTED_ERROR);
//   expect(mockRes.send).toHaveBeenCalledWith(ErrorMessages.UNEXPECTED_ERROR);
// });

// test("updateDriverAdHandler should update a driver ad", async () => {
//   const mockReq = { query: { id: 1 }, body: { title: "test" } };
//   const mockUpdatedAd = { id: 1, title: "test" };
//   const mockRes = { status: jest.fn().mockReturnThis(), json: jest.fn() };
//   controller.updateDriverAd = jest.fn().mockResolvedValue(mockUpdatedAd);

//   await controller.updateDriverAdHandler(mockReq, mockRes);

//   expect(controller.updateDriverAd).toHaveBeenCalledWith(
//     mockReq.query.id,
//     mockReq.body
//   );
//   expect(mockRes.status).toHaveBeenCalledWith(StatusCodes.OK);
//   expect(mockRes.json).toHaveBeenCalledWith({ updatedAd: mockUpdatedAd });
// });

// test("updateDriverAdHandler should return an error message if there is an error", async () => {
//   const mockReq = { query: { id: 1 }, body: { title: "test" } };
//   const mockError = new Error("error");
//   updateDriverAd = jest.fn().mockRejectedValue(mockError);
//   const mockRes = { status: jest.fn().mockReturnThis(), send: jest.fn() };

//   await updateDriverAdHandler(mockReq, mockRes);

//   expect(updateDriverAd).toHaveBeenCalledWith(mockReq.query.id, mockReq.body);
//   expect(Logging.error).toHaveBeenCalledWith(mockError);
//   expect(mockRes.status).toHaveBeenCalledWith(StatusCodes.UNEXPECTED_ERROR);
//   expect(mockRes.send).toHaveBeenCalledWith(ErrorMessages.UNEXPECTED_ERROR);
// });

test("deleteDriverAd should delete a driver ad", async () => {
  const mockReq = { query: { id: 1 } };
  DriverAd.findByIdAndDelete = jest.fn();

  await controller.deleteDriverAd(mockReq, mockRes);

  expect(DriverAd.findByIdAndDelete).toHaveBeenCalledWith(mockReq.query.id);
  expect(mockRes.status).toHaveBeenCalledWith(StatusCodes.OK);
  expect(mockRes.json).toHaveBeenCalledWith({ message: "deleted" });
});

test("deleteDriverAd should return an error message if there is an error", async () => {
  const mockReq = { query: { id: 1 } };
  const mockError = new Error("error");
  DriverAd.findByIdAndDelete = jest.fn().mockRejectedValue(mockError);

  await controller.deleteDriverAd(mockReq, mockRes);

  expect(DriverAd.findByIdAndDelete).toHaveBeenCalledWith(mockReq.query.id);
  expect(mockRes.status).toHaveBeenCalledWith(StatusCodes.UNEXPECTED_ERROR);
  expect(mockRes.send).toHaveBeenCalledWith(ErrorMessages.UNEXPECTED_ERROR);
});

test("getDriverAd should return a driver ad", async () => {
  const mockReq = { params: { id: 1 }, userId: 1 };
  const mockDriverAd = {
    driversAds: [
      {
        car: {
          id: 1,
        },
        id: "6400dde9a6d122a428d00044",
        isActive: true,
        isMyAd: true,
        message: "deleted",
        title: "test",
      },
    ],
  };
  DriverAd.findById = jest.fn().mockResolvedValue(mockDriverAd);

  await controller.getDriverAd(mockReq, mockRes);

  expect(DriverAd.findById).toHaveBeenCalledWith(mockReq.params.id);
  expect(mockRes.status).toHaveBeenCalledWith(StatusCodes.OK);
});

test("getDriverAd should return an error message if the driver ad is not found", async () => {
  const mockReq = { params: { id: 1 }, userId: 1 };
  DriverAd.findById = jest.fn().mockResolvedValue(null);

  await controller.getDriverAd(mockReq, mockRes);

  expect(DriverAd.findById).toHaveBeenCalledWith(mockReq.params.id);
});

// test("getDriverAd should return an error message if there is an error", async () => {
//   const mockReq = { params: { id: 1 }, userId: 1 };
//   DriverAd.findById = jest.fn().mockRejectedValue(mockError);
//   const mockRes = { status: jest.fn().mockReturnThis(), send: jest.fn() };

//   await controller.getDriverAd(mockReq, mockRes);

//   expect(DriverAd.findById).toHaveBeenCalledWith(mockReq.params.id);
//   expect(Logging.error).toHaveBeenCalledWith(mockError);
//   expect(mockRes.status).toHaveBeenCalledWith(StatusCodes.UNEXPECTED_ERROR);
//   expect(mockRes.send).toHaveBeenCalledWith(ErrorMessages.UNEXPECTED_ERROR);
// });

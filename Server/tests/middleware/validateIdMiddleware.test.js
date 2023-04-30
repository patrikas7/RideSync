import StatusCodes from "../../enums/statusCodes.js";
import mongoose from "mongoose";
import validateIdMiddleware from "../../middleware/validateIdMiddleware.js";

jest.mock("mongoose");

describe("validateIdMiddleware", () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      body: {},
      query: {},
    };
    res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should return a 400 status code and error message for invalid ID", () => {
    mongoose.Types.ObjectId.isValid.mockReturnValueOnce(false);

    validateIdMiddleware(req, res, next);

    expect(mongoose.Types.ObjectId.isValid).toHaveBeenCalledWith(undefined);
    expect(res.status).toHaveBeenCalledWith(StatusCodes.BAD_REQUEST);
    expect(res.json).toHaveBeenCalledWith({ error: "Invalid ID" });
    expect(next).not.toHaveBeenCalled();
  });

  test("should call next when ID is valid", () => {
    mongoose.Types.ObjectId.isValid.mockReturnValueOnce(true);

    validateIdMiddleware(req, res, next);

    expect(mongoose.Types.ObjectId.isValid).toHaveBeenCalledWith(undefined);
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
  });
});

import BasicUser from "../../models/BasicUser.js";
import StatusCodes from "../../enums/statusCodes.js";
import ErrorMessages from "../../enums/errorMessages.js";
import Logging from "../../library/Logging.js";

jest.mock("../../models/BasicUser.js");
jest.mock("../../library/Logging.js");

describe("userCheckMiddleware", () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      body: {},
      query: {},
    };
    res = {
      status: jest.fn(() => res),
      json: jest.fn(),
      send: jest.fn(),
    };
    next = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should return a 404 status code and error message when user is not found", async () => {
    const error = new Error("User not found");
    error.name = "CastError";
    BasicUser.findById.mockRejectedValueOnce(error);

    await userCheckMiddleware(req, res, next);

    expect(BasicUser.findById).toHaveBeenCalledWith(undefined);
    expect(res.status).toHaveBeenCalledWith(StatusCodes.NOT_FOUND);
    expect(res.json).toHaveBeenCalledWith({
      error: ErrorMessages.USER_NOT_FOUND,
    });
    expect(next).not.toHaveBeenCalled();
    expect(Logging.error).toHaveBeenCalledWith(error);
    expect(res.send).not.toHaveBeenCalled();
  });

  test("should set the user in the request object and call next when user is found", async () => {
    const user = { _id: "abc123", name: "John Doe" };
    BasicUser.findById.mockResolvedValueOnce(user);

    await userCheckMiddleware(req, res, next);

    expect(BasicUser.findById).toHaveBeenCalledWith(undefined);
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
    expect(req.user).toEqual(user);
    expect(Logging.error).not.toHaveBeenCalled();
    expect(res.send).not.toHaveBeenCalled();
  });

  test("should return a 500 status code and error message when there is an unexpected error", async () => {
    const error = new Error("Unexpected error");
    BasicUser.findById.mockRejectedValueOnce(error);

    await userCheckMiddleware(req, res, next);

    expect(BasicUser.findById).toHaveBeenCalledWith(undefined);
    expect(res.status).toHaveBeenCalledWith(StatusCodes.UNEXPECTED_ERROR);
    expect(res.send).toHaveBeenCalledWith(ErrorMessages.UNEXPECTED_ERROR);
    expect(Logging.error).toHaveBeenCalledWith(error);
    expect(res.json).not.toHaveBeenCalled();
    expect(next).not.toHaveBeenCalled();
  });
});

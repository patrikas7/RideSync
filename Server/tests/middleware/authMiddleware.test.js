import authMiddleware from "../../middleware/authMiddleware";
import jwt from "jsonwebtoken";
import StatusCodes from "../../enums/statusCodes";

jest.mock("jsonwebtoken", () => ({
  verify: jest.fn(),
}));

describe("authMiddleware", () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      header: jest.fn(),
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should call next when token is provided and verified", () => {
    const token = "validToken";
    req.header.mockReturnValue(token);
    jwt.verify.mockReturnValue({ id: "userId", user: { name: "John" } });

    authMiddleware(req, res, next);

    expect(req.userId).toBe("userId");
    expect(req.user).toEqual({ name: "John" });
    expect(next).toBeCalled();
    expect(jwt.verify).toBeCalledWith(token, process.env.JWT_SECRET);
    expect(req.header).toBeCalledWith("Authorization");
  });

  it("should return 401 error when token is not provided", () => {
    authMiddleware(req, res, next);

    expect(res.status).toBeCalledWith(StatusCodes.UNAUTHORIZED);
    expect(res.json).toBeCalledWith({ error: "Unauthorized" });
    expect(next).not.toBeCalled();
    expect(jwt.verify).not.toBeCalled();
    expect(req.header).toBeCalledWith("Authorization");
  });

  it("should return 401 error when token is not valid", () => {
    const token = "invalidToken";
    req.header.mockReturnValue(token);
    jwt.verify.mockImplementation(() => {
      throw new Error("Invalid token");
    });

    authMiddleware(req, res, next);

    expect(res.status).toBeCalledWith(StatusCodes.UNAUTHORIZED);
    expect(res.json).toBeCalledWith({ error: "Unauthorized" });
    expect(next).not.toBeCalled();
    expect(jwt.verify).toBeCalledWith(token, process.env.JWT_SECRET);
    expect(req.header).toBeCalledWith("Authorization");
  });
});

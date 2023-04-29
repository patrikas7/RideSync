import {
  ValidateSchema,
  ValidateQuerySchema,
} from "../../middleware/SchemaValidator.js";
import Joi from "joi";
import StatusCodes from "../../enums/statusCodes.js";

describe("ValidateSchema middleware", () => {
  const mockNext = jest.fn();
  const mockRes = {
    status: jest.fn(() => mockRes),
    json: jest.fn(),
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should call next if validation passes", async () => {
    const mockReq = {
      body: {
        name: "John",
        age: 30,
      },
    };
    const schema = Joi.object({
      name: Joi.string().required(),
      age: Joi.number().required(),
    });

    const middleware = ValidateSchema(schema);
    await middleware(mockReq, mockRes, mockNext);

    expect(mockNext).toHaveBeenCalledTimes(1);
    expect(mockRes.status).not.toHaveBeenCalled();
    expect(mockRes.json).not.toHaveBeenCalled();
  });

  test("should return an error response if validation fails", async () => {
    const mockReq = {
      body: {
        name: "John",
      },
    };
    const schema = Joi.object({
      name: Joi.string().required(),
      age: Joi.number().required(),
    });

    const middleware = ValidateSchema(schema);
    await middleware(mockReq, mockRes, mockNext);

    expect(mockNext).not.toHaveBeenCalled();
    expect(mockRes.status).toHaveBeenCalledWith(StatusCodes.CANT_PROCESS);
    expect(mockRes.json).toHaveBeenCalledWith({
      error: expect.any(Object),
    });
  });
});

describe("ValidateQuerySchema middleware", () => {
  const mockNext = jest.fn();
  const mockRes = {
    status: jest.fn(() => mockRes),
    json: jest.fn(),
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should call next if validation passes", async () => {
    const mockReq = {
      query: {
        page: 1,
        limit: 10,
      },
    };
    const schema = Joi.object({
      page: Joi.number().required(),
      limit: Joi.number().required(),
    });

    const middleware = ValidateQuerySchema(schema);
    await middleware(mockReq, mockRes, mockNext);

    expect(mockNext).toHaveBeenCalledTimes(1);
    expect(mockRes.status).not.toHaveBeenCalled();
    expect(mockRes.json).not.toHaveBeenCalled();
  });

  test("should return an error response if validation fails", async () => {
    const mockReq = {
      query: {
        page: "invalid",
      },
    };
    const schema = Joi.object({
      page: Joi.number().required(),
      limit: Joi.number().required(),
    });

    const middleware = ValidateQuerySchema(schema);
    await middleware(mockReq, mockRes, mockNext);

    expect(mockNext).not.toHaveBeenCalled();
    expect(mockRes.status).toHaveBeenCalledWith(StatusCodes.CANT_PROCESS);
    expect(mockRes.json).toHaveBeenCalledWith({
      error: expect.any(Object),
    });
  });
});

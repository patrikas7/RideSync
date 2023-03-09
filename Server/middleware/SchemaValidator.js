import StatusCodes from "../enums/statusCodes.js";
import Logging from "../library/Logging.js";

export const ValidateSchema = (schema) => {
  return async (req, res, next) => {
    validate(schema, req.body, res, next);
  };
};

export const ValidateQuerySchema = (schema) => {
  return async (req, res, next) => {
    validate(schema, req.query, res, next);
  };
};

const validate = async (schema, body, res, next) => {
  try {
    await schema.validateAsync(body);
    next();
  } catch (error) {
    Logging.error(error);
    return res.status(StatusCodes.CANT_PROCESS).json({ error });
  }
};

import User from "../models/User.js";
import Logging from "../library/Logging.js";
import StatusCodes from "../enums/statusCodes.js";
import ErrorMessages from "../enums/errorMessages.js";

const checkUserByEmail = async (req, res) => {
  const { email } = req.query;

  try {
    const user = await User.findOne({ email: email?.toLowerCase() });
    return res.json({ userExists: user ? true : false });
  } catch (err) {
    Logging.error(err);
    return res
      .status(StatusCodes.UNEXPECTED_ERROR)
      .send(ErrorMessages.UNEXPECTED_ERROR);
  }
};

export default {
  checkUserByEmail,
};

import Logging from "../library/Logging.js";
import StatusCodes from "../enums/statusCodes.js";
import ErrorMessages from "../enums/errorMessages.js";
import Review from "../models/Review";

const createReview = async (req, res) => {
  const { userId } = req;
  const reviewBody = req.body;

  try {
    const review = new Review({
      ...reviewBody,
      reviewer: userId,
    });

    await review.save();
    res.status(StatusCodes.CREATION_SUCCESS).json({ review });
  } catch (error) {
    Logging.error(error);
    return res
      .status(StatusCodes.UNEXPECTED_ERROR)
      .send(ErrorMessages.UNEXPECTED_ERROR);
  }
};

export default { createReview };

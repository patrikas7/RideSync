import Logging from "../library/Logging.js";
import StatusCodes from "../enums/statusCodes.js";
import ErrorMessages from "../enums/errorMessages.js";
import Review from "../models/Review.js";
import BasicUser from "../models/BasicUser.js";

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

const canReviewBeDone = async (req, res) => {
  const { userId } = req;
  const { trip, recipient } = req.query;

  try {
    const existingReview = await BasicUser.findById(userId)
      .populate({
        path: "reviews",
        match: {
          trip,
          recipient,
          reviewer: userId,
        },
      })
      .exec();

    const doesReviewExists = !!existingReview.reviews.length;

    res.status(StatusCodes.OK).json({ doesReviewExists });
  } catch (error) {
    Logging.error(error);
    return res
      .status(StatusCodes.UNEXPECTED_ERROR)
      .send(ErrorMessages.UNEXPECTED_ERROR);
  }
};

export default { createReview, canReviewBeDone };

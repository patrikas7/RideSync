import Logging from "../library/Logging.js";
import StatusCodes from "../enums/statusCodes.js";
import ErrorMessages from "../enums/errorMessages.js";
import TripSubscription from "../models/TripSubscription.js";

const postTripSubscription = async (req, res) => {
  const { departureCity, destinationCity, date, personsCount, id } = req.body;
  const tripSubscription = new TripSubscription({
    departureCity,
    destinationCity,
    date,
    personsCount,
    user: id,
  });
  try {
    if (await hasUserAlreadyCreatedSameSubscription(req))
      return res
        .status(StatusCodes.BAD_REQUEST)
        .send(ErrorMessages.SUBSCRIPTION_ALREADY_MADE);

    const newTripSubscription = await tripSubscription.save();
    res.status(StatusCodes.CREATION_SUCCESS).json({ newTripSubscription });
  } catch (error) {
    Logging.error(err);
    return res
      .status(StatusCodes.UNEXPECTED_ERROR)
      .send(ErrorMessages.UNEXPECTED_ERROR);
  }
};

const hasUserAlreadyCreatedSameSubscription = async (req) => {
  const { departureCity, destinationCity, date, personsCount, id } = req.body;

  const existingSubscription = await TripSubscription.findOne({
    departureCity,
    destinationCity,
    date,
    personsCount,
    user: { $eq: id },
  });

  return Boolean(existingSubscription);
};

export default { postTripSubscription };

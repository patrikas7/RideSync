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
    const newTripSubscription = await tripSubscription.save();
    res.status(StatusCodes.CREATION_SUCCESS).json({ newTripSubscription });
  } catch (error) {
    Logging.error(err);
    return res
      .status(StatusCodes.UNEXPECTED_ERROR)
      .send(ErrorMessages.UNEXPECTED_ERROR);
  }
};

export default { postTripSubscription };

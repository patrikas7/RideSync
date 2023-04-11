import Logging from "../library/Logging.js";
import StatusCodes from "../enums/statusCodes.js";
import ErrorMessages from "../enums/errorMessages.js";
import TripSearchRequest from "../models/TripSearchRequest.js";

const postTripSearchRequest = async (req, res) => {
  try {
    const { userId } = req;
    const tripSearchRequest = new TripSearchRequest({
      ...req.body,
      user: userId,
    });

    const newTripSearchRequest = await tripSearchRequest.save();
    res.status(StatusCodes.CREATION_SUCCESS).json({ newTripSearchRequest });
  } catch (error) {
    Logging.error(error);
    res
      .status(StatusCodes.UNEXPECTED_ERROR)
      .send(ErrorMessages.UNEXPECTED_ERROR);
  }
};

const getTripSearchRequests = async (req, res) => {
  const { destination, departure, date, passengersCount } = req.query;
  const query = {
    "departure.city": departure,
    "destination.city": destination,
    // date,
  };

  if (passengersCount) query.passengersCount = passengersCount;

  try {
    const tripSearchRequests = await TripSearchRequest.find(query)
      .populate("user", "name surname")
      .exec();
    res.status(StatusCodes.OK).json({ tripSearchRequests });
  } catch (error) {
    Logging.error(error);
    res
      .status(StatusCodes.UNEXPECTED_ERROR)
      .send(ErrorMessages.UNEXPECTED_ERROR);
  }
};

export default { postTripSearchRequest, getTripSearchRequests };

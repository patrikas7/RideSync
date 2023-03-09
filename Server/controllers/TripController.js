import ErrorMessages from "../enums/errorMessages.js";
import StatusCodes from "../enums/statusCodes.js";
import Logging from "../library/Logging.js";
import Trip from "../models/Trip.js";

// PAGINATIONS

const getTrips = async (req, res) => {
  const { destination, departure, date, personsCount } = req.query;

  console.log(destination, departure, date);
  try {
    const trips = await Trip.find({
      destination,
      departure,
      date,
      ...(personsCount ? { personsCount } : {}),
    });
    res.status(StatusCodes.OK).json({ trips });
  } catch (error) {
    Logging.error(error);
    res
      .status(StatusCodes.UNEXPECTED_ERROR)
      .send(ErrorMessages.UNEXPECTED_ERROR);
  }
};

export default { getTrips };

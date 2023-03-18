import ErrorMessages from "../enums/errorMessages.js";
import StatusCodes from "../enums/statusCodes.js";
import Logging from "../library/Logging.js";
import Trip from "../models/Trip.js";

// PAGINATIONS
// Add rating calculation

const getTrips = async (req, res) => {
  const { destination, departure, date, personsCount } = req.query;

  try {
    const trips = await Trip.find({
      $and: [
        {
          $or: [
            {
              "departure.city": departure,
              "destination.city": destination,
            },
            {
              "departure.city": departure,
              "stops.city": { $in: [destination] },
            },
            {
              "destination.city": destination,
              "stops.city": { $in: [departure] },
            },
            {
              stops: {
                $elemMatch: { city: departure },
                $elemMatch: { city: destination },
              },
            },
          ],
        },
        // { date: { $eq: date } },
        { ...(personsCount ? { personsCount } : {}) },
      ],
    })
      .select("departure.city destination.city date time personsCount price")
      .populate("driver", "name");

    res.status(StatusCodes.OK).json({ trips });
  } catch (error) {
    Logging.error(error);
    res
      .status(StatusCodes.UNEXPECTED_ERROR)
      .send(ErrorMessages.UNEXPECTED_ERROR);
  }
};

const getUserRating = (reviews) => {};

const postTrip = async (req, res) => {
  const {
    departure,
    destination,
    stops,
    date,
    time,
    personsCount,
    price,
    comments,
    isTripFree,
    isRoundTrip,
    returnDate,
    returnTime,
  } = req.body;

  const trip = new Trip({
    departure,
    destination,
    stops,
    date,
    time,
    personsCount,
    price: isTripFree ? "0" : price,
    comments,
    isTripFree,
    isRoundTrip,
    returnDate: isRoundTrip ? returnDate : null,
    returnTime: isRoundTrip ? returnTime : null,
    driver: req.user._id,
  });

  try {
    const newTrip = await trip.save();
    res.status(StatusCodes.OK).json({ newTrip });
  } catch (error) {
    Logging.error(error);
    res
      .status(StatusCodes.UNEXPECTED_ERROR)
      .send(ErrorMessages.UNEXPECTED_ERROR);
  }
};

export default { getTrips, postTrip };

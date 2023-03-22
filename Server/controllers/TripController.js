import ErrorMessages from "../enums/errorMessages.js";
import StatusCodes from "../enums/statusCodes.js";
import Logging from "../library/Logging.js";
import Trip from "../models/Trip.js";
import BasicUser from "../models/BasicUser.js";

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

const getUserRatingAndReviewCount = async (userId) => {
  try {
    const pipeline = [
      { $match: { _id: userId } },
      {
        $lookup: {
          from: "Review",
          localField: "_id",
          foreignField: "recipientId",
          as: "reviews",
        },
      },
      { $unwind: "$reviews" },
      {
        $group: {
          _id: "$_id",
          reviewCount: { $sum: 1 },
          rating: { $sum: "$reviews.rating" },
        },
      },
    ];

    const userAggregate = await BasicUser.aggregate(pipeline);

    Logging.info(userAggregate);

    if (userAggregate.length > 0) {
      const { rating, reviewCount } = userAggregate[0];
      return { rating, reviewCount };
    } else {
      return { rating: 0, reviewCount: 0 };
    }
  } catch (error) {
    Logging.error(error);
  }
};

const getTripInformation = async (req, res) => {
  const { id } = req.query;
  const userId = req.userId;

  try {
    const trip = await Trip.findById(id).populate("driver", "name surname");
    if (!trip)
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: ErrorMessages.TRIP_NOT_FOUND });

    // const {rating, reviewCount} = getUserRatingAndReviewCount(trips.driver._id)

    res.status(StatusCodes.OK).json({
      trip: {
        ...trip.toObject(),
        isUserDriver: userId === trip.driver._id.toString(),
      },
    });
  } catch (error) {
    Logging.error(error);
    res
      .status(StatusCodes.UNEXPECTED_ERROR)
      .send(ErrorMessages.UNEXPECTED_ERROR);
  }
};

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
    res.status(StatusCodes.CREATION_SUCCESS).json({ newTrip });
  } catch (error) {
    Logging.error(error);
    res
      .status(StatusCodes.UNEXPECTED_ERROR)
      .send(ErrorMessages.UNEXPECTED_ERROR);
  }
};

const getUsersFutureTrips = async (req, res) => {
  const { id } = req.query;
  const now = new Date();

  try {
    const trips = await Trip.find({
      $or: [{ driver: id }, { passengers: id }],
      // date: { $gte: now.toISOString().slice(0, 10) },
      // $or: [
      //   { date: { $gt: now.toISOString().slice(0, 10) } },
      //   {
      //     date: now.toISOString().slice(0, 10),
      //     time: { $gt: now.toISOString().slice(11, 5) },
      //   },
      // ],
    }).populate("driver", "name surname");

    const tripsWithUserType = getTripsWithUserType(id, trips);

    res.status(StatusCodes.OK).json({ trips: tripsWithUserType });
  } catch (error) {
    Logging.error(error);
    res
      .status(StatusCodes.UNEXPECTED_ERROR)
      .send(ErrorMessages.UNEXPECTED_ERROR);
  }
};

const getTripsWithUserType = (id, trips) =>
  trips.map((trip) => {
    const isUserDriver = trip.driver._id.toString() === id;
    const timeLeftUntilTrip = getRemainingTime();
    return {
      ...trip.toObject(),
      isUserDriver,
      timeLeftUntilTrip,
    };
  });

const getRemainingTime = (dateStr, timeStr) => {
  const inputDate = new Date(`${dateStr}T${timeStr}:00`);
  const now = new Date();
  const timeDiff = (inputDate.getTime() - now.getTime()) / (1000 * 60);
  if (timeDiff < 120 && timeDiff > 0) {
    const hours = Math.floor(timeDiff / 60);
    const minutes = Math.floor(timeDiff % 60);
    return { hours, minutes };
  }
  return null;
};

export default { getTrips, postTrip, getTripInformation, getUsersFutureTrips };

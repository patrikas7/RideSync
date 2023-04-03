import ErrorMessages from "../enums/errorMessages.js";
import StatusCodes from "../enums/statusCodes.js";
import Logging from "../library/Logging.js";
import Trip from "../models/Trip.js";
import BasicUser from "../models/BasicUser.js";
import User from "../models/User.js";
import {
  AvailableSeatsSlots,
  DepartureTimeSlots,
  TripOptions,
} from "../enums/enums.js";
import TripBookmark from "../models/TripBookmark.js";

// PAGINATIONS
// Add rating calculation

const getTrips = async (req, res) => {
  const query = buildSearchQuery(req);

  try {
    const trips = await findTrips(query);

    res.status(StatusCodes.OK).json({ trips });
  } catch (error) {
    Logging.error(error);
    res
      .status(StatusCodes.UNEXPECTED_ERROR)
      .send(ErrorMessages.UNEXPECTED_ERROR);
  }
};

const buildSearchQuery = (req) => {
  const { destination, departure, date, personsCount } = req.query;
  const query = {
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
          { personsCount: { $gt: 0 } },
        ],
      },
      // { date: { $eq: date } },
      { ...(personsCount ? { personsCount } : {}) },
    ],
  };

  return query;
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
    const trip = await findTripById(id, true);
    const { driver, passengers } = trip;
    const isUserDriver = userId === driver._id.toString();
    const isUserPassenger = trip.passengers.some(
      (passenger) => passenger.passenger._id.toString() === userId
    );
    // const {rating, reviewCount} = getUserRatingAndReviewCount(trips.driver._id)

    trip.driver = parseDriverProfilePicture(driver);
    trip.passengers = parsePassengersProfilePictures(passengers);

    res.status(StatusCodes.OK).json({
      trip: {
        ...trip,
        isUserDriver,
        isUserPassenger,
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

const filterTrips = async (req, res) => {
  const { isAddToFavouritesSelcted } = req.query;
  const userId = req.userId;
  const query = buildFiltersQuery(req.query);

  try {
    if (isAddToFavouritesSelcted) await addTripToFavorites(req.query, userId);
    const trips = await findTrips(query);

    res.status(StatusCodes.OK).json({ trips });
  } catch (error) {
    Logging.error(error);
    res
      .status(StatusCodes.UNEXPECTED_ERROR)
      .send(ErrorMessages.UNEXPECTED_ERROR);
  }
};

const buildFiltersQuery = (req) => {
  const {
    destination,
    departure,
    tripOption,
    departureTime,
    availableSeats,
    onlyFreeTrips,
    priceRange,
  } = req;
  const query = {};

  query.destination.city = destination;
  query.departure.city = departure;

  if (tripOption !== TripOptions.ALL_TRIPS) {
    query.stops =
      tripOption === TripOptions.TRIP_WITHOUT_STOPS
        ? { size: { $eq: 0 } }
        : { size: { $gt: 0 } };
  }

  if (departureTime !== DepartureTimeSlots.ALL_TIMES) {
    if (departureTime === DepartureTimeSlots.FIRST_QUATER)
      query.time = { $gte: "00:00", $lt: "05:59" };
    else if (departureTime === DepartureTimeSlots.SECOND_QUATER)
      query.time = { $gte: "06:00", $lt: "11:59" };
    else if (departureTime === DepartureTimeSlots.THIRD_QUATER)
      query.time = { $gte: "12:00", $lt: "17:59" };
    else query.time = { $gte: "18:00", $lt: "23:59" };
  }

  if (availableSeats !== AvailableSeatsSlots.DOES_NOT_MATTER) {
    if (availableSeats === AvailableSeatsSlots.ONE)
      query.personsCount = { $gte: 1 };
    else if (availableSeats === AvailableSeatsSlots.TWO)
      query.personsCount = { $gte: 2 };
    else if (availableSeats === AvailableSeatsSlots.THREE)
      query.personsCount = { $gte: 3 };
    else query.personsCount = { $gte: 4 };
  }

  if (!onlyFreeTrips) {
    const [minPrice, maxPrice] = priceRange.split("-");
    query.price = { $gte: minPrice, $lte: maxPrice };
  } else {
    query.price = 0;
  }

  return query;
};

const addTripToFavorites = async (query, userId) => {
  const tripBookmark = new TripBookmark({
    destination: query.destination,
    departure: query.departure,
    tripOption: query.tripOption,
    departureTime: query.departureTime,
    availableSeats: query.availableSeats,
    onlyFreeTrips: query.onlyFreeTrips,
    priceRange: query.priceRange,
    userId,
  });

  await tripBookmark.save();
};

const deleteTrip = async (req, res) => {
  const { id } = req.query;

  try {
    await Trip.findByIdAndDelete(id);
    res.status(StatusCodes.OK).json({ message: "deleted" });
  } catch (error) {
    Logging.error(error);
    res
      .status(StatusCodes.UNEXPECTED_ERROR)
      .send(ErrorMessages.UNEXPECTED_ERROR);
  }
};

const seatBooking = async (req, res) => {
  const {
    userId,
    body: { passengersCount, tripId },
  } = req;
  const today = new Date().toISOString().slice(0, 10);

  try {
    const trip = await Trip.findById(tripId);

    if (!trip)
      return res
        .status(StatusCodes.NOT_FOUND)
        .send(ErrorMessages.TRIP_NOT_FOUND);

    if (passengersCount > trip.personsCount)
      return res
        .status(StatusCodes.BAD_REQUEST)
        .send(ErrorMessages.EXCEEDS_SEATS_COUNT);

    // if (today > trip.date)
    //   return res
    //     .status(StatusCodes.BAD_REQUEST)
    //     .send(ErrorMessages.TRIP_BOOKING_DATE);

    trip.personsCount -= passengersCount;
    trip.passengers.push({ passenger: userId, seatsBooked: passengersCount });

    await trip.save();
    await addTripToUsersTripsHistory(userId, tripId);
    const updatedTrip = await findTripById(tripId);

    parseDriverProfilePicture(updatedTrip.driver);
    parsePassengersProfilePictures(updatedTrip.passengers);

    res
      .status(StatusCodes.OK)
      .json({ trip: { ...updatedTrip.toObject(), isUserPassenger: true } });
  } catch (error) {
    Logging.error(error);
    res
      .status(StatusCodes.UNEXPECTED_ERROR)
      .send(ErrorMessages.UNEXPECTED_ERROR);
  }
};

const cancelBooking = async (req, res) => {
  const {
    userId,
    query: { id },
  } = req;

  try {
    const trip = await findTripById(id);

    const passenger = trip.passengers.find(
      ({ passenger }) => passenger._id.toString() === userId
    );

    if (!passenger)
      return res
        .status(StatusCodes.NOT_FOUND)
        .send(ErrorMessages.PASSENGER_NOT_FOUND);

    trip.personsCount += passenger.seatsBooked;
    trip.passengers.pull(passenger._id);

    await trip.save();
    await removeTripFromUsersTripHistory(userId, id);
    parseDriverProfilePicture(trip.driver);
    parsePassengersProfilePictures(trip.passengers);

    res
      .status(StatusCodes.OK)
      .json({ trip: { ...trip.toObject(), isUserPassenger: false } });
  } catch (error) {
    Logging.error(error);
    res
      .status(StatusCodes.UNEXPECTED_ERROR)
      .send(ErrorMessages.UNEXPECTED_ERROR);
  }
};

const findTrips = async (query) => {
  const trips = await Trip.find(query)
    .select("departure.city destination.city date time personsCount price")
    .populate("driver", "name profilePicture")
    .lean();

  trips.forEach(({ driver }) => {
    driver = parseDriverProfilePicture(driver);
  });

  return trips;
};

const findTripById = async (id, useLean) => {
  const query = Trip.findById(id)
    .populate(
      "driver",
      "name surname gender dateOfBirth phoneNumber profilePicture trips"
    )
    .populate(
      "passengers.passenger",
      "name surname gender dateOfBirth phoneNumber profilePicture trips"
    );
  if (useLean) {
    query.lean();
  }
  const trip = await query.exec();
  if (!trip) throw new Error(ErrorMessages.TRIP_NOT_FOUND);
  return trip;
};

const addTripToUsersTripsHistory = async (userId, tripId) => {
  const user = await User.findById(userId);
  user.trips.push(tripId);
  await user.save();
};

const removeTripFromUsersTripHistory = async (userId, tripId) => {
  const user = await User.findById(userId);
  user.trips = user.trips.filter((id) => id !== tripId);
  await user.save();
};

const parseDriverProfilePicture = (driver) => {
  if (driver.profilePicture?.buffer)
    driver.profilePicture.buffer =
      driver.profilePicture.buffer.toString("base64");

  return driver;
};

const parsePassengersProfilePictures = (passengers) => {
  passengers?.forEach((passenger) => {
    if (passenger.profilePicture?.buffer)
      passenger.profilePicture.buffer =
        passenger.profilePicture.buffer.toString("base64");
  });

  return passengers;
};

export default {
  getTrips,
  postTrip,
  getTripInformation,
  getUsersFutureTrips,
  filterTrips,
  deleteTrip,
  seatBooking,
  cancelBooking,
};

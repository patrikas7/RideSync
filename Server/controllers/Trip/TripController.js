import ErrorMessages from "../../enums/errorMessages.js";
import StatusCodes from "../../enums/statusCodes.js";
import Logging from "../../library/Logging.js";
import Trip from "../../models/Trip.js";
import BasicUser from "../../models/BasicUser.js";
import User from "../../models/User.js";
import TripBookmark from "../../models/TripBookmark.js";
import {
  buildSearchQuery,
  buildFiltersQuery,
  parseUserProfilePicture,
  parsePassengersProfilePictures,
  findPassenger,
  getRatingAndReviewCount,
} from "./TripControllerUtils.js";
import { sendNotificationForRemovedUser } from "../NotificationController.js";

// PAGINATIONS
// Add rating calculation

const getTrips = async (req, res) => {
  const query = buildSearchQuery(req);

  try {
    const trips = await findTrips(query);
    const tripsWithRating = trips.map((trip) => {
      const { averageRating, reviewsCount } = getRatingAndReviewCount(
        trip.driver._id,
        trip.driver.reviews
      );

      return {
        ...trip,
        driver: { ...trip.driver, averageRating, reviewsCount },
      };
    });

    res.status(StatusCodes.OK).json({ trips: tripsWithRating });
  } catch (error) {
    Logging.error(error);
    res
      .status(StatusCodes.UNEXPECTED_ERROR)
      .send(ErrorMessages.UNEXPECTED_ERROR);
  }
};

const getTripInformation = async (req, res) => {
  const { id } = req.query;
  const userId = req.userId;

  try {
    const trip = await findTripById(id, true);
    const { driver, passengers } = trip;
    const isUserDriver = userId === driver._id.toString();
    const isUserPassenger = findPassenger(trip?.passengers, userId, false);
    const isUserRemovedFromTrip = findPassenger(trip?.passengers, userId, true);
    const { averageRating, reviewsCount } = getRatingAndReviewCount(
      driver._id,
      driver.reviews
    );

    trip.driver = parseUserProfilePicture(driver);
    trip.passengers = parsePassengersProfilePictures(passengers);

    const passengersWithReviews = trip.passengers.map((passenger) => {
      const { averageRating, reviewsCount } = getRatingAndReviewCount(
        passenger.passenger._id,
        passenger.passenger.reviews
      );

      return {
        ...passenger,
        passenger: { ...passenger.passenger, averageRating, reviewsCount },
      };
    });

    res.status(StatusCodes.OK).json({
      trip: {
        ...trip,
        passengers: passengersWithReviews,
        driver: { ...driver, averageRating, reviewsCount },
        isUserDriver,
        isUserPassenger,
        isUserRemovedFromTrip,
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
    car,
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
    car,
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

const filterTrips = async (req, res) => {
  const { isAddToFavouritesSelcted } = req.query;
  const userId = req.userId;

  const query = buildFiltersQuery(req.query);

  try {
    if (isAddToFavouritesSelcted === "true")
      await addTripToFavorites(req.query, userId);
    const trips = await findTrips(query);
    const tripsWithRating = trips.map((trip) => {
      const { averageRating, reviewsCount } = getRatingAndReviewCount(
        trip.driver._id,
        trip.driver.reviews
      );

      return {
        ...trip,
        driver: { ...trip.driver, averageRating, reviewsCount },
      };
    });

    res.status(StatusCodes.OK).json({ trips: tripsWithRating });
  } catch (error) {
    Logging.error(error);
    res
      .status(StatusCodes.UNEXPECTED_ERROR)
      .send(ErrorMessages.UNEXPECTED_ERROR);
  }
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

    if (today > trip.date)
      return res
        .status(StatusCodes.BAD_REQUEST)
        .send(ErrorMessages.TRIP_BOOKING_DATE);

    trip.personsCount -= passengersCount;
    trip.passengers.push({ passenger: userId, seatsBooked: passengersCount });

    await trip.save();
    await addTripToUsersTripsHistory(userId, tripId);
    const updatedTrip = await findTripById(tripId);

    parseUserProfilePicture(updatedTrip.driver);
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
    query: { id, passengerId },
  } = req;

  const userToRemove = passengerId || userId;
  const isPassengerRemovedByDriver = !!passengerId;

  try {
    const trip = await findTripById(id);

    const passenger = trip.passengers.find(
      ({ passenger }) => passenger._id.toString() === userToRemove
    );

    if (!passenger)
      return res
        .status(StatusCodes.NOT_FOUND)
        .send(ErrorMessages.PASSENGER_NOT_FOUND);

    trip.personsCount += passenger.seatsBooked;

    if (isPassengerRemovedByDriver) {
      passenger.wasRemoved = true;
    } else {
      trip.passengers.pull(passenger._id);
    }

    await trip.save();
    await removeTripFromUsersTripHistory(userToRemove, id);

    if (isPassengerRemovedByDriver)
      await sendNotificationForRemovedUser(passengerId, userId, trip._id);

    parseUserProfilePicture(trip.driver);
    parsePassengersProfilePictures(trip.passengers);

    res.status(StatusCodes.OK).json({
      trip: {
        ...trip.toObject(),
        isUserPassenger: false,
        isUserDriver: isPassengerRemovedByDriver,
      },
    });
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
    .populate({
      path: "driver",
      select:
        "name surname gender dateOfBirth phoneNumber profilePicture trips",
      populate: { path: "reviews", select: "recipient rating" },
    })
    .lean();

  trips.forEach(({ driver }) => {
    driver = parseUserProfilePicture(driver);
  });

  return trips;
};

const findTripById = async (id, useLean) => {
  const query = Trip.findById(id)
    .populate({
      path: "driver",
      select:
        "name surname gender dateOfBirth phoneNumber profilePicture trips",
      populate: { path: "reviews", select: "recipient rating" },
    })
    .populate({
      path: "passengers.passenger",
      select:
        "name surname gender dateOfBirth phoneNumber profilePicture trips",
      populate: { path: "reviews", select: "recipient rating" },
    })
    .populate("car");

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
  user.trips = user.trips.filter((id) => id.toString() !== tripId);
  await user.save();
};

const updatedTrip = async (req, res) => {
  const { id } = req.query;
  const updateData = req.body;

  try {
    const updatedTrip = await Trip.findByIdAndUpdate(id, updateData, {
      new: true,
    })
      .populate(
        "driver",
        "name surname gender dateOfBirth phoneNumber profilePicture trips"
      )
      .populate(
        "passengers.passenger",
        "name surname gender dateOfBirth phoneNumber profilePicture trips"
      )

      .populate("car");

    if (!updatedTrip)
      return res
        .status(StatusCodes.NOT_FOUND)
        .send(ErrorMessages.TRIP_NOT_FOUND);

    res.status(StatusCodes.OK).json({
      trip: {
        ...updatedTrip.toObject(),
        isUserDriver: true,
        isUserPassenger: false,
      },
    });
  } catch (error) {
    Logging.error(error);
    res
      .status(StatusCodes.UNEXPECTED_ERROR)
      .send(ErrorMessages.UNEXPECTED_ERROR);
  }
};

export default {
  getTrips,
  postTrip,
  getTripInformation,
  filterTrips,
  deleteTrip,
  seatBooking,
  cancelBooking,
  updatedTrip,
};

import {
  AvailableSeatsSlots,
  DepartureTimeSlots,
  TripOptions,
} from "../../enums/enums.js";
import Logging from "../../library/Logging.js";

export const buildSearchQuery = (req) => {
  const { destination, departure, date, personsCount } = req.query;

  const query = {
    $and: [
      { ...buildStopsSearchQuery(destination, departure) },
      // { date: { $eq: date } },
      { ...(personsCount ? { personsCount } : {}) },
    ],
  };

  return query;
};

export const buildFiltersQuery = (req) => {
  const {
    destination,
    departure,
    tripOption,
    departureTime,
    availableSeats,
    onlyFreeTrips,
    priceRange,
    date,
  } = req;

  const query = {
    $and: [
      buildStopsSearchQuery(destination, departure),
      buildTripOptionsQuery(tripOption),
      buildTimeQuery(departureTime),
      buildPersonsCountQuery(availableSeats),
      buildPriceQuery(onlyFreeTrips, priceRange),
    ],
  };

  return query;
};

const buildStopsSearchQuery = (destination, departure) => ({
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
});

const buildTripOptionsQuery = (tripOption) => {
  let tripOptionQuery = {};
  if (tripOption !== TripOptions.ALL_TRIPS) {
    tripOptionQuery = {
      stops:
        tripOption === TripOptions.TRIP_WITHOUT_STOPS
          ? { $size: 0 }
          : { $not: { $size: 0 } },
    };
  }

  return tripOptionQuery;
};

const buildTimeQuery = (departureTime) => {
  let timeQuery = {};

  if (departureTime !== DepartureTimeSlots.ALL_TIMES) {
    if (departureTime === DepartureTimeSlots.FIRST_QUATER)
      timeQuery = { time: { $gte: "00:00", $lt: "05:59" } };
    else if (departureTime === DepartureTimeSlots.SECOND_QUATER)
      timeQuery = { time: { $gte: "06:00", $lt: "11:59" } };
    else if (departureTime === DepartureTimeSlots.THIRD_QUATER)
      timeQuery = { time: { $gte: "12:00", $lt: "17:59" } };
    else timeQuery = { time: { $gte: "18:00", $lt: "23:59" } };
  }

  return timeQuery;
};

const buildPersonsCountQuery = (availableSeats) => {
  let personsCountQuery = {};

  if (availableSeats !== AvailableSeatsSlots.DOES_NOT_MATTER) {
    if (availableSeats === AvailableSeatsSlots.ONE)
      personsCountQuery = { personsCount: { $gte: 1 } };
    else if (availableSeats === AvailableSeatsSlots.TWO)
      personsCountQuery = { personsCount: { $gte: 2 } };
    else if (availableSeats === AvailableSeatsSlots.THREE)
      personsCountQuery = { personsCount: { $gte: 3 } };
    else personsCountQuery = { personsCount: { $gte: 4 } };
  }

  return personsCountQuery;
};

const buildPriceQuery = (onlyFreeTrips, priceRange) => {
  let priceQuery = {};

  if (onlyFreeTrips === "false") {
    const minPrice = priceRange[0];
    const maxPrice = priceRange[1];

    priceQuery = {
      price: { $gte: minPrice, $lte: maxPrice },
    };
  } else {
    priceQuery = { price: { $eq: "0" } };
  }

  return priceQuery;
};

export const getTripsWithUserType = (id, trips) =>
  trips.map((trip) => {
    const isUseruser = trip.user._id.toString() === id;
    const timeLeftUntilTrip = getRemainingTime();
    return {
      ...trip.toObject(),
      isUseruser,
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

export const parseUserProfilePicture = (user) => {
  if (user?.profilePicture?.buffer)
    user.profilePicture.buffer = user.profilePicture.buffer.toString("base64");

  return user;
};

export const parsePassengersProfilePictures = (passengers) => {
  passengers?.forEach((passenger) => {
    if (passenger.profilePicture?.buffer)
      passenger.profilePicture.buffer =
        passenger.profilePicture.buffer.toString("base64");
  });

  return passengers;
};

export const findPassenger = (passengers, userId, wasRemoved) => {
  return passengers?.find(
    (passenger) =>
      passenger.passenger._id.toString() === userId &&
      passenger.wasRemoved === wasRemoved
  );
};

export const getRatingAndReviewCount = (userId, reviews) => {
  if (!reviews?.length) return { averageRating: 0, reviewsCount: 0 };
  const filteredReviews = reviews.filter(
    (review) => review.recipient.toString() === userId.toString()
  );
  const reviewsCount = filteredReviews.length;
  const totalRating = filteredReviews.reduce(
    (acc, review) => acc + review.rating,
    0
  );
  const averageRating = reviewsCount > 0 ? totalRating / reviewsCount : 0;
  return { averageRating, reviewsCount };
};

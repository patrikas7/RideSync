import Joi from "joi";
import {
  AvailableSeatsSlots,
  DepartureTimeSlots,
  Genders,
  SearchTypes,
  TripOptions,
} from "../enums/enums.js";

const getEligableDate = () => {
  const todaysDate = new Date();
  todaysDate.setFullYear(todaysDate.getFullYear() - 18);
  return todaysDate.toISOString().slice(0, 10);
};

const citySchema = Joi.object().keys({
  addressLine1: Joi.string().required(),
  addressLine2: Joi.string().required(),
  city: Joi.string().required(),
  latitude: Joi.number().required(),
  longitude: Joi.number().required(),
});

// Add password criteroa
const Schemas = {
  basicUser: {
    create: Joi.object({
      name: Joi.string().required(),
      surname: Joi.string().required(),
      password: Joi.string().required(),
      email: Joi.string().email().required(),
      dateOfBirth: Joi.date().max(getEligableDate()).required(),
      phoneNumber: Joi.string(),
      gender: Joi.string().valid(Genders.MALE, Genders.FEMALE).required(),
    }),
  },
  login: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
  searchHistory: {
    create: Joi.object({
      id: Joi.string().required(),
      type: Joi.string()
        .valid(SearchTypes.DEPARTURE, SearchTypes.DESTINATION)
        .required(),
      text: Joi.string().required(),
    }),
    get: Joi.object({
      id: Joi.string().required(),
      type: Joi.string()
        .valid(SearchTypes.DEPARTURE, SearchTypes.DESTINATION)
        .required(),
    }),
  },
  tripSearchHistory: {
    create: Joi.object({
      id: Joi.string().required(),
      departure: Joi.string().required(),
      destination: Joi.string().required(),
    }),
  },
  bookmark: {
    create: Joi.object({
      id: Joi.string().required(),
      departure: Joi.string().required(),
      destination: Joi.string().required(),
    }),
  },
  trip: {
    get: Joi.object({
      departure: Joi.string().required(),
      destination: Joi.string().required(),
      date: Joi.date().required(),
      personsCount: Joi.string().allow(null, ""),
    }),
    create: Joi.object({
      id: Joi.string().required(),
      departure: citySchema.required(),
      destination: citySchema.required(),
      stops: Joi.array().items(citySchema).required(),
      date: Joi.string().required(),
      time: Joi.string().required(),
      personsCount: Joi.string().required(),
      price: Joi.string().required(),
      comments: Joi.string().allow(null, ""),
      isTripFree: Joi.boolean().required(),
      isRoundTrip: Joi.boolean().required(),
      returnDate: Joi.string(),
      returnTime: Joi.string(),
    }),
    filter: Joi.object({
      tripOption: Joi.string().valid(
        TripOptions.TRIP_WITH_STOPS,
        TripOptions.TRIP_WITHOUT_STOPS,
        TripOptions.ALL_TRIPS
      ),
      departureTime: Joi.string().valid(
        DepartureTimeSlots.ALL_TIMES,
        DepartureTimeSlots.FIRST_QUATER,
        DepartureTimeSlots.SECOND_QUATER,
        DepartureTimeSlots.THIRD_QUATER,
        DepartureTimeSlots.FOURTH_QUATER
      ),
      availableSeats: Joi.string().valid(
        AvailableSeatsSlots.DOES_NOT_MATTER,
        AvailableSeatsSlots.ONE,
        AvailableSeatsSlots.TWO,
        AvailableSeatsSlots.THREE,
        AvailableSeatsSlots.FOUR
      ),
      onlyFreeTrips: Joi.boolean(),
      isAddToFavouritesSelcted: Joi.boolean(),
      priceRangeRange: Joi.array()
        .ordered(
          Joi.number().integer().min(0).max(100),
          Joi.number().integer().min(0).max(100)
        )
        .length(2),
    }),
  },
  tripSubscription: {
    create: Joi.object({
      id: Joi.string().required(),
      departureCity: Joi.string().required(),
      destinationCity: Joi.string().required(),
      date: Joi.date().required(),
      personsCount: Joi.string().allow(null, ""),
    }),
  },
};

export default Schemas;

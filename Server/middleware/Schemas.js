import Joi from "joi";
import { Genders, SearchTypes } from "../enums/enums.js";

const getEligableDate = () => {
  const todaysDate = new Date();
  todaysDate.setFullYear(todaysDate.getFullYear() - 18);
  return todaysDate.toISOString().slice(0, 10);
};

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
  },
};

export default Schemas;

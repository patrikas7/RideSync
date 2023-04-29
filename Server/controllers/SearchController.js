import axios from "axios";
import { SearchTypes } from "../enums/enums.js";
import ErrorMessages from "../enums/errorMessages.js";
import StatusCodes from "../enums/statusCodes.js";
import Logging from "../library/Logging.js";

const MAX_HISTORY_RECORDS = 3;
const MAX_TRIP_SEARCH_HISTORY_RECORDS = 5;

const getSuggestions = async (req, res) => {
  const { text } = req.query;

  try {
    const { data } = await axios.get(process.env.GEOAPIFY_URL, {
      params: {
        text,
        limit: 3,
        apiKey: process.env.GEOAPIFY_KEY,
        lang: "lt",
      },
    });

    const suggestions = data.features.map((feature) => ({
      addressLine1: feature?.properties?.address_line1,
      addressLine2: feature?.properties?.address_line2,
      city: feature?.properties?.city,
      longitude: feature?.properties?.lon,
      latitude: feature?.properties.lat,
    }));

    res.status(StatusCodes.OK).json({ suggestions });
  } catch (error) {
    Logging.error(error);
    res
      .status(StatusCodes.UNEXPECTED_ERROR)
      .send(ErrorMessages.UNEXPECTED_ERROR);
  }
};

const getCitySuggestions = async (req, res) => {
  const { text } = req.query;

  try {
    const { data } = await axios.get(process.env.GEOAPIFY_URL, {
      params: {
        text,
        limit: 3,
        apiKey: process.env.GEOAPIFY_KEY,
        lang: "lt",
        type: "city",
      },
    });

    const suggestions = data.features.map((feature) => ({
      addressLine1: feature?.properties?.address_line1,
      addressLine2: feature?.properties?.address_line2,
      city: feature?.properties?.city,
      longitude: feature?.properties?.lon,
      latitude: feature?.properties.lat,
    }));

    res.status(StatusCodes.OK).json({ suggestions });
  } catch (error) {
    Logging.error(error);
    res
      .status(StatusCodes.UNEXPECTED_ERROR)
      .send(ErrorMessages.UNEXPECTED_ERROR);
  }
};

const getSearchHistory = async (req, res) => {
  const user = req.user;
  const { type } = req.query;
  const searchHistory = getUserSearchHistory(type, user);

  res.status(StatusCodes.OK).json({ searchHistory: searchHistory.reverse() });
};

const saveSearch = async (req, res) => {
  const user = req.user;
  const { text, type } = req.body;
  const searchHistory = getUserSearchHistory(type, user);

  try {
    removeDublicate(searchHistory, text);
    shiftHistory(searchHistory, MAX_HISTORY_RECORDS);
    searchHistory.push(text);
    await user.save();

    res.status(StatusCodes.OK).json({ updatedSearchHistory: searchHistory });
  } catch (error) {
    Logging.error(error);
    return res
      .status(StatusCodes.UNEXPECTED_ERROR)
      .send(ErrorMessages.UNEXPECTED_ERROR);
  }
};

const getTripsSearchHistory = async (req, res) => {
  const user = req.user;

  res
    .status(StatusCodes.OK)
    .json({ tripsSearchHistory: user.tripsSearchHistory.reverse() });
};

const saveTripSearch = async (req, res) => {
  const user = req.user;
  const { destination, departure } = req.body;
  const tripsSearchHistory = user.tripsSearchHistory;

  try {
    removeDublicateObject(tripsSearchHistory, { destination, departure });
    shiftHistory(tripsSearchHistory, MAX_TRIP_SEARCH_HISTORY_RECORDS);
    tripsSearchHistory.push({ destination, departure });
    await user.save();

    res
      .status(StatusCodes.OK)
      .json({ updatedTripSearchHistory: tripsSearchHistory });
  } catch (error) {
    Logging.error(err);
    return res
      .status(StatusCodes.UNEXPECTED_ERROR)
      .send(ErrorMessages.UNEXPECTED_ERROR);
  }
};

const removeDublicate = (history, text) => {
  if (history.includes(text)) {
    const duplicateRecordIndex = history.indexOf(text);
    history.splice(duplicateRecordIndex, 1);
  }
};

const removeDublicateObject = (history, newTripSearch) => {
  const duplicateRecordIndex = history.findIndex(
    (obj) =>
      obj.departure === newTripSearch.departure &&
      obj.destination === newTripSearch.destination
  );

  if (duplicateRecordIndex !== -1) history.splice(duplicateRecordIndex, 1);
};

const shiftHistory = (history, maxNumber) => {
  if (history.length === maxNumber) history.shift();
};

const getUserSearchHistory = (type, user) =>
  type === SearchTypes.DEPARTURE
    ? user.departureSearchHistory
    : user.destinationSearchHistory;

const bookmarkTripSearch = async (req, res) => {
  const user = req.user;
  const { destination, departure, personsCount } = req.body;

  try {
    user.tripBookmarks.push({
      destination,
      departure,
      personsCount,
    });

    await user.save();
    res
      .status(StatusCodes.OK)
      .json({ updatedTripBookmarks: user.tripBookmarks });
  } catch (error) {
    Logging.error(err);
    return res
      .status(StatusCodes.UNEXPECTED_ERROR)
      .send(ErrorMessages.UNEXPECTED_ERROR);
  }
};

export default {
  getSuggestions,
  saveSearch,
  getSearchHistory,
  saveTripSearch,
  getTripsSearchHistory,
  bookmarkTripSearch,
  getCitySuggestions,
};

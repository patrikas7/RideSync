import Logging from "../library/Logging.js";
import StatusCodes from "../enums/statusCodes.js";
import ErrorMessages from "../enums/errorMessages.js";
import TripSearchRequest from "../models/TripSearchRequest.js";
import { parseUserProfilePicture } from "./Trip/TripControllerUtils.js";

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

const getTripSearchRequest = async (req, res) => {
  const { id } = req.params;
  const { userId } = req;

  try {
    const tripSearchRequest = await populateUser(
      TripSearchRequest.findById(id)
    ).lean();

    if (!tripSearchRequest)
      return res
        .status(StatusCodes.NOT_FOUND)
        .send(ErrorMessages.TRIP_SEARCH_REQUEST_NOT_FOUND);

    const isUsersPost = tripSearchRequest.user._id.toString() === userId;
    tripSearchRequest.user = parseUserProfilePicture(tripSearchRequest.user);

    res.status(StatusCodes.OK).json({
      tripSearchRequest: { ...tripSearchRequest, isUsersPost },
    });
  } catch (error) {
    Logging.error(error);
    res
      .status(StatusCodes.UNEXPECTED_ERROR)
      .send(ErrorMessages.UNEXPECTED_ERROR);
  }
};

const updateTripSearchRequest = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const updatedTripSearchRequest = await populateUser(
      TripSearchRequest.findByIdAndUpdate(id, updateData, { new: true })
    ).lean();

    if (!updatedTripSearchRequest)
      return res
        .status(StatusCodes.NOT_FOUND)
        .send(ErrorMessages.TRIP_NOT_FOUND);

    updatedTripSearchRequest.user = parseUserProfilePicture(
      updatedTripSearchRequest.user
    );

    res.status(StatusCodes.OK).json({
      tripSearchRequest: {
        ...updatedTripSearchRequest,
        isUsersPost: true,
      },
    });
  } catch (error) {
    Logging.error(error);
    res
      .status(StatusCodes.UNEXPECTED_ERROR)
      .send(ErrorMessages.UNEXPECTED_ERROR);
  }
};

const populateUser = (query) => {
  return query.populate(
    "user",
    "name surname gender dateOfBirth phoneNumber profilePicture trips"
  );
};

const deleteTripSearchRequest = async (req, res) => {
  const { id } = req.params;

  try {
    await TripSearchRequest.findByIdAndDelete(id);
    res.status(StatusCodes.OK).json({ message: "deleted" });
  } catch (error) {
    Logging.error(error);
    res
      .status(StatusCodes.UNEXPECTED_ERROR)
      .send(ErrorMessages.UNEXPECTED_ERROR);
  }
};

export default {
  postTripSearchRequest,
  getTripSearchRequests,
  getTripSearchRequest,
  deleteTripSearchRequest,
  updateTripSearchRequest,
};

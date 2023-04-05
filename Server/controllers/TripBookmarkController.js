import Logging from "../library/Logging.js";
import StatusCodes from "../enums/statusCodes.js";
import ErrorMessages from "../enums/errorMessages.js";
import TripBookmark from "../models/TripBookmark.js";
import BasicUser from "../models/BasicUser.js";

const getUserBookmarks = async (req, res) => {
  const userId = req.userId;

  try {
    const user = await BasicUser.findById(userId).populate("tripBookmarks");

    res.status(StatusCodes.OK).json({ bookmarks: user.tripBookmarks });
  } catch (error) {
    Logging.error(error);
    return res
      .status(StatusCodes.UNEXPECTED_ERROR)
      .send(ErrorMessages.UNEXPECTED_ERROR);
  }
};

const deleteBookmark = async (req, res) => {
  const { id } = req.query;

  try {
    await TripBookmark.findByIdAndDelete(id);
    res.status(StatusCodes.OK).json({ message: "deleted" });
  } catch (error) {
    Logging.error(error);
    return res
      .status(StatusCodes.UNEXPECTED_ERROR)
      .send(ErrorMessages.UNEXPECTED_ERROR);
  }
};

export default { deleteBookmark, getUserBookmarks };

import Logging from "../library/Logging.js";
import StatusCodes from "../enums/statusCodes.js";
import ErrorMessages from "../enums/errorMessages.js";
import DriverAd from "../models/DriverAd.js";

const getDriverAds = async (_, res) => {
  try {
    const driversAds = await DriverAd.find({ isActive: true });
    return res.status(StatusCodes.OK).json({ driversAds });
  } catch (error) {
    Logging.error(error);
    return res
      .status(StatusCodes.UNEXPECTED_ERROR)
      .send(ErrorMessages.UNEXPECTED_ERROR);
  }
};

const postDriverAd = async (req, res) => {
  const { userId } = req;
  const data = req.body;

  try {
    const driverAd = new DriverAd({ ...data, driver: userId });
    await driverAd.save();

    res.status(StatusCodes.CREATION_SUCCESS).json({ review });
  } catch (error) {
    return res
      .status(StatusCodes.UNEXPECTED_ERROR)
      .send(ErrorMessages.UNEXPECTED_ERROR);
  }
};

export default { getDriverAds, postDriverAd };

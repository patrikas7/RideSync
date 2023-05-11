import StatusCodes from "../enums/statusCodes.js";
import ErrorMessages from "../enums/errorMessages.js";
import DriverAd from "../models/DriverAd.js";

const getDriverAds = async (_, res) => {
  try {
    const driversAds = await DriverAd.find({ isActive: true }).populate("car");
    return res.status(StatusCodes.OK).json({ driversAds });
  } catch (error) {
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

    res.status(StatusCodes.CREATION_SUCCESS).json({ driverAd });
  } catch (error) {
    return res
      .status(StatusCodes.UNEXPECTED_ERROR)
      .send(ErrorMessages.UNEXPECTED_ERROR);
  }
};

const updateDriverAdHandler = async (req, res) => {
  const { id } = req.query;
  const updateData = req.body;

  try {
    const updatedAd = await updateDriverAd(id, updateData);
    res.status(StatusCodes.OK).json({ updatedAd });
  } catch (error) {
    res
      .status(StatusCodes.UNEXPECTED_ERROR)
      .send(ErrorMessages.UNEXPECTED_ERROR);
  }
};

const updateDriverAd = async (id, updateData) => {
  try {
    const result = await DriverAd.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    return result;
  } catch (error) {
    throw error;
  }
};

const deleteDriverAd = async (req, res) => {
  const { id } = req.query;

  try {
    await DriverAd.findByIdAndDelete(id);
    res.status(StatusCodes.OK).json({ message: "deleted" });
  } catch (error) {
    res
      .status(StatusCodes.UNEXPECTED_ERROR)
      .send(ErrorMessages.UNEXPECTED_ERROR);
  }
};

const getDriverAd = async (req, res) => {
  const { id } = req.params;
  const { userId } = req;
  try {
    const driverAd = await DriverAd.findById(id).populate("car");
    if (!driverAd)
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: ErrorMessages.DRIVER_AD_NOT_FOUND });

    return res.status(StatusCodes.OK).json({
      driverAd: {
        ...driverAd.toObject(),
        isMyAd: driverAd.driver.toString() === userId,
      },
    });
  } catch (error) {
    res
      .status(StatusCodes.UNEXPECTED_ERROR)
      .send(ErrorMessages.UNEXPECTED_ERROR);
  }
};

export default {
  getDriverAds,
  postDriverAd,
  updateDriverAdHandler,
  deleteDriverAd,
  getDriverAd,
};

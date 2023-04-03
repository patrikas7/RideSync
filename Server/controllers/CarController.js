import ErrorMessages from "../enums/errorMessages.js";
import StatusCodes from "../enums/statusCodes.js";
import Logging from "../library/Logging.js";
import User from "../models/User.js";
import Car from "../models/Car.js";
import BasicUser from "../models/BasicUser.js";

const postCar = async (req, res) => {
  const {
    userId,
    body: { manufacturer, model, licensePlateNumber, type, manufactureYear },
  } = req;

  const car = new Car({
    manufacturer,
    model,
    licensePlateNumber: licensePlateNumber.toUpperCase(),
    type,
    manufactureYear,
    ownwer: userId,
  });

  try {
    const newCar = await car.save();
    const user = await User.findById(userId);

    user.cars.push(newCar._id);
    await user.save();

    res.status(StatusCodes.CREATION_SUCCESS).json({ car: newCar });
  } catch (error) {
    Logging.error(error);
    res
      .status(StatusCodes.UNEXPECTED_ERROR)
      .send(ErrorMessages.UNEXPECTED_ERROR);
  }
};

const updateCar = async (req, res) => {
  const {
    query: { id },
    body: { manufacturer, model, licensePlateNumber, type, manufactureYear },
  } = req;

  try {
    const updatedCar = await Car.findByIdAndUpdate(
      id,
      { manufacturer, model, licensePlateNumber, type, manufactureYear },
      { new: true }
    );

    if (!updatedCar) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .send(ErrorMessages.CAR_NOT_FOUND);
    }

    res.status(StatusCodes.CREATION_SUCCESS).json({ car: updatedCar });
  } catch (error) {
    Logging.error(error);
    res
      .status(StatusCodes.UNEXPECTED_ERROR)
      .send(ErrorMessages.UNEXPECTED_ERROR);
  }
};

const deleteCar = async (req, res) => {
  const {
    userId,
    query: { id },
  } = req;
  try {
    await Car.findByIdAndDelete(id);
    await BasicUser.findOneAndUpdate({ _id: userId }, { $pull: { cars: id } });

    res.status(StatusCodes.OK).json({ message: "deleted" });
  } catch (error) {
    Logging.error(error);
    res
      .status(StatusCodes.UNEXPECTED_ERROR)
      .send(ErrorMessages.UNEXPECTED_ERROR);
  }
};

export default { postCar, deleteCar, updateCar };

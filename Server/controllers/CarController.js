import ErrorMessages from "../enums/errorMessages.js";
import StatusCodes from "../enums/statusCodes.js";
import Logging from "../library/Logging.js";
import Car from "../models/Car.js";

const postCar = async (req, res) => {
  const {
    userId,
    body: { manufacturer, model, licensePlateNumber, type, manufactureYear },
  } = req;

  const car = new Car({
    manufacturer,
    model,
    licensePlateNumber,
    type,
    manufactureYear,
    ownwer: userId,
  });

  try {
    const newCar = await car.save();
    res.status(StatusCodes.CREATION_SUCCESS).json({ newCar });
  } catch (error) {
    Logging.error(error);
    res
      .status(StatusCodes.UNEXPECTED_ERROR)
      .send(ErrorMessages.UNEXPECTED_ERROR);
  }
};

export default { postCar };

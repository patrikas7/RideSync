import Logging from "../library/Logging.js";
import StatusCodes from "../enums/statusCodes.js";
import ErrorMessages from "../enums/errorMessages.js";
import axios from "axios";

const getManufacturers = async (_, res) => {
  try {
    const { data } = await axios.get(
      "https://private-anon-73dd004019-carsapi1.apiary-mock.com/manufacturers"
    );

    const manufacturers = data.map((manufacturer) => manufacturer.name);
    res.status(StatusCodes.OK).json({ manufacturers });
  } catch (error) {
    Logging.error(error);
    res
      .status(StatusCodes.UNEXPECTED_ERROR)
      .send(ErrorMessages.UNEXPECTED_ERROR);
  }
};

export default { getManufacturers };

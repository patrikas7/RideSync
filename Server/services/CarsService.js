import Logging from "../library/Logging.js";
import StatusCodes from "../enums/statusCodes.js";
import ErrorMessages from "../enums/errorMessages.js";
import axios from "axios";
import { CarTypes } from "../enums/enums.js";

const getCarsData = async (_, res) => {
  try {
    const carMakes = await axios.get(
      "https://private-anon-73dd004019-carsapi1.apiary-mock.com/manufacturers"
    );

    const carModels = await axios.get(
      "https://private-anon-dc8bb13516-carsapi1.apiary-mock.com/cars"
    );

    const models = carModels.data.map((car) => ({
      label: car.model,
      value: car.model,
      make: car.make,
    }));

    const manufacturers = carMakes.data.map((manufacturer) => {
      const manufacturerWithCapital =
        manufacturer.name.charAt(0).toUpperCase() + manufacturer.name.slice(1);
      return { label: manufacturerWithCapital, value: manufacturerWithCapital };
    });

    const carTypes = Object.entries(CarTypes).map(([key, value]) => ({
      label: value,
      value: value,
    }));
    res
      .status(StatusCodes.OK)
      .json({ manufacturers, models, carTypes, years: getYearsFrom1995() });
  } catch (error) {
    Logging.error(error);
    res
      .status(StatusCodes.UNEXPECTED_ERROR)
      .send(ErrorMessages.UNEXPECTED_ERROR);
  }
};

const getYearsFrom1995 = () => {
  const currentYear = new Date().getFullYear();
  const startYear = 1995;
  const years = [];

  for (let i = startYear; i <= currentYear; i++) {
    years.push({ label: i.toString(), value: i.toString() });
  }

  return years;
};

export default { getCarsData };

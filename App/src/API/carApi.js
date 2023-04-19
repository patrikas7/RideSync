import { printError } from "../Utils/utils";
import axios from "axios";

export const fetchUserCars = async (token) => {
  try {
    const { data } = await axios.get("/user/car", {
      headers: { Authorization: token },
    });

    return { carsList: data.carsList };
  } catch (error) {
    printError(error);
    return { error };
  }
};

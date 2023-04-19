import { printError } from "../Utils/utils";
import axios from "axios";

export const fetchDriversList = async (token) => {
  try {
    const { data } = await axios.get("/driver-ad", {
      headers: { Authorization: token },
    });

    return { driversAds: data.driversAds };
  } catch (error) {
    printError(error);
    return { error };
  }
};

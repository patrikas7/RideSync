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

export const postDriverAd = async (token, formData) => {
  try {
    await axios.post("/driver-ad", formData, {
      headers: { Authorization: token },
    });
  } catch (error) {
    printError(error);
    return { error };
  }
};

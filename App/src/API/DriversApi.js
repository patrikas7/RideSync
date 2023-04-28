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

export const updateDriverAd = async (token, formData, id) => {
  try {
    await axios.put("/driver-ad", formData, {
      params: { id },
      headers: { Authorization: token },
    });
  } catch (error) {
    printError(error);
    return { error };
  }
};

export const deleteDriverAd = async (token, id) => {
  try {
    await axios.delete("/driver-ad", {
      params: { id },
      headers: { Authorization: token },
    });
  } catch (error) {
    printError(error);
    return { error };
  }
};

export const fetchDriverAd = async (token, id) => {
  try {
    const { data } = await axios.get(`/driver-ad/${id}`, {
      headers: { Authorization: token },
    });

    return { driverAd: data.driverAd };
  } catch (error) {
    printError(error);
    return { error };
  }
};

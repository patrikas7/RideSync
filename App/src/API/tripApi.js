import { printError } from "../Utils/utils";
import axios from "axios";

export const deleteTrip = async (token, id) => {
  try {
    await axios.delete("/trips/information", {
      params: { id },
      headers: { Authorization: token },
    });
  } catch (error) {
    printError(error);
    return { error };
  }
};

export const deleteBooking = async (id, passengerId, token) => {
  try {
    const { data } = await axios.delete("/trips/bookings", {
      params: { id, passengerId },
      headers: { Authorization: token },
    });

    return { trip: data.trip };
  } catch (error) {
    printError(error);
    return { error };
  }
};

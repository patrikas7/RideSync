import { printError } from "../Utils/utils";
import axios from "axios";

export const fetchUserData = async (token) => {
  try {
    const { data } = await axios.get("/user", {
      headers: { Authorization: token },
    });

    return { user: data.user };
  } catch (error) {
    printError(error);
    return { error };
  }
};

export const fetchUserChat = async (token, receiver) => {
  try {
    const { data } = await axios.get("/user/my-chats", {
      params: { receiver },
      headers: { Authorization: token },
    });

    return { user: data.user, chat: data.chat };
  } catch (error) {
    printError(error);
    return { error };
  }
};

export const fetchMyTrips = async (token, type) => {
  try {
    const { data } = await axios.get("/user/my-trips", {
      params: { type },
      headers: { Authorization: token },
    });

    return { data };
  } catch (error) {
    printError(error);
    return { error };
  }
};

export const checkUserByEmail = async (email) => {
  try {
    const { data } = await axios.get("/user/checkByEmail", {
      params: {
        email,
      },
    });

    return { userExists: data.userExists };
  } catch (error) {
    printError(error);
    return { error };
  }
};

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

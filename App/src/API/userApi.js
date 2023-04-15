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

export const fetchUserChats = async (token) => {
  try {
    const { data } = await axios.get("/user/my-chats", {
      headers: { Authorization: token },
    });

    return { user: data.user, messages: data.messages };
  } catch (error) {
    printError(error);
    return { error };
  }
};

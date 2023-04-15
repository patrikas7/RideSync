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

import { printError } from "../Utils/utils";
import axios from "axios";

export const fetchNotificationData = async (id, token) => {
  try {
    const { data } = await axios.get(`/notifications/${id}`, {
      headers: { Authorization: token },
    });

    return { notification: data.notification };
  } catch (error) {
    printError(error);
    return { error };
  }
};

export const fetchNotificationsData = async (token) => {
  try {
    const { data } = await axios.get("/notifications/user", {
      headers: { Authorization: token },
    });

    return { data };
  } catch (error) {
    printError(error);
    return { error };
  }
};

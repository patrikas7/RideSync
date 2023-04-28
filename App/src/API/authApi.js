import { printError } from "../Utils/utils";
import axios from "axios";

export const postRegistration = async (body) => {
  try {
    await axios.post("/auth/register", body);
  } catch (error) {
    printError(error);
    return { error };
  }
};

export const postSendPasswordReminder = async (email) => {
  try {
    await axios.post("/auth/forgot-password", { email });
  } catch (error) {
    return { error };
  }
};

export const postChangePassword = async (body) => {
  try {
    await axios.post("/auth/change-password", body);
  } catch (error) {
    return { error };
  }
};

import { printError } from "../Utils/utils";
import axios from "axios";

export const postRegistration = async (data) => {
  try {
    await axios.post("/auth/register", data);
  } catch (error) {
    printError(error);
    return { error };
  }
};

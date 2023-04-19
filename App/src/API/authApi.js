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

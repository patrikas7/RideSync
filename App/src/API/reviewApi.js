import { printError } from "../Utils/utils";
import axios from "axios";

export const canReviewBeDone = async (token, trip, recipient) => {
  try {
    const { data } = await axios.get("/reviews/check-review-existence", {
      params: { recipient, trip },
      headers: { Authorization: token },
    });

    return { doesReviewExists: data.doesReviewExists };
  } catch (error) {
    printError(error);
    return { error };
  }
};

export const postReview = async (token, postData) => {
  try {
    await axios.post("/reviews", postData, {
      headers: { Authorization: token },
    });
  } catch (error) {
    printError(error);
    return { error };
  }
};

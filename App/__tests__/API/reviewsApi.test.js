import axios from "axios";
import { canReviewBeDone, postReview } from "../../src/API/reviewApi";

jest.mock("axios");
jest.mock("../../src/Utils/utils.js", () => ({
  printError: jest.fn(),
}));

describe("canReviewBeDone", () => {
  const token = "fakeToken";
  const trip = "fakeTrip";
  const recipient = "fakeRecipient";

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return doesReviewExists true if there is a review", async () => {
    const expectedResponse = { doesReviewExists: true };
    axios.get.mockResolvedValue({ data: expectedResponse });

    const result = await canReviewBeDone(token, trip, recipient);

    expect(axios.get).toHaveBeenCalledWith("/reviews/check-review-existence", {
      params: { recipient, trip },
      headers: { Authorization: token },
    });
    expect(result).toEqual(expectedResponse);
  });

  it("should return doesReviewExists false if there is not a review", async () => {
    const expectedResponse = { doesReviewExists: false };
    axios.get.mockResolvedValue({ data: expectedResponse });

    const result = await canReviewBeDone(token, trip, recipient);

    expect(axios.get).toHaveBeenCalledWith("/reviews/check-review-existence", {
      params: { recipient, trip },
      headers: { Authorization: token },
    });
    expect(result).toEqual(expectedResponse);
  });

  it("should return an error object if there is an error", async () => {
    const expectedError = new Error("fakeError");
    axios.get.mockRejectedValue(expectedError);

    const result = await canReviewBeDone(token, trip, recipient);

    expect(axios.get).toHaveBeenCalledWith("/reviews/check-review-existence", {
      params: { recipient, trip },
      headers: { Authorization: token },
    });
    expect(result).toEqual({ error: expectedError });
  });
});

describe("postReview", () => {
  const token = "fakeToken";
  const postData = {
    recipient: "fakeRecipient",
    trip: "fakeTrip",
    rating: 5,
    comment: "fakeComment",
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should call the API with the correct data", async () => {
    axios.post.mockResolvedValue();

    await postReview(token, postData);

    expect(axios.post).toHaveBeenCalledWith("/reviews", postData, {
      headers: { Authorization: token },
    });
  });

  it("should return undefined if the request is successful", async () => {
    axios.post.mockResolvedValue();

    const result = await postReview(token, postData);

    expect(result).toBeUndefined();
  });

  it("should return an error object if there is an error", async () => {
    const expectedError = new Error("fakeError");
    axios.post.mockRejectedValue(expectedError);

    const result = await postReview(token, postData);

    expect(result).toEqual({ error: expectedError });
  });
});

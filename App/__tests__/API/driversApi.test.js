import axios from "axios";
import {
  deleteDriverAd,
  fetchDriverAd,
  fetchDriversList,
  postDriverAd,
  updateDriverAd,
} from "../../src/API/driversAPI";

jest.mock("axios");
jest.mock("../../src/Utils/utils.js", () => ({
  printError: jest.fn(),
}));

describe("DriverAd API", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe("fetchDriversList", () => {
    it("should return driversAds when successful", async () => {
      const expectedResponse = { driversAds: [{ id: 1, name: "Driver 1" }] };
      axios.get.mockResolvedValueOnce({ data: expectedResponse });

      const result = await fetchDriversList("token");

      expect(axios.get).toHaveBeenCalledWith("/driver-ad", {
        headers: { Authorization: "token" },
      });
      expect(result).toEqual(expectedResponse);
    });

    it("should return error object when unsuccessful", async () => {
      const expectedError = { message: "Error message" };
      axios.get.mockRejectedValueOnce(expectedError);

      const result = await fetchDriversList("token");

      expect(axios.get).toHaveBeenCalledWith("/driver-ad", {
        headers: { Authorization: "token" },
      });
      expect(result).toEqual({ error: expectedError });
    });
  });

  describe("postDriverAd", () => {
    it("should make a post request with token and formData when successful", async () => {
      axios.post.mockResolvedValueOnce({});

      const formData = { name: "Driver 1" };
      await postDriverAd("token", formData);

      expect(axios.post).toHaveBeenCalledWith(
        "/driver-ad",
        formData,
        expect.objectContaining({
          headers: { Authorization: "token" },
        })
      );
    });

    it("should return error object when unsuccessful", async () => {
      const expectedError = { message: "Error message" };
      axios.post.mockRejectedValueOnce(expectedError);

      const formData = { name: "Driver 1" };
      const result = await postDriverAd("token", formData);

      expect(axios.post).toHaveBeenCalledWith(
        "/driver-ad",
        formData,
        expect.objectContaining({
          headers: { Authorization: "token" },
        })
      );
      expect(result).toEqual({ error: expectedError });
    });
  });

  describe("updateDriverAd", () => {
    it("should make a put request with token, formData and id when successful", async () => {
      axios.put.mockResolvedValueOnce({});

      const formData = { name: "Driver 1" };
      const id = 1;
      await updateDriverAd("token", formData, id);

      expect(axios.put).toHaveBeenCalledWith(
        "/driver-ad",
        formData,
        expect.objectContaining({
          params: { id },
          headers: { Authorization: "token" },
        })
      );
    });

    it("should return error object when unsuccessful", async () => {
      const expectedError = { message: "Error message" };
      axios.put.mockRejectedValueOnce(expectedError);

      const formData = { name: "Driver 1" };
      const id = 1;
      const result = await updateDriverAd("token", formData, id);

      expect(axios.put).toHaveBeenCalledWith(
        "/driver-ad",
        formData,
        expect.objectContaining({
          params: { id },
          headers: { Authorization: "token" },
        })
      );
      expect(result).toEqual({ error: expectedError });
    });
  });

  describe("deleteDriverAd", () => {
    it("should call the delete API with correct parameters", async () => {
      const token = "mockToken";
      const id = "mockId";
      await deleteDriverAd(token, id);

      expect(axios.delete).toHaveBeenCalledWith("/driver-ad", {
        params: { id },
        headers: { Authorization: token },
      });
    });

    it("should return an error when API call fails", async () => {
      const token = "mockToken";
      const id = "mockId";
      const error = new Error("API call failed");
      axios.delete.mockRejectedValueOnce(error);
      const result = await deleteDriverAd(token, id);

      expect(axios.delete).toHaveBeenCalledWith("/driver-ad", {
        params: { id },
        headers: { Authorization: token },
      });
      expect(result).toEqual({ error });
    });
  });

  describe("fetchDriverAd", () => {
    it("should call the get API with correct parameters", async () => {
      const token = "mockToken";
      const id = "mockId";
      const responseData = { driverAd: { id, title: "mockTitle" } };
      axios.get.mockResolvedValueOnce({ data: responseData });
      const result = await fetchDriverAd(token, id);

      expect(axios.get).toHaveBeenCalledWith(`/driver-ad/${id}`, {
        headers: { Authorization: token },
      });
      expect(result).toEqual({ driverAd: responseData.driverAd });
    });

    it("should return an error when API call fails", async () => {
      const token = "mockToken";
      const id = "mockId";
      const error = new Error("API call failed");
      axios.get.mockRejectedValueOnce(error);
      const result = await fetchDriverAd(token, id);

      expect(axios.get).toHaveBeenCalledWith(`/driver-ad/${id}`, {
        headers: { Authorization: token },
      });
      expect(result).toEqual({ error });
    });
  });
});

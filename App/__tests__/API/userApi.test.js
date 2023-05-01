import {
  fetchUserData,
  fetchUserChat,
  fetchMyTrips,
  checkUserByEmail,
  fetchUserCars,
  fetchUserDriverAds,
} from "../../src/API/userApi";
import axios from "axios";

jest.mock("axios");
jest.mock("../../src/Utils/utils.js", () => ({
  printError: jest.fn(),
}));

describe("fetchUserData", () => {
  it("returns user data on success", async () => {
    const mockUserData = {
      user: { name: "John Doe", email: "johndoe@example.com" },
    };
    axios.get.mockResolvedValueOnce({ data: mockUserData });

    const token = "token123";
    const result = await fetchUserData(token);

    expect(result).toEqual(mockUserData);
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith("/user", {
      headers: { Authorization: token },
    });
  });
});

describe("fetchUserCars", () => {
  it("should return cars list", async () => {
    const token = "myToken";
    const expectedData = { carsList: ["Car1", "Car2"] };
    axios.get.mockResolvedValueOnce({ data: expectedData });

    const result = await fetchUserCars(token);

    expect(result).toEqual(expectedData);
    expect(axios.get).toHaveBeenCalledWith("/user/car", {
      headers: { Authorization: token },
    });
  });

  it("should handle error", async () => {
    const token = "myToken";
    const expectedError = new Error("Something went wrong");
    axios.get.mockRejectedValueOnce(expectedError);

    const result = await fetchUserCars(token);

    expect(result).toEqual({ error: expectedError });
    expect(axios.get).toHaveBeenCalledWith("/user/car", {
      headers: { Authorization: token },
    });
  });
});

describe("fetchUserDriverAds", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("returns driver ads when request is successful", async () => {
    const token = "someToken";
    const responseData = { driverAds: [{ id: 1, title: "Ad 1" }] };
    axios.get.mockResolvedValue({ data: responseData });

    const result = await fetchUserDriverAds(token);

    expect(axios.get).toHaveBeenCalledWith("/user/my-driver-ad", {
      headers: { Authorization: token },
    });
    expect(result).toEqual({ driverAds: responseData.driverAds });
  });

  it("returns an error when request fails", async () => {
    const token = "someToken";
    const errorMessage = "Failed to fetch driver ads";
    axios.get.mockRejectedValue(new Error(errorMessage));

    const result = await fetchUserDriverAds(token);

    expect(axios.get).toHaveBeenCalledWith("/user/my-driver-ad", {
      headers: { Authorization: token },
    });
    expect(result).toEqual({ error: new Error(errorMessage) });
  });
});
